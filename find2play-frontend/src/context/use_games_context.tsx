import {
  addFavoriteGame,
  getAllGames,
  getFavoriteGames,
  getTrendingGames,
  removeFavoriteGame,
} from "@/services/games_service";
import type { GamesType } from "@/types/GamesType";
import type { GameType } from "@/types/GameType";
import type { SearchParams } from "@/types/SearchParams";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const GamesContext = createContext({} as GamesType);

export const genres: Record<string, string>[] = [
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

export const platforms: Record<string, string>[] = [
  { key: "pc", value: "PC" },
  { key: "browser", value: "Browser" },
  { key: "all", value: "Todas" },
];

export const sorts: Record<string, string>[] = [
  { key: "release-date", value: "Data de Lançamento" },
  { key: "popularity", value: "Popularidade" },
  { key: "alphabetical", value: "Alfabeticamente" },
  { key: "relevance", value: "Relevância" },
];

export function GamesProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState([] as GameType[]);
  const [favoriteGames, setFavoriteGames] = useState([] as number[]);
  const [filteredGames, setFilteredGames] = useState([] as GameType[]);
  const [trendingGames, setTrendingGames] = useState([] as GameType[]);
  const [search, setSearch] = useState("");

  const translateGenre = (genreKey: string): string => {
    const genre = genres.find(
      (g) => g.key.toLocaleLowerCase() === genreKey.toLocaleLowerCase()
    );
    return genre != null ? genre.value : genreKey;
  };

  const filterGames = (params: SearchParams) => {
    const filtered = games.filter((game) => {
      const hasGenreFilter = params.genre && params.genre.length > 0;
      const matchGenre = hasGenreFilter
        ? params.genre.some((g: any) => {
            const genreKey = typeof g === "string" ? g : g.key;
            return game.genre.toLowerCase().includes(genreKey.toLowerCase());
          })
        : true;

      const matchPlatform =
        params.platform && params.platform.trim() !== ""
          ? game.platform.toLowerCase().includes(params.platform.toLowerCase())
          : true;

      const matchTitle =
        params.title && params.title.trim() !== ""
          ? game.title.toLowerCase().includes(params.title.toLowerCase())
          : true;

      return matchGenre && matchPlatform && matchTitle;
    });

    setFilteredGames(filtered);
  };

  const toggleFavoriteGame = async (gameId: number) => {
    if (favoriteGames.includes(gameId)) {
      await removeFavoriteGame(gameId);
      setFavoriteGames((prev) => prev.filter((id) => id !== gameId));
      return;
    }

    await addFavoriteGame(gameId);
    setFavoriteGames((prev) => [...prev, gameId]);
  };

  useEffect(() => {
    getAllGames().then((games) => {
      setGames(games);
    });
    getTrendingGames().then((games) => setTrendingGames(games.slice(0, 12)));
    getFavoriteGames().then((games) => setFavoriteGames(games));
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
        favoriteGames,
        setSearch,
        filterGames,
        toggleFavoriteGame,
        translateGenre,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}

export const useGamesContext = () => useContext(GamesContext);
