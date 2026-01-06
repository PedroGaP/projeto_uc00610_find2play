import {
  Button,
  Grid,
  Group,
  Select,
  TextInput,
  Paper,
  SimpleGrid,
  Text,
  Container,
  MultiSelect,
} from "@mantine/core";
import {
  IconSearch,
  IconDeviceGamepad,
  IconDeviceDesktop,
  IconFilter,
} from "@tabler/icons-react";
import { useGamesContext } from "@/context/use_games_context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function SearchWidget() {
  const [genre, setGenre] = useState<Record<string, string>[]>([]);
  const [platform, setPlatform] = useState("");
  const [title, setTitle] = useState("");
  const { genres, platforms } = useGamesContext();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/games", { state: { genre, platform, title } });
  };

  return (
    <Container size="xl" mt={-120} pos="relative" style={{ zIndex: 3 }}>
      <Paper
        shadow="xl"
        radius="md"
        p="xl"
        style={{
          backgroundColor: "rgba(20, 20, 40, 0.9)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(9, 200, 255, 0.3)",
          boxShadow: "0 0 30px rgba(0,0,0,0.5)",
        }}
      >
        <Group mb="lg">
          <IconFilter color="#09c8ff" />
          <Text c="white" fw={700} tt="uppercase" style={{ letterSpacing: 1 }}>
            Filtros de Jogo
          </Text>
        </Group>

        <Grid gutter="md" align="center">
          <Grid.Col span={{ base: 12, md: 12 }}>
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 4 }}
              spacing="md"
              verticalSpacing="md"
            >
              <MultiSelect
                placeholder="Género"
                data={genres.map(
                  (genre: Record<string, string>) => genre.value
                )}
                leftSection={<IconDeviceGamepad size={18} color="#09c8ff" />}
                onChange={(value: string[]) => {
                  const selectedGenres = genres.filter(
                    (g: Record<string, string>) => value.includes(g.value)
                  );

                  console.log(selectedGenres);

                  setGenre(selectedGenres);
                }}
                variant="filled"
                size="md"
                radius="md"
                styles={{
                  input: {
                    backgroundColor: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                  },
                  dropdown: {
                    backgroundColor: "#060826",
                    border: "1px solid rgba(9, 200, 255, 0.3)",
                  },
                  option: { color: "white" },
                }}
              />
              <Select
                onChange={(value) => {
                  setPlatform(value?.length ? value : "null");
                }}
                placeholder="Plataforma"
                data={platforms.map(
                  (platform: Record<string, string>) => platform.value
                )}
                leftSection={<IconDeviceDesktop size={18} color="#09c8ff" />}
                variant="filled"
                size="md"
                radius="md"
                styles={{
                  input: {
                    backgroundColor: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                  },
                  dropdown: {
                    backgroundColor: "#060826",
                    border: "1px solid rgba(9, 200, 255, 0.3)",
                  },
                  option: { color: "white" },
                }}
              />
              <TextInput
                placeholder="Procurar por título..."
                leftSection={<IconSearch size={18} color="#09c8ff" />}
                variant="filled"
                size="md"
                radius="md"
                styles={{
                  input: {
                    backgroundColor: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                  },
                }}
                onChange={(event) => setTitle(event.currentTarget.value)}
              />
              <Button
                color="brand"
                size="md"
                radius="md"
                fullWidth
                leftSection={<IconSearch size={20} />}
                style={{ boxShadow: "0 0 15px rgba(9, 200, 255, 0.3)" }}
                onClick={handleSearchClick}
              >
                Procurar jogos
              </Button>
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
}
