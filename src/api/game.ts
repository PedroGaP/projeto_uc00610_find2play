import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).json({ error: "Missing id parameter" });
  }

  const url = `https://www.freetogame.com/api/game?id=${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch game details (${response.status})`,
      });
    }

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
