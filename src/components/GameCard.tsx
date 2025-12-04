import {
  AspectRatio,
  Badge,
  Button,
  Card,
  Box,
  Group,
  Overlay,
  Title,
  Image,
} from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
import { type GameType } from "../context/use_games_context";
import { useNavigate } from "react-router-dom";

export function GameCard({ game }: { game: GameType }) {
  const navigate = useNavigate();

  return (
    <Card
      key={game.title}
      p={0}
      radius="md"
      style={{
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid rgba(255,255,255,0.1)",
        backgroundColor: "#0a0a0a",
        height: "auto",
      }}
      className="game-card"
    >
      <AspectRatio ratio={16 / 9}>
        <Image src={game.thumbnail} alt={game.title} fit="cover" />
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, .8) 40%, rgba(0, 0, 0, .5) 100%)"
          opacity={0.8}
          zIndex={2}
        />

        <Box
          p="md"
          pos="absolute"
          bottom={0}
          left={0}
          w="100%"
          style={{
            zIndex: 2,
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
        </Box>
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
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
        >
          <Button
            color="brand"
            radius="xl"
            size="lg"
            leftSection={<IconPlayerPlay size={20} />}
            onClick={() => navigate(`/game/${game.id}`)}
          >
            Ver Detalhes
          </Button>
        </Overlay>
      </AspectRatio>
    </Card>
  );
}
