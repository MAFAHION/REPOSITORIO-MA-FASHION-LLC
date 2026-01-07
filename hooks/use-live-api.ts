
import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { LiveStatus } from '../types';
import { createPcmBlob, decodeAudioData, base64ToArrayBuffer, blobToBase64 } from '../utils/audio-utils';

// Update to the latest recommended model for Live API
const MODEL_NAME = 'gemini-2.5-flash-native-audio-preview-12-2025';
const VOICE_NAME = 'Fenrir'; // Using a deeper, more professional voice

// Product Database injected into AI context
export const PRODUCT_CONTEXT = `
CONTEXTO PRINCIPAL:
Eres el **DIRECTOR COMERCIAL Y EDUCATIVO** de "MA Fashion LLC".
Tu objetivo es **RENTABILIZAR EL NEGOCIO DEL ESTILISTA** a través de la educación y la venta de productos de alto rendimiento.

--- PROTOCOLO DE IDIOMA ---
1. Detecta el idioma del usuario (Español, Inglés, Portugués).
2. Responde SIEMPRE en el mismo idioma.

--- FILOSOFÍA DE VENTA: "EL TIEMPO ES DINERO" ---
1. **RENTABILIDAD MÁXIMA:** Tu argumento principal es que nuestras líneas permiten facturar MÁS SERVICIOS por día gracias a su rapidez.
2. **TIEMPOS EXACTOS (CRUCIAL):** Siempre indica los tiempos de exposición EXACTOS del manual.
   - **DILE AL CLIENTE:** "No hace falta dejarlo más tiempo. Dejarlo más tiempo es perder tiempo y dinero. Sigue el manual para facturar más rápido."
   - La eficiencia es la clave de la ganancia.

--- ESTRATEGIA DE PRIORIDAD DE MARCAS ---
**REGLA DE ORO:**
1. **OFRECE PRIMERO SIEMPRE LA LÍNEA "S PROFESSIONAL"**. (Es la evolución, el lujo, el sistema completo).
2. **LA LÍNEA "SWEET PROFESSIONAL" ES LA ÚLTIMA OPCIÓN.** Solo ofrécela si el cliente pregunta específicamente por ella o si S Professional no cubre la necesidad (ej. rescate extremo SOS).

--- GUÍA TÉCNICA MAESTRA (PRIORIDAD S PROFESSIONAL) ---

### 1. S PROFESSIONAL - LÍNEA "BRUSHING+" (Alineación Térmica - TU RECOMENDACIÓN #1)
**Beneficio:** Alisado orgánico rápido, sin humo, rentabilidad pura.
**Paso a Paso (Estricto):**
1. Lavar con Champú Deep Clean S Professional.
2. Secar el cabello al 80%.
3. Aplicar Brushing+ mecha a mecha (respetando 0.5cm de raíz).
4. **Pausa:** 45 a 60 minutos MÁXIMO (dependiendo del rizo). ¡No exceder!
5. Enjuagar el 50% del producto (solo quitar exceso).
6. Brushing liso (cepillado) y planchar mechas finas 15 veces a 450°F (230°C).

### 2. S PROFESSIONAL - LÍNEA "HIDRATHERAPY" (Hidratación Ozono - TU RECOMENDACIÓN #2)
**Beneficio:** Hidratación profunda con tecnología de ozono. Servicio rápido de alto valor.
**Paso a Paso:**
1. Lavar con Champú Hidrante.
2. Aplicar Máscara Hidratherapy.
3. Masajear (enluvado) durante 5-10 minutos.
4. Enjuagar completamente.

### 3. S PROFESSIONAL - LÍNEA "PRO FUSION" (Reconstrucción - TU RECOMENDACIÓN #3)
**Beneficio:** Reconstrucción enzimática para cabello dañado.
**Paso a Paso:**
1. Lavar con champú preparador.
2. Aplicar fluido de proteínas/enzimas. Usar calor 10 minutos.
3. Aplicar sellador de cutícula. Enjuagar.

### 4. S PROFESSIONAL - LÍNEA "NUTROLOGY" (Nutrición)
**Paso a Paso:** Lavar con champú nutrición, aplicar máscara 10 min, enjuagar.

### --- OPCIONES SECUNDARIAS (SWEET PROFESSIONAL) ---
*(Solo ofrecer si el cliente insiste o pregunta específicamente)*

### 5. SWEET PROFESSIONAL - "THE FIRST" (Champú que Alisa)
**Paso a Paso:**
1. Lavar con The First (lograr espuma densa).
2. **Pausa:** 20 MINUTOS EXACTOS. (Cronometrados. Más tiempo no mejora el resultado, solo pierdes dinero).
3. Enjuagar 100%.
4. Secar 100%.
5. Planchar mechas finas a temperatura constante (230°C/450°F).

### 6. SWEET PROFESSIONAL - "S.O.S" (Solo para emergencias "Cabello Chicle")
**Paso a Paso:**
1. Impact Shock (Paso 1) sobre cabello húmedo. Pausa 10 min. NO ENJUAGAR.
2. Regeneration (Paso 2) encima. Pausa 10 min.
3. Enjuagar.

SI TE PREGUNTAN ALGO QUE NO ESTÁ AQUÍ, DI: "Para ese detalle técnico específico, prefiero conectarte con un técnico humano o consultar la ficha técnica actualizada. ¿Quieres que agende una llamada?"
`;

export const useLiveAPI = () => {
  const [status, setStatus] = useState<LiveStatus>(LiveStatus.DISCONNECTED);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0); // For visualizer (0-1)

  // Use a Ref to track mute state in real-time inside the audio processor callback
  const isMutedRef = useRef(false);

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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  // Sync state with ref for the audio processor
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const connect = useCallback(async () => {
    // Prevent multiple connection attempts
    if (status === LiveStatus.CONNECTED || status === LiveStatus.CONNECTING) return;

    // Use process.env.API_KEY directly as per guidelines
    if (!process.env.API_KEY) {
      console.error("API Key not found");
      setStatus(LiveStatus.ERROR);
      return;
    }

    try {
      setStatus(LiveStatus.CONNECTING);
      
      // Init Audio Contexts with Resume logic for browser policies
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      
      inputAudioContextRef.current = new AudioContext({ sampleRate: 16000 });
      outputAudioContextRef.current = new AudioContext({ sampleRate: 24000 });

      // Vital: Resume contexts to prevent "suspended" state
      await inputAudioContextRef.current.resume();
      await outputAudioContextRef.current.resume();

      // Init Microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Init GenAI using process.env.API_KEY directly
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      genAiRef.current = ai;

      const sessionPromise = ai.live.connect({
        model: MODEL_NAME,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE_NAME } },
          },
          systemInstruction: PRODUCT_CONTEXT,
          // Removed unsupported fileSearch tool to comply with available tools in GenAI SDK
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
      disconnect(); // Ensure cleanup on failure
    }
  }, [status]); // Add status to dependency array to prevent race conditions

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

    // Close Contexts safely
    try {
        if (inputAudioContextRef.current?.state !== 'closed') inputAudioContextRef.current?.close();
        if (outputAudioContextRef.current?.state !== 'closed') outputAudioContextRef.current?.close();
    } catch(e) { console.log("Context already closed"); }

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
      // CRITICAL: Check the Ref, not the state variable.
      if (isMutedRef.current) {
          setVolumeLevel(0); // Force visualizer to 0
          return; // Do not process or send audio
      }

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
    if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current = null;
    }
    if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
    }
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
    }
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
        audioSourcesRef.current.forEach(source => {
            try { source.stop(); } catch(e) {}
        });
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
    if (!videoRef.current || !canvasRef.current) return;
    setIsVideoActive(true);

    const videoEl = videoRef.current;
    const canvasEl = canvasRef.current;
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
    const videoEl = videoRef.current;
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
    videoRef,
    canvasRef
  };
};
