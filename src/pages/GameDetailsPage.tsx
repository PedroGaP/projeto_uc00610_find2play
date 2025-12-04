import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AppShell,
  Box,
  Container,
  Title,
  Text,
  Image,
  Group,
  Badge,
  Button,
  Stack,
  Grid,
  Paper,
  Loader,
  Center,
  BackgroundImage,
  Overlay,
  SimpleGrid,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconBrowser,
  IconHeart,
  IconHeartFilled,
} from "@tabler/icons-react";
import { Header } from "../components/Header";
import { getGameDetails } from "../services/games_service";
import { useGamesContext, type GameType } from "../context/use_games_context";
import { Carousel } from "@mantine/carousel";

interface GameDetailsType extends GameType {
  description: string;
  minimum_system_requirements?: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  screenshots: { id: number; image: string }[];
  status: string;
}

export function GameDetailsPage() {
  const { id } = useParams();
  const { favoriteGames, toggleFavoriteGame } = useGamesContext();
  const navigate = useNavigate();
  const [game, setGame] = useState<GameDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getGameDetails(id).then((data) => {
        setGame(data as GameDetailsType);
        setLoading(false);
      });
    }
  }, [id]);

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

  if (!game) {
    return (
      <AppShell header={{ height: 80 }} style={{ backgroundColor: "#060826" }}>
        <Header />
        <AppShell.Main>
          <Center h="100vh" bg="#060826">
            <Stack align="center">
              <Title c="white">Jogo não encontrado</Title>
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                color="brand"
              >
                Voltar para a Biblioteca
              </Button>
            </Stack>
          </Center>
        </AppShell.Main>
      </AppShell>
    );
  }

  return (
    <AppShell header={{ height: 80 }} style={{ backgroundColor: "#060826" }}>
      <Header />
      <AppShell.Main py="0">
        <Box bg="#060826" style={{ minHeight: "100vh", color: "white" }}>
          <Box pos="relative" h={500}>
            <BackgroundImage
              src={game.screenshots?.[0]?.image || game.thumbnail}
              h="100%"
            >
              <Overlay
                gradient="linear-gradient(180deg, rgba(6, 8, 38, 0.3) 0%, rgba(6, 8, 38, 1) 100%)"
                zIndex={1}
              />
              <Container
                size="xl"
                h="100%"
                pos="relative"
                style={{ zIndex: 2 }}
              >
                <Stack justify="flex-end" h="100%" pb={50}>
                  <Button
                    leftSection={<IconArrowLeft size={20} />}
                    variant="subtle"
                    color="white"
                    w="fit-content"
                    onClick={() => navigate("/")}
                    mb="xl"
                  >
                    Voltar para a Biblioteca
                  </Button>

                  <Group align="flex-start" gap="xl">
                    <Stack>
                      <Image
                        src={game.thumbnail}
                        radius="md"
                        w={300}
                        style={{
                          border: "2px solid rgba(255,255,255,0.1)",
                          boxShadow: "0 0 30px rgba(0,0,0,0.5)",
                        }}
                      />
                      <Button
                        leftSection={
                          favoriteGames.includes(game.id) ? (
                            <IconHeartFilled size={20} color="red" />
                          ) : (
                            <IconHeart size={20} />
                          )
                        }
                        variant="subtle"
                        color="white"
                        w="fit-content"
                        onClick={() => toggleFavoriteGame(game.id)}
                        mb="xl"
                      >
                        Adicionar aos Favoritos
                      </Button>
                    </Stack>
                    <Stack gap="xs">
                      <Title
                        order={1}
                        size={60}
                        style={{
                          fontFamily: "Orbitron, sans-serif",
                          textShadow: "0 0 20px rgba(9, 200, 255, 0.5)",
                        }}
                      >
                        {game.title}
                      </Title>
                      <Group>
                        <Badge size="lg" color="brand" variant="filled">
                          {game.genre}
                        </Badge>
                        <Badge size="lg" color="gray" variant="outline">
                          {game.platform}
                        </Badge>
                        <Badge
                          size="lg"
                          color={game.status === "Live" ? "green" : "yellow"}
                          variant="dot"
                        >
                          {game.status}
                        </Badge>
                      </Group>
                    </Stack>
                  </Group>
                </Stack>
              </Container>
            </BackgroundImage>
          </Box>

          <Container size="xl" py="xl">
            <Grid gutter="xl">
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Paper
                  p="xl"
                  radius="md"
                  bg="rgba(255,255,255,0.03)"
                  style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <Title
                    order={2}
                    mb="md"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                    Sobre o Jogo
                  </Title>
                  <Text
                    c="gray.3"
                    style={{ lineHeight: 1.6, whiteSpace: "pre-line" }}
                  >
                    {game.description}
                  </Text>

                  {game.minimum_system_requirements && (
                    <>
                      <Title
                        order={3}
                        mt="xl"
                        mb="md"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                        Requisitos do Sistema
                      </Title>
                      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                        <Box>
                          <Text c="brand" fw={700}>
                            Sistema Operacional
                          </Text>
                          <Text c="gray.4">
                            {game.minimum_system_requirements.os}
                          </Text>
                        </Box>
                        <Box>
                          <Text c="brand" fw={700}>
                            Processador
                          </Text>
                          <Text c="gray.4">
                            {game.minimum_system_requirements.processor}
                          </Text>
                        </Box>
                        <Box>
                          <Text c="brand" fw={700}>
                            Memória
                          </Text>
                          <Text c="gray.4">
                            {game.minimum_system_requirements.memory}
                          </Text>
                        </Box>
                        <Box>
                          <Text c="brand" fw={700}>
                            Gráficos
                          </Text>
                          <Text c="gray.4">
                            {game.minimum_system_requirements.graphics}
                          </Text>
                        </Box>
                        <Box>
                          <Text c="brand" fw={700}>
                            Armazenamento
                          </Text>
                          <Text c="gray.4">
                            {game.minimum_system_requirements.storage}
                          </Text>
                        </Box>
                      </SimpleGrid>
                    </>
                  )}
                </Paper>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="md">
                  <Paper
                    p="xl"
                    radius="md"
                    bg="rgba(255,255,255,0.03)"
                    style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <Title
                      order={3}
                      mb="md"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      Informações
                    </Title>
                    <Stack gap="sm">
                      <Group justify="space-between">
                        <Text c="gray.5">Desenvolvedor</Text>
                        <Text fw={600}>{game.developer}</Text>
                      </Group>
                      <Group justify="space-between">
                        <Text c="gray.5">Editor</Text>
                        <Text fw={600}>{game.publisher}</Text>
                      </Group>
                      <Group justify="space-between">
                        <Text c="gray.5">Data de Lançamento</Text>
                        <Text fw={600}>{game.release_date}</Text>
                      </Group>
                    </Stack>
                  </Paper>

                  <Button
                    component="a"
                    href={game.game_url}
                    target="_blank"
                    size="xl"
                    color="brand"
                    fullWidth
                    rightSection={<IconBrowser size={20} />}
                    style={{ boxShadow: "0 0 20px rgba(9, 200, 255, 0.3)" }}
                  >
                    Jogar Agora
                  </Button>

                  <Paper
                    p="xl"
                    radius="md"
                    bg="rgba(255,255,255,0.03)"
                    style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <Title
                      order={3}
                      mb="md"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      Screenshots
                    </Title>
                    <Carousel
                      orientation="vertical"
                      height={200}
                      withIndicators
                    >
                      {game.screenshots?.map((screenshot, index) => (
                        <Carousel.Slide key={index}>
                          <Image
                            src={screenshot.image}
                            fit="cover"
                            height={200}
                            width="100%"
                            radius="md"
                          />
                        </Carousel.Slide>
                      ))}
                    </Carousel>
                  </Paper>
                </Stack>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
