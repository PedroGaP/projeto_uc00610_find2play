import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { LandingPage } from "./pages/LandingPage";
import { GamesProvider } from "@/context/use_games_context";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameDetailsPage } from "./pages/GameDetailsPage";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { GameListPage } from "./pages/GameListPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GamesProvider>
      <MantineProvider
        defaultColorScheme="dark"
        theme={{
          colors: {
            brand: [
              "#e0fbff",
              "#cbf7ff",
              "#9aeaff",
              "#64ddff",
              "#3ad2ff",
              "#20cbff",
              "#09c8ff",
              "#00b1e4",
              "#009dcc",
              "#0087b5",
            ],
            accent: [
              "#fceebf",
              "#f8d78e",
              "#f3be5f",
              "#eea32f",
              "#ea8b00",
              "#d07a00",
              "#a25f00",
              "#764500",
              "#4d2c00",
              "#261400",
            ],
          },
          primaryColor: "brand",
          fontFamily: "Orbitron, sans-serif",
          headings: { fontFamily: "Orbitron, sans-serif" },
        }}
      >
        <Notifications />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/game/:id" element={<GameDetailsPage />} />
            <Route path="/games" element={<GameListPage />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </GamesProvider>
  </StrictMode>
);
