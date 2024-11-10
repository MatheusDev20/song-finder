import { z } from 'zod';

export const Songs = z.object({
  artistName: z.string(),
  musicName: z.string(),
});

export const Movies = z.object({
  movieName: z.string(),
  directorName: z.string(),
});

export const StructuredData = z.object({
  recomendations: z.array(z.union([Songs, Movies])),
});
