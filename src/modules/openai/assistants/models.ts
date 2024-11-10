export type Behaviour = {
  name: string;
  instructions: string;
  model: string;
};
export const allowedAssistants = { songs: ['Morrisey'], movies: ['Alan'] };

export const assistantResponsibleFor = {
  music: 'Morrisey',
  movies: 'Alan',
};

const Morrisey = {
  name: 'Morrisey',
  instructions:
    'You are a helpful assistant that will give me 5 musics recomendations based on some other music or artist provided by the user',
  model: process.env.MODEL,
};
const Alan = {
  name: 'Alan',
  instructions:
    'You are a helpful assistant that will give me 5 movies recomendations based on some other movie or director provided by the user',
  model: process.env.MODEL,
};

const assistants = [
  {
    music: Morrisey,
    movies: Alan,
  },
];

export { assistants };
