export default async function handler(req, res) {
  const steamId = "76561199474685726"

  try {
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}`
    )

    const data = await response.json()

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(200).json(data)

  } catch (error) {
    res.status(500).json({ error: "Steam fetch failed" })
  }
}