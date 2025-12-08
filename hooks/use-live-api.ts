import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { LiveStatus } from '../types';
import { createPcmBlob, decodeAudioData, base64ToArrayBuffer, blobToBase64 } from '../utils/audio-utils';

// Helper to safely get API Key without crashing if process is undefined (browser environments)
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY || '';
    }
    // If you are using Vite, you might use import.meta.env.VITE_API_KEY
    // return import.meta.env.VITE_API_KEY || '';
  } catch (e) {
    console.warn("Environment variables not accessible");
  }
  return ''; // Return empty string if not found, don't crash
};

const API_KEY = getApiKey();

const MODEL_NAME = 'gemini-2.5-flash-native-audio-preview-09-2025';
const VOICE_NAME = 'Fenrir'; // Using a deeper, more professional voice

// Product Database injected into AI context
const PRODUCT_CONTEXT = `
CONTEXTO PRINCIPAL:
Eres el Consultor Experto Senior de "MA Fashion LLC", distribuidor exclusivo de las marcas "Sweet Professional" y "S Professional".
Tu misión es elevar la experiencia del salón, vender soluciones técnicas y educar.

REGLAS CRÍTICAS DE COMPORTAMIENTO (NO ROMPER):
1. **IDIOMA**: ESCUCHA atentamente el idioma del usuario. RESPONDE SIEMPRE EN EL MISMO IDIOMA en el que te hablen (Español, Inglés, Portugués, Italiano, Árabe, Japonés, Chino).
2. **VERACIDAD**: NO INVENTES INFORMACIÓN. Basa tus respuestas ÚNICAMENTE en este contexto y en los archivos adjuntos (Base de Conocimientos). Si no sabes un dato técnico específico, NO lo adivines.
3. **ESCALAMIENTO HUMANO**: Si te hacen una pregunta técnica o comercial que NO puedes responder con la información provista, o si hay una duda compleja, indica al usuario que se comunique con:
   - **Ernesto Aramburu** (Director)
   - **Alejandra Mendez** (Técnica de la Marca y Embajadora Internacional de S Professional y Sweet Professional).
   **IMPORTANTE: DILE AL USUARIO QUE PUEDE ENCONTRAR LOS DATOS DE CONTACTO EN LA PARTE INFERIOR (PIE DE PÁGINA) DE ESTE SITIO WEB.**

FUENTE DE VERDAD (RAG / DOCUMENTOS):
Tienes acceso a una "Base de Conocimientos Técnica" mediante la herramienta [fileSearch]. Úsala para responder preguntas sobre ingredientes, pH y tiempos de pausa.

PROTOCOLOS TÉCNICOS S PROFESSIONAL (RESUMEN):

1. **LÍNEA NUTROLOGY (Nutrición Intensa / Cronología)**:
   - *Objetivo*: Nutrición, reposición de aceites y carbono. Biotecnología.
   - *Activos*: Clorofila, Xantofila, Manteca de Karité, D-Pantenol.
   - *Protocolo*: Lavar con Nutri Shampoo (2 veces). Aplicar Renew Ultraconditioner (10 min). Enjuagar.

2. **LÍNEA HIDRATHERAPY (Hidratación / Ozonoterapia)**:
   - *Objetivo*: Hidratación profunda, desintoxicación del cuero cabelludo.
   - *Activos*: Agua ozonizada, Jengibre, Citronela, Romero.
   - *Protocolo*: Lavar con Purifying Shampoo. Aplicar Power Dose (ampolla). Opcional ozono (10 min). Aplicar Recovery Conditioner (3 min).

3. **LÍNEA BRUSHING+ (Alisado Térmico / Anti-Frizz)**:
   - *Tecnología*: Enlaces de moléculas ácidas. Libre de formol.
   - *Protocolo*:
     1. Deep Shampoo (Lavar, 2da vez dejar 5-10 min).
     2. Secar 80%.
     3. Brushing Shampoo (Aplicar sin frotar cuero cabelludo, dejar 15 min). Enjuagar.
     4. Secar 80%.
     5. Hair Plus (Aplicar, dejar 20 min). Enjuagar.
     6. Secar 100%. Planchar (230°C sano / 180°C dañado).

4. **LÍNEA PRO FUSION (Reconstrucción Enzimática)**:
   - *Objetivo*: Reposición de masa, pH ácido, para cabellos "chiclosos".
   - *Protocolo SOS*:
     1. Lavar con Fusion Shampoo.
     2. Aplicar Inner (10 min).
     3. SIN ENJUAGAR, aplicar Redress Ultraconditioner encima (10 min).
     4. Enjuagar. Finalizar con Save Home y Serum.

5. **LÍNEA MY CROWN (Rizos y Curvas)**:
   - *Objetivo*: Definición, memoria de rizo.
   - *Tecnología*: Curvelini y Plantcol.
   - *Uso*: Shampoo Low Poo, Mascarilla hidratante y Finalizador con memoria.

RECUERDA: Tu tono es profesional, lujoso y experto. Vende la "Ciencia de la Belleza".
`;

export const useLiveAPI = () => {
  const [status, setStatus] = useState<LiveStatus>(LiveStatus.DISCONNECTED);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0); // For visualizer (0-1)

  // Audio Contexts
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  
  // Audio Playback Queue
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Video Streaming
  const videoIntervalRef = useRef<number | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);

  // Gemini Session
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const genAiRef = useRef<GoogleGenAI | null>(null);

  // Initialize
  useEffect(() => {
    // Cleanup on unmount
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connect = useCallback(async () => {
    if (!API_KEY) {
      console.error("API Key not found");
      setStatus(LiveStatus.ERROR);
      return;
    }

    try {
      setStatus(LiveStatus.CONNECTING);
      
      // Init Audio Contexts
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      inputAudioContextRef.current = new AudioContext({ sampleRate: 16000 });
      outputAudioContextRef.current = new AudioContext({ sampleRate: 24000 });

      // Init Microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Init GenAI
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      genAiRef.current = ai;

      const sessionPromise = ai.live.connect({
        model: MODEL_NAME,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE_NAME } },
          },
          systemInstruction: PRODUCT_CONTEXT,
          tools: [
            {
              // @ts-ignore - FileSearch tool configuration for RAG
              fileSearch: {
                fileSearchStoreNames: [
                  "fileSearchStores/filesearchstore-1-0hxqp07lpl9v",
                  "fileSearchStores/filesearchstore-1-f1r3hcc52pdp",
                  "fileSearchStores/filesearchstore-1-ledx8gp448sc",
                  "fileSearchStores/filesearchstore-1-qc5zr6io1ok8"
                ]
              }
            }
          ]
        },
        callbacks: {
          onopen: () => {
            console.log("Gemini Live Session Opened");
            setStatus(LiveStatus.CONNECTED);
            startAudioInput();
          },
          onmessage: async (message: LiveServerMessage) => {
            handleServerMessage(message);
          },
          onclose: (e) => {
            console.log("Gemini Live Session Closed", e);
            setStatus(LiveStatus.DISCONNECTED);
            stopAudioInput();
          },
          onerror: (e) => {
            console.error("Gemini Live Session Error", e);
            setStatus(LiveStatus.ERROR);
            stopAudioInput();
          }
        }
      });

      sessionPromiseRef.current = sessionPromise;

    } catch (error) {
      console.error("Connection failed:", error);
      setStatus(LiveStatus.ERROR);
    }
  }, []);

  const disconnect = useCallback(() => {
    // Close Session
    if (sessionPromiseRef.current) {
        sessionPromiseRef.current.then(session => {
            session.close();
        }).catch(() => {});
        sessionPromiseRef.current = null;
    }
    
    // Stop Audio Input
    stopAudioInput();
    stopVideoInput();

    // Close Contexts
    inputAudioContextRef.current?.close();
    outputAudioContextRef.current?.close();
    inputAudioContextRef.current = null;
    outputAudioContextRef.current = null;

    setStatus(LiveStatus.DISCONNECTED);
  }, []);

  const startAudioInput = () => {
    if (!inputAudioContextRef.current || !streamRef.current) return;

    const ctx = inputAudioContextRef.current;
    const stream = streamRef.current;

    const source = ctx.createMediaStreamSource(stream);
    const processor = ctx.createScriptProcessor(4096, 1, 1);
    
    processor.onaudioprocess = (e) => {
      if (isMuted) return;

      const inputData = e.inputBuffer.getChannelData(0);
      
      // Calculate volume for visualizer
      let sum = 0;
      for (let i = 0; i < inputData.length; i++) {
        sum += inputData[i] * inputData[i];
      }
      const rms = Math.sqrt(sum / inputData.length);
      setVolumeLevel(Math.min(rms * 5, 1)); 

      const pcmBlob = createPcmBlob(inputData);
      
      if (sessionPromiseRef.current) {
        sessionPromiseRef.current.then(session => {
            session.sendRealtimeInput({ media: pcmBlob });
        });
      }
    };

    source.connect(processor);
    processor.connect(ctx.destination);

    sourceRef.current = source;
    processorRef.current = processor;
  };

  const stopAudioInput = () => {
    processorRef.current?.disconnect();
    sourceRef.current?.disconnect();
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  };

  const handleServerMessage = async (message: LiveServerMessage) => {
    const serverContent = message.serverContent;
    
    if (serverContent?.modelTurn?.parts?.[0]?.inlineData) {
      const audioData = serverContent.modelTurn.parts[0].inlineData.data;
      if (audioData && outputAudioContextRef.current) {
        playAudioChunk(base64ToArrayBuffer(audioData));
      }
    }

    if (serverContent?.interrupted) {
        audioSourcesRef.current.forEach(source => source.stop());
        audioSourcesRef.current.clear();
        nextStartTimeRef.current = 0;
    }
  };

  const playAudioChunk = async (buffer: ArrayBuffer) => {
    if (!outputAudioContextRef.current) return;
    const ctx = outputAudioContextRef.current;
    
    try {
        const audioBuffer = await decodeAudioData(buffer, ctx);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        const gainNode = ctx.createGain();
        gainNode.connect(ctx.destination);
        source.connect(gainNode);

        // Simulated visualizer for output
        setVolumeLevel(0.5); 
        source.onended = () => {
            audioSourcesRef.current.delete(source);
            setVolumeLevel(0);
        };

        const currentTime = ctx.currentTime;
        if (nextStartTimeRef.current < currentTime) {
            nextStartTimeRef.current = currentTime;
        }

        source.start(nextStartTimeRef.current);
        nextStartTimeRef.current += audioBuffer.duration;
        audioSourcesRef.current.add(source);

    } catch (err) {
        console.error("Error decoding audio", err);
    }
  };

  const startVideoInput = useCallback(() => {
    if (!videoElementRef.current || !canvasElementRef.current) return;
    setIsVideoActive(true);

    const videoEl = videoElementRef.current;
    const canvasEl = canvasElementRef.current;
    const ctx = canvasEl.getContext('2d');

    navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
        .then(stream => {
            videoEl.srcObject = stream;
            videoEl.play();
            
            videoIntervalRef.current = window.setInterval(async () => {
                if (!ctx || !sessionPromiseRef.current) return;
                
                canvasEl.width = videoEl.videoWidth;
                canvasEl.height = videoEl.videoHeight;
                ctx.drawImage(videoEl, 0, 0);
                
                const blob = await new Promise<globalThis.Blob | null>(resolve => 
                    canvasEl.toBlob(resolve, 'image/jpeg', 0.6)
                );

                if (blob) {
                    const base64 = await blobToBase64(blob);
                    sessionPromiseRef.current.then(session => {
                        session.sendRealtimeInput({
                            media: { mimeType: 'image/jpeg', data: base64 }
                        });
                    });
                }

            }, 1000); 
        })
        .catch(err => {
            console.error("Failed to access camera", err);
            setIsVideoActive(false);
        });

  }, []);

  const stopVideoInput = useCallback(() => {
    setIsVideoActive(false);
    if (videoIntervalRef.current) {
        clearInterval(videoIntervalRef.current);
        videoIntervalRef.current = null;
    }
    const videoEl = videoElementRef.current;
    if (videoEl && videoEl.srcObject) {
        const stream = videoEl.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoEl.srcObject = null;
    }
  }, []);

  const toggleMute = () => setIsMuted(!isMuted);

  const toggleVideo = () => {
      if (isVideoActive) {
          stopVideoInput();
      } else {
          startVideoInput();
      }
  };

  return {
    connect,
    disconnect,
    status,
    isMuted,
    isVideoActive,
    toggleMute,
    toggleVideo,
    volumeLevel,
    videoRef: videoElementRef,
    canvasRef: canvasElementRef
  };
};