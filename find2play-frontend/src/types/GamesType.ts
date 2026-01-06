import type { GameType } from "./GameType";
import type { SearchParams } from "./SearchParams";

export type GamesType = {
  games: GameType[];
  genres: Record<string, string>[];
  platforms: Record<string, string>[];
  sorts: Record<string, string>[];
  search: string;
  trendingGames: GameType[];
  filteredGames: GameType[];
  favoriteGames: number[];
  setSearch: (search: string) => void;
  filterGames: (param: SearchParams) => void;
  toggleFavoriteGame: (gameId: number) => void;
  translateGenre: (genre: string) => void;
};
