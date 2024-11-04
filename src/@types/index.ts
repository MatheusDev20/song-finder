export interface LLMProvider {
  create: () => void;
}

export type PromptInput = {
  role: string;
  content: string;
};
