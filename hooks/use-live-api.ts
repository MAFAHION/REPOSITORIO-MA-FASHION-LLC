import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { LiveStatus } from '../types';
import { createPcmBlob, decodeAudioData, base64ToArrayBuffer, blobToBase64 } from '../utils/audio-utils';

const API_KEY = process.env.API_KEY || '';
const MODEL_NAME = 'gemini-2.5-flash-native-audio-preview-09-2025';
const VOICE_NAME = 'Fenrir'; // Using a deeper, more professional voice

// Product Database injected into AI context
const PRODUCT_CONTEXT = `
CONTEXTO PRINCIPAL:
Eres el Consultor Experto Senior de "MA Fashion LLC", distribuidor exclusivo de las marcas "Sweet Professional" y "S Professional".
Tu misión es elevar la experiencia del salón y vender soluciones técnicas.

FUENTE DE VERDAD (RAG / DOCUMENTOS):
Tienes acceso a una "Base de Conocimientos Técnica" mediante la herramienta [fileSearch].
IMPORTANTE: Para consultas técnicas, PRIORIZA la información detallada a continuación extraída de los manuales de S Professional.

PROTOCOLOS TÉCNICOS S PROFESSIONAL (MEMORIZAR):

1. **LÍNEA NUTROLOGY (Nutrición Intensa / Cronología)**:
   - *Objetivo*: Nutrición, reposición de aceites y carbono. Biotecnología.
   - *Activos*: Clorofila, Xantofila, Manteca de Karité, D-Pantenol.
   - *Protocolo Paso a Paso*:
     1. Lavar 2 veces con **Nutri Shampoo**. Secar con toalla.
     2. Aplicar **Renew Ultraconditioner**.
     3. Dejar actuar **10 minutos**.
     4. Enjuagar y finalizar.

2. **LÍNEA HIDRATHERAPY (Hidratación / Ozonoterapia)**:
   - *Objetivo*: Hidratación profunda, desintoxicación del cuero cabelludo.
   - *Activos*: Agua ozonizada, Jengibre, Citronela, Romero.
   - *Protocolo Paso a Paso*:
     1. Lavar 2 veces con **Purifying Shampoo**. Secar con toalla.
     2. Aplicar ampolla **Power Dose** y desenredar.
     3. (Opcional) Usar dispositivo de ozonización por **10 minutos**. Enjuagar.
     4. Aplicar **Recovery Conditioner**. Dejar actuar **3 minutos**. Enjuagar.

3. **LÍNEA BRUSHING+ (Alisado Térmico / Anti-Frizz)**:
   - *Tecnología*: Enlaces de moléculas ácidas. Libre de formol.
   - *Protocolo ALISADO (Brushing Plus)*:
     1. Lavar con **Deep Shampoo**. Masajear sin frotar cuero cabelludo.
     2. En la 2da aplicación, dejar reposar **5 a 10 minutos** (apertura cutícula). Enjuagar.
     3. Secar cabello al 80%.
     4. Aplicar **Brushing Shampoo** (espuma densa). NO frotar cuero cabelludo. Dejar actuar **15 min**. Enjuagar.
     5. Secar al 80%.
     6. Aplicar **Hair Plus** (máscara). Dejar actuar **20 min**. Enjuagar bien.
     7. Secar 100%. Planchar mechones finos (10-15 veces).
     8. *Temperatura Plancha*: 230°C (Sano) / 180-200°C (Sensibilizado).

4. **LÍNEA PRO FUSION (Reconstrucción Enzimática)**:
   - *Objetivo*: Reposición de masa, pH ácido, para cabellos "chiclosos" o dañados.
   - *Activos*: Enzimas (Papaína), Proteínas hidrolizadas, Aminoácidos.
   - *Protocolo Reconstrucción*:
     1. Lavar 2 veces con **Fusion Shampoo**.
     2. Aplicar **Inner** (spray regenerador) en largos y puntas. Dejar actuar **10 min**.
     3. **SIN ENJUAGAR**, aplicar **Redress Ultraconditioner** encima. Dejar actuar otros **10 min**.
     4. Enjuagar todo.
     5. Aplicar **Save Home** (Leave-in) y **Pro Fusion Serum**.

5. **LÍNEA MY CROWN (Rizos y Curvas)**:
   - *Objetivo*: Definición, memoria de rizo, hidratación profunda sin peso.
   - *Tecnología*: Curvelini (extracto de lino dorado), Plantcol (colágeno vegetal).
   - *Productos Clave*:
     - **Crown Shampoo**: Limpieza suave (Low Poo).
     - **Crown Mask**: Hidratación de alta performance.
     - **Crown Finisher**: Definidor de rizos con memoria.
   - *Beneficio*: Rizos definidos, brillantes y con movimiento natural.

INSTRUCCIONES DE INTERACCIÓN:
- Si preguntan "¿Cómo se usa X?", da el paso a paso numerado con tiempos exactos.
- Si preguntan por ingredientes, menciona los activos clave.
- Detecta si el usuario es Estilista (usa lenguaje técnico: pH, cutícula) o Cliente Final (beneficios: brillo, suavidad).
- Idioma: Responde en el idioma del usuario (Español, Inglés, Portugués, etc.).
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