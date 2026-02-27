export default async function handler(req: any, res: any) {
  const steamId = "76561199474685726"
  const apiKey = process.env.STEAM_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: "Steam API key missing" })
  }

  try {
    const [ownedRes, recentRes, profileRes] = await Promise.all([
      fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true`),
      fetch(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${apiKey}&steamid=${steamId}`),
      fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`)
    ])

    const owned = await ownedRes.json()
    const recent = await recentRes.json()
    const profile = await profileRes.json()

    res.status(200).json({
      owned: owned.response,
      recent: recent.response,
      profile: profile.response.players[0]
    })

  } catch (err) {
    res.status(500).json({ error: "Steam fetch failed" })
  }
}