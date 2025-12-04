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
