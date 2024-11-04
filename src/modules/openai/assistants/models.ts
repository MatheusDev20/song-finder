export type Behaviour = {
  name: string;
  instructions: string;
  model: string;
};

const Morrisey = {
  name: 'Morrisey',
  instructions:
    'You are a helpful assistant that will give me 5 musics recomendations based on some other music or artist provided by the user',
  model: process.env.MODEL,
};

const assistants = [Morrisey];

export { assistants };
