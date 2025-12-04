import { getTrendingGames } from "@/services/games_service";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type GameType = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
};

export type SearchParams = {
  genre: string;
  platform: string;
  title: string;
};

type GamesType = {
  games: GameType[];
  genres: Record<string, string>[];
  platforms: Record<string, string>[];
  sorts: Record<string, string>[];
  search: string;
  trendingGames: GameType[];
  filteredGames: GameType[];
  setSearch: (search: string) => void;
  filterGames: (param: SearchParams) => void;
};

const GamesContext = createContext({} as GamesType);

export function GamesProvider({ children }: { children: ReactNode }) {
  const genres: Record<string, string>[] = [
    { key: "mmorpg", value: "MMORPG" },
    { key: "shooter", value: "Tiro / Atirador" },
    { key: "strategy", value: "Estratégia" },
    { key: "moba", value: "MOBA" },
    { key: "racing", value: "Corrida" },
    { key: "sports", value: "Desporto" },
    { key: "social", value: "Social" },
    { key: "sandbox", value: "Sandbox" },
    { key: "open-world", value: "Mundo Aberto" },
    { key: "survival", value: "Sobrevivência" },
    { key: "pvp", value: "PVP" },
    { key: "pve", value: "PVE" },
    { key: "pixel", value: "Pixel" },
    { key: "voxel", value: "Voxel" },
    { key: "zombie", value: "Zombie" },
    { key: "turn-based", value: "Turn-Based" },
    { key: "first-person", value: "Primeira-Pessoa" },
    { key: "third-person", value: "Terceira-Pessoa" },
    { key: "top-down", value: "Top-Down" },
    { key: "tank", value: "Tanque" },
    { key: "space", value: "Espaço" },
    { key: "sailing", value: "Navegação" },
    { key: "side-scroller", value: "Side-Scroller" },
    { key: "superhero", value: "Super Heroi" },
    { key: "permadeath", value: "Morte Permanente / Hardcore" },
    { key: "card", value: "Cartas" },
    { key: "battle-royale", value: "Battle Royale" },
    { key: "mmo", value: "MMO" },
    { key: "mmofps", value: "MMOFPS" },
    { key: "mmotps", value: "MMOTP" },
    { key: "3d", value: "3D" },
    { key: "2d", value: "2D" },
    { key: "anime", value: "Anime" },
    { key: "fantasy", value: "Fantasia" },
    { key: "sci-fi", value: "Ciência-Ficcção" },
    { key: "fighting", value: "Luta" },
    { key: "action-rpg", value: "Ação-RPG" },
    { key: "action", value: "Ação" },
    { key: "military", value: "Militar" },
    { key: "martial-arts", value: "Artes Marciais" },
    { key: "flight", value: "Voo" },
    { key: "low-spec", value: "Low-Spec" },
    { key: "tower-defense", value: "Tower Defense" },
    { key: "horror", value: "Terror" },
    { key: "mmorts", value: "MMORTS" },
  ];
  const platforms: Record<string, string>[] = [
    { key: "pc", value: "PC" },
    { key: "browser", value: "Browser" },
    { key: "all", value: "Todas" },
  ];
  const sorts: Record<string, string>[] = [
    { key: "release-date", value: "Data de Lançamento" },
    { key: "popularity", value: "Popularidade" },
    { key: "alphabetical", value: "Alfabeticamente" },
    { key: "relevance", value: "Relevância" },
  ];
  const [games, setGames] = useState<GameType[]>([]);
  const [filteredGames, setFilteredGames] = useState<GameType[]>([]);
  const [trendingGames, setTrendingGames] = useState<GameType[]>([]);
  const [search, setSearch] = useState("");

  const filterGames = (params: SearchParams) => {
    setFilteredGames(
      games.filter((game) => {
        return (
          game.genre.toLowerCase().includes(params.genre.toLowerCase()) &&
          game.platform.toLowerCase().includes(params.platform.toLowerCase()) &&
          game.title.toLowerCase().includes(params.title.toLowerCase())
        );
      })
    );
  };

  useEffect(() => {
    getTrendingGames().then((games) => setTrendingGames(games));
  }, []);

  return (
    <GamesContext.Provider
      value={{
        games,
        genres,
        platforms,
        sorts,
        search,
        filteredGames,
        trendingGames,
        setSearch,
        filterGames,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}

export const useGamesContext = () => useContext(GamesContext);
