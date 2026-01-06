import {
  Container,
  SimpleGrid,
  Title,
  Text,
  Group,
  Button,
} from "@mantine/core";
import { GameCard } from "./GameCard";
import { useGamesContext } from "@/context/use_games_context";
import type { GameType } from "@/types/GameType";
import { useNavigate } from "react-router-dom";

export function FeaturedGames() {
  const { trendingGames } = useGamesContext();
  const navigate = useNavigate();

  return (
    <Container size="xl" py={80} id="games">
      <Group justify="space-between" mb={50}>
        <Title
          order={2}
          size={36}
          c="white"
          style={{
            fontFamily: "Orbitron, sans-serif",
            textTransform: "uppercase",
          }}
        >
          Jogos{" "}
          <Text span c="brand" inherit>
            Populares
          </Text>
        </Title>
        <Button
          variant="subtle"
          color="brand"
          onClick={() => navigate("/games")}
        >
          Ver Todos
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {trendingGames.length > 0 ? (
          trendingGames.map((game: GameType) => (
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
    </Container>
  );
}
