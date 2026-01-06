import {
  Group,
  Text,
  Anchor,
  AppShell,
  ActionIcon,
  Tooltip,
  Indicator,
  Menu,
  Center,
} from "@mantine/core";
import {
  IconChevronDown,
  IconDeviceGamepad2,
  IconHeart,
} from "@tabler/icons-react";
import { useGamesContext } from "../context/use_games_context";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { favoriteGames, genres } = useGamesContext();
  const navigate = useNavigate();

  return (
    <AppShell.Header
      component="header"
      py="md"
      px="xl"
      style={{
        borderBottom: "1px solid rgba(0, 255, 255, 0.2)",
        backgroundColor: "rgba(10, 10, 20, 0.8)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
      my="0"
    >
      <Group justify="space-between">
        <Group
          gap="xs"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <IconDeviceGamepad2 size={32} color="#09c8ff" />
          <Text
            fw={900}
            size="xl"
            style={{
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: "Orbitron, sans-serif",
            }}
            c="white"
          >
            Find
            <Text span c="brand" inherit>
              2
            </Text>
            Play
          </Text>
        </Group>
        <Group gap="xl" visibleFrom="md">
          <Anchor
            href="#"
            c="white"
            fw={700}
            underline="never"
            fz="sm"
            style={{ textTransform: "uppercase", letterSpacing: 1 }}
          >
            Jogos
          </Anchor>
          <Menu>
            <Menu.Target>
              <Anchor
                href="#"
                c="dimmed"
                fw={600}
                underline="never"
                fz="sm"
                style={{ textTransform: "uppercase", letterSpacing: 1 }}
                onClick={(e) => e.preventDefault()}
              >
                <Center>
                  Géneros
                  <IconChevronDown />
                </Center>
              </Anchor>
            </Menu.Target>
            <Menu.Dropdown style={{ maxHeight: "400px", overflowY: "auto" }}>
              {genres.map((genre: Record<string, string>) => (
                <Menu.Item
                  key={genre.key}
                  onClick={() =>
                    navigate(`/games`, { state: { genre: [genre] } })
                  }
                >
                  {genre.value}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Group gap="md">
          <Tooltip label="Gostos">
            <ActionIcon
              onClick={() => navigate("/favorites")}
              variant="transparent"
              size="xl"
              aria-label="Toggle color scheme"
              c="dimmed"
            >
              <Indicator label={favoriteGames.length}>
                <IconHeart />
              </Indicator>
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
