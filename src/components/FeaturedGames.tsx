import {
  Container,
  SimpleGrid,
  Title,
  Card,
  Image,
  Text,
  AspectRatio,
  Overlay,
  Center,
  Badge,
  Group,
  Button,
} from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
import { useGamesContext, type GameType } from "../context/use_games_context";

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
          <Card
            key={game.title}
            p={0}
            radius="md"
            style={{
              overflow: "hidden",
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "#0a0a0a",
            }}
            className="game-card"
          >
            <AspectRatio ratio={3 / 4}>
              <Image src={game.thumbnail} alt={game.title} />
              <Overlay
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%)"
                opacity={0.8}
                zIndex={1}
              />
              <Center
                p="md"
                pos="absolute"
                bottom={0}
                left={0}
                w="100%"
                style={{
                  zIndex: 2,
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Group justify="space-between" w="100%" mb="xs">
                  <Badge color="brand" variant="filled">
                    {game.genre}
                  </Badge>
                </Group>
                <Title order={3} c="white" size="h4">
                  {game.title}
                </Title>
              </Center>

              {/* Hover Overlay */}
              <Overlay
                color="#000"
                opacity={0}
                zIndex={3}
                style={{
                  transition: "opacity 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
              >
                <Button
                  color="brand"
                  radius="xl"
                  size="lg"
                  leftSection={<IconPlayerPlay size={20} />}
                >
                  Play Now
                </Button>
              </Overlay>
            </AspectRatio>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
