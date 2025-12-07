export interface AudioConfig {
  sampleRate: number;
  channels: number;
}

export interface LiveConfig {
  model: string;
  voiceName: string;
}

export enum LiveStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  ERROR = 'error',
}

export interface MultimodalInput {
  text?: string;
  base64Image?: string;
}
