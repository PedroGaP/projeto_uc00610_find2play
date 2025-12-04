import {
  BackgroundImage,
  Center,
  Container,
  Stack,
  Text,
  Title,
  Box,
  Overlay,
  Button,
  Group,
} from "@mantine/core";
import { IconPlayerPlay, IconInfoCircle } from "@tabler/icons-react";
import heroImage from "@assets/hero_wallpaper.avif";

export function Hero() {
  return (
    <Box pos="relative" h={800}>
      <BackgroundImage
        src={heroImage}
        h="100%"
        style={{ backgroundPosition: "center" }}
      >
        <Overlay
          gradient="linear-gradient(180deg, rgba(6, 8, 38, 0.6) 0%, rgba(6, 8, 38, 1) 100%)"
          zIndex={1}
        />
        <Container size="xl" h="100%" pos="relative" style={{ zIndex: 2 }}>
          <Center h="100%">
            <Stack align="center" gap="xl" maw={900}>
              <Text
                c="brand"
                size="xl"
                fw={700}
                style={{
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  textShadow: "0 0 10px rgba(9, 200, 255, 0.5)",
                }}
              >
                Encontra o teu jogo favorito aqui e agora
              </Text>
              <Title
                c="white"
                order={1}
                size={80}
                fw={900}
                ta="center"
                style={{
                  lineHeight: 1,
                  fontFamily: "Orbitron, sans-serif",
                  textShadow: "0 0 20px rgba(0,0,0,0.5)",
                }}
              >
                Começa a tua{" "}
                <Text span c="brand" inherit>
                  JORNADA
                </Text>
              </Title>
              <Text c="gray.3" size="xl" ta="center" maw={700}>
                Descobre milhares de jogos grátis, experimenta e guarda os teus
                jogos favoritos!
              </Text>
              <Group mt="xl" gap="lg">
                <Button
                  size="xl"
                  radius="md"
                  color="brand"
                  rightSection={<IconPlayerPlay size={20} />}
                  style={{ boxShadow: "0 0 20px rgba(9, 200, 255, 0.4)" }}
                >
                  Começa a tua jornada
                </Button>
                <Button
                  size="xl"
                  radius="md"
                  variant="outline"
                  color="white"
                  rightSection={<IconInfoCircle size={20} />}
                  style={{ borderWidth: 2 }}
                >
                  Ver a tua coleção
                </Button>
              </Group>
            </Stack>
          </Center>
        </Container>
      </BackgroundImage>
    </Box>
  );
}
