/* eslint-disable @typescript-eslint/no-unused-vars */
import { SongDetailsDTO } from 'src/@types';

export const songDetailsParser = (data: any): SongDetailsDTO => {
  if (data.tracks.items.length === 0) return null;

  const [item] = data.tracks.items;
  if (!item) return null;

  const {
    album: { available_markets, release_date_precision, type, uri, ...useFull },
  } = item;

  return {
    songName: item.name,
    artistName: item.artists[0].name ?? '',
    album: useFull,
    spotfy_external_id: item.id,
  };
};
