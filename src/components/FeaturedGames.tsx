import {
  Container,
  SimpleGrid,
  Title,
  Text,
  Group,
  Button,
} from "@mantine/core";
import { useGamesContext, type GameType } from "../context/use_games_context";
import { GameCard } from "./GameCard";

export function FeaturedGames() {
  const { trendingGames } = useGamesContext();

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
          Trending{" "}
          <Text span c="brand" inherit>
            Games
          </Text>
        </Title>
        <Button variant="subtle" color="brand">
          View All
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {trendingGames.map((game: GameType) => (
          <GameCard key={game.id} game={game} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
