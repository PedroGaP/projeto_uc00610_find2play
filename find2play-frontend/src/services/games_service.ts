import { genres } from "@/context/use_games_context";
import type { GameType } from "@/types/GameType";
import { notifications } from "@mantine/notifications";

//const GAMES_URL: string = "https://api.find2play.grod.ovh/api/games?sort-by=relevance";
//const SINGLE_GAME_URL: string = "https://api.find2play.grod.ovh/api/game";

const GAMES_URL: string = "http://localhost:3001/api/games?sort-by=relevance";
const SINGLE_GAME_URL: string = "http://localhost:3001/api/game";

export const getAllGames = async (): Promise<GameType[]> => {
  let data = await fetch(GAMES_URL, {
    method: "GET",
  });

  let response: GameType[] = await data.json();

  if (data.status != 200) {
    notifications.show({
      title: "Erro!",
      message: "Erro ao ler os jogos da API.",
      color: "red",
    });
    return [];
  }

  if (response.length == 0) {
    notifications.show({
      title: "Erro!",
      message: "Nenhum jogo encontrado.",
      color: "red",
    });
    return [];
  }

  let allGames: GameType[] = response;

  /*allGames.forEach((e) => {
    e.genre =
      genres.find(
        (g) => g.key.toLocaleLowerCase() === e.genre.toLocaleLowerCase()
      )?.value || e.genre;
  });*/

  return allGames;
};

export const getTrendingGames = async (): Promise<GameType[]> => {
  let data = await fetch(GAMES_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let response: GameType[] = await data.json();

  if (data.status != 200) {
    notifications.show({
      title: "Erro!",
      message: "Erro ao ler os jogos da API.",
      color: "red",
    });
    return [];
  }

  if (response.length == 0) {
    notifications.show({
      title: "Erro!",
      message: "Nenhum jogo encontrado.",
      color: "red",
    });
    return [];
  }

  let trending: GameType[] = response;

  trending.forEach((e) => {
    e.genre =
      genres.find(
        (g) => g.key.toLocaleLowerCase() === e.genre.toLocaleLowerCase()
      )?.value || e.genre;
  });

  return trending;
};

export const getGameDetails = async (id: string): Promise<GameType | null> => {
  try {
    let data = await fetch(`${SINGLE_GAME_URL}?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.status !== 200) {
      notifications.show({
        title: "Erro!",
        message: "Erro ao carregar detalhes do jogo.",
        color: "red",
      });
      return null;
    }

    let response: GameType = await data.json();
    return response;
  } catch (error) {
    notifications.show({
      title: "Erro!",
      message: "Ocorreu um erro inesperado.",
      color: "red",
    });
    return null;
  }
};

export const getFavoriteGames = async (): Promise<number[]> => {
  const localStorage = window.localStorage;

  if (!localStorage) {
    return [];
  }

  const favoritedGames = localStorage.getItem("favoritedGames");

  if (!favoritedGames) {
    return [];
  }

  return JSON.parse(favoritedGames);
};

export const addFavoriteGame = async (gameId: number) => {
  const localStorage = window.localStorage;

  if (!localStorage) {
    return;
  }

  const favoritedGames = localStorage.getItem("favoritedGames");

  if (!favoritedGames) {
    localStorage.setItem("favoritedGames", JSON.stringify([gameId]));
    return;
  }

  const favoritedGamesArray = JSON.parse(favoritedGames);

  if (favoritedGamesArray.includes(gameId)) {
    return;
  }

  localStorage.setItem(
    "favoritedGames",
    JSON.stringify([...favoritedGamesArray, gameId])
  );
};

export const removeFavoriteGame = async (gameId: number) => {
  const localStorage = window.localStorage;

  if (!localStorage) {
    return;
  }

  const favoritedGames = localStorage.getItem("favoritedGames");

  if (!favoritedGames) {
    return;
  }

  const favoritedGamesArray = JSON.parse(favoritedGames);

  if (!favoritedGamesArray.includes(gameId)) {
    return;
  }

  localStorage.setItem(
    "favoritedGames",
    JSON.stringify(favoritedGamesArray.filter((id: number) => id !== gameId))
  );
};
