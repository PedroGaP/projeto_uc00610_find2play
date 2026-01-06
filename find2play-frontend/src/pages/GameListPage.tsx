import { GameCard } from "@/components/GameCard";
import { Header } from "@/components/Header";
import { useGamesContext } from "@/context/use_games_context";
import type { GameType } from "@/types/GameType";
import {
  AppShell,
  Center,
  Container,
  Loader,
  Pagination,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) return [];

  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

export function GameListPage() {
  const { filterGames, games, filteredGames, translateGenre } =
    useGamesContext();
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const location = useLocation();

  const genre: string[] = location.state?.genre || [];
  const platform = location.state?.platform;
  const title = location.state?.title;

  useEffect(() => {
    filterGames({ genre, platform, title });
    setLoading(false);
  }, [genre, platform, title, games]);

  const data = chunk<GameType>(
    genre || platform || title ? filteredGames : games,
    12
  );
  const displayGames = data[activePage - 1] || [];

  if (loading) {
    return (
      <AppShell header={{ height: 80 }} style={{ backgroundColor: "#060826" }}>
        <Header />
        <AppShell.Main>
          <Center h="100vh" bg="#060826">
            <Loader color="brand" size="xl" type="dots" />
          </Center>
        </AppShell.Main>
      </AppShell>
    );
  }

  if (displayGames.length === 0) {
    return (
      <AppShell header={{ height: 80 }} style={{ backgroundColor: "#060826" }}>
        <Header />
        <AppShell.Main>
          <Center h="100vh" bg="#060826">
            <Text c="white" size="xl" align="center">
              Ainda não existem jogos disponíveis para a sua pesquisa.
            </Text>
          </Center>
        </AppShell.Main>
      </AppShell>
    );
  }

  return (
    <AppShell header={{ height: 80 }} style={{ backgroundColor: "#060826" }}>
      <Header />
      <AppShell.Main px={60}>
        <Text c="white" size="xl" fw={700}>
          DESCOBRE OS JOGOS QUE MAIS TE INTERESSAM
        </Text>
        <Text c="white" size="md" mb={20}>
          {genre || platform || title
            ? `Resultados da pesquisa para ${
                title ? `título "${title}"` : ""
              } ${
                genre.length
                  ? `género(s) ${genre
                      .map((g: Record<string, string>) => translateGenre(g.key))
                      .join(", ")}`
                  : ""
              } ${platform ? `plataforma "${platform}"` : ""}`
            : "Todos os jogos disponíveis na plataforma"}
        </Text>
        <Text size="md" mb={20}>
          Existem{" "}
          <strong>
            {genre || platform || title ? filteredGames.length : games.length}{" "}
          </strong>
          jogos disponíveis.
        </Text>

        <SimpleGrid cols={{ sm: 3 }} spacing="lg">
          {displayGames.length > 0 ? (
            displayGames.map((game: GameType) => (
              <GameCard key={game.id} game={game} />
            ))
          ) : (
            <Container flex={1} w={"100vw"} p={0}>
              <Text span c="brand" inherit>
                Não existem jogos disponíveis.
              </Text>
            </Container>
          )}
        </SimpleGrid>
        <Center pt={40} pb={40}>
          <Pagination
            total={data.length}
            value={activePage}
            onChange={setActivePage}
            color="brand"
          />
        </Center>
      </AppShell.Main>
    </AppShell>
  );
}
