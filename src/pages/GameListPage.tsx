import { AppShell, Title } from "@mantine/core";
import { useLocation } from "react-router-dom";

export function GameListPage() {
  const location = useLocation();
  let genre = location.state?.genre;

  return (
    <AppShell>
      <Title order={2}>GameListPage {genre ?? "Todos"}</Title>
    </AppShell>
  );
}
