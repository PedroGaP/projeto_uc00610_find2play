import {
  Group,
  Text,
  Anchor,
  AppShell,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Avatar,
  Badge,
} from "@mantine/core";
import { IconSun, IconMoon, IconDeviceGamepad2 } from "@tabler/icons-react";

export function Header() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

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
    >
      <Group justify="space-between">
        {/* Logo */}
        <Group gap="xs" style={{ cursor: "pointer" }}>
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

        {/* Main Navigation */}
        <Group gap="xl" visibleFrom="md">
          <Anchor
            href="#"
            c="white"
            fw={700}
            underline="never"
            fz="sm"
            style={{ textTransform: "uppercase", letterSpacing: 1 }}
          >
            Library
          </Anchor>
          <Anchor
            href="#"
            c="dimmed"
            fw={600}
            underline="never"
            fz="sm"
            style={{ textTransform: "uppercase", letterSpacing: 1 }}
          >
            Community
          </Anchor>
          <Anchor
            href="#"
            c="dimmed"
            fw={600}
            underline="never"
            fz="sm"
            style={{ textTransform: "uppercase", letterSpacing: 1 }}
          >
            Leaderboard
          </Anchor>
          <Anchor
            href="#"
            c="dimmed"
            fw={600}
            underline="never"
            fz="sm"
            style={{ textTransform: "uppercase", letterSpacing: 1 }}
          >
            Support
          </Anchor>
        </Group>

        {/* User Profile & Actions */}
        <Group gap="md">
          <Group
            gap="xs"
            bg="rgba(255,255,255,0.05)"
            p={4}
            style={{ borderRadius: 50, paddingRight: 15 }}
          >
            <Avatar
              src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=100"
              radius="xl"
              size="sm"
            />
            <Text size="xs" fw={700} c="white">
              Player 1
            </Text>
            <Badge size="xs" color="yellow" variant="filled">
              LVL 99
            </Badge>
          </Group>

          <ActionIcon
            onClick={() =>
              setColorScheme(computedColorScheme === "light" ? "dark" : "light")
            }
            variant="transparent"
            size="lg"
            aria-label="Toggle color scheme"
            c="dimmed"
          >
            {computedColorScheme === "light" ? (
              <IconMoon size={20} />
            ) : (
              <IconSun size={20} />
            )}
          </ActionIcon>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
