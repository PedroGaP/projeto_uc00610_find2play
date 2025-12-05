import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());

app.use(express.json());

app.get("/api/games", async (req, res) => {
  const sort = req.query["sort-by"] || "relevance";
  try {
    const response = await fetch(`https://www.freetogame.com/api/games?sort-by=${sort}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

app.get("/api/game", async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: "Missing id parameter" });

  try {
    const response = await fetch(`https://www.freetogame.com/api/game?id=${id}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch game details" });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
