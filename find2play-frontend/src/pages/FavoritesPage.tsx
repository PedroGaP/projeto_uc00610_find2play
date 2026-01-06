import { GameCard } from "@/components/GameCard";
import { Header } from "@/components/Header";
import { genres, useGamesContext } from "@/context/use_games_context";
import { getGameDetails } from "@/services/games_service";
import type { GameType } from "@/types/GameType";
import {
  AppShell,
  Center,
  Container,
  Loader,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const { favoriteGames } = useGamesContext();
  const [games, setGames] = useState<GameType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteGames = async () => {
      if (!loading) setLoading(true);
      const favoriteGamesDetails: (GameType | null)[] =
        (await Promise.all(
          favoriteGames.map(
            async (id: number) => await getGameDetails(id.toString())
          )
        )) ?? [];

      favoriteGamesDetails.forEach((e: GameType | null) => {
        if (e == null) return;
        e.genre =
          genres.find(
            (g) => g.key.toLocaleLowerCase() === e.genre.toLocaleLowerCase()
          )?.value || e.genre;
      });

      setGames(favoriteGamesDetails as GameType[]);
      setLoading(false);
    };

    fetchFavoriteGames();
  }, [favoriteGames]);

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

  if (games.length === 0) {
    return (
      <AppShell header={{ height: 80 }} style={{ backgroundColor: "#060826" }}>
        <Header />
        <AppShell.Main>
          <Center h="100vh" bg="#060826">
            <Text c="white" size="xl">
              Ainda não há jogos favoritos.
              <br /> Vá até a página de jogos para adicionar favoritos.
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
        <Text c="white" size="xl" fw={700} mb={30}>
          OS MEUS JOGOS FAVORITOS
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
          {games.length > 0 ? (
            games.map((game: GameType) => (
              <GameCard key={game.id} game={game} />
            ))
          ) : (
            <Container flex={1} w={"100vw"} p={0}>
              <Text span c="brand" inherit>
                Não existem jogos disponiveis em destaque.
              </Text>
            </Container>
          )}
        </SimpleGrid>
      </AppShell.Main>
    </AppShell>
  );
}
