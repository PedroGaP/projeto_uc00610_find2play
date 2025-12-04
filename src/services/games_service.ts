import { notifications } from "@mantine/notifications";
import type { GameType } from "../context/use_games_context";

export const getTrendingGames = async (): Promise<GameType[]> => {
  let data = await fetch("/api/games?sort-by=relevance", {
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

  return response;
};

export const getGameDetails = async (id: string): Promise<GameType | null> => {
  try {
    let data = await fetch(`/api/game?id=${id}`, {
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
