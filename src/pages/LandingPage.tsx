import { AppShell, Box } from "@mantine/core";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { SearchWidget } from "../components/SearchWidget";
import { FeaturedGames } from "../components/FeaturedGames";

export function LandingPage() {
  return (
    <AppShell header={{ height: 80 }} style={{ backgroundColor: "#060826" }}>
      <Header />
      <AppShell.Main py="0">
        <Box bg="#060826" style={{ minHeight: "100vh" }}>
          <Hero />
          <SearchWidget />
          <FeaturedGames />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
