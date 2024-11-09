export interface LLMProvider {
  create: () => void;
}

export type HttpClient = {
  GET: (details: RequestDetails) => Promise<any>;
};

export type RequestDetails = {
  path: string;
  headers?: Record<string, string>;
};

type SongCompletion = {
  artist: string;
  name: string;
};

export type SongRecomendationCompletion = {
  recomendations: SongCompletion[];
};

export type PromptInput = {
  role: string;
  content: string;
};

export type LoggerFunctions = {
  generatedCompletion: (completion: string) => void;
};

export type AuthProvider = {
  getAuthHeaders: () => Promise<any>;
};
