import { MovieDTO } from 'src/@types';
import { tmdbConfig } from 'src/config/tmdb';

export const movieDetailsParser = (data: any): MovieDTO => {
  const { results } = data;
  if (results.length === 0) return null;
  const [movie] = results;
  const { backdrop_path, poster_path, ...rest } = movie;

  return {
    ...rest,
    backdrop_full_url: `${process.env.TMDB_SECURE_BASE_IMG_URL}/${tmdbConfig.backdrop_sizes.w300}/${backdrop_path}`,
    poster_full_url: `${process.env.TMDB_SECURE_BASE_IMG_URL}/${tmdbConfig.backdrop_sizes.w300}/${tmdbConfig.backdrop_sizes}${poster_path}`,
  };
};
