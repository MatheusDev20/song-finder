export interface LLMProvider {
  create: () => void;
}

export type HttpClient = {
  GET: (details: RequestDetails) => Promise<any>;
};

export type RequestDetails = {
  path: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
};

type SongCompletion = {
  artist: string;
  name: string;
};

type MovieCompletion = {
  title: string;
  director: string;
};

export type CompletionsCategories = {
  music: SongCompletion;
  movies: MovieCompletion;
};

export type RecomendationCompletion<T> = {
  recomendations: T[];
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
