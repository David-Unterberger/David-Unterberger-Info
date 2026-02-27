// api/steam.ts
export default async function handler(req: any, res: any) {
  const steamId = "76561199474685726";
  const apiKey = process.env.STEAM_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Steam API key missing" });
  }

  try {
    // fetch owned, recent, profile in parallel
    const [ownedRes, recentRes, profileRes] = await Promise.all([
      fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true`),
      fetch(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${apiKey}&steamid=${steamId}`),
      fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`)
    ]);

    const owned = await ownedRes.json();
    const recent = await recentRes.json();
    const profile = await profileRes.json();

    const ownedGames = owned.response?.games || [];
    // compute total hours (minutes -> hours)
    const totalMinutes = ownedGames.reduce((sum: number, g: any) => sum + (g.playtime_forever || 0), 0);
    const totalHours = Math.round((totalMinutes / 60) * 10) / 10; // single decimal

    // prepare top played (by total minutes)
    const topPlayed = [...ownedGames]
      .sort((a: any, b: any) => (b.playtime_forever || 0) - (a.playtime_forever || 0))
      .slice(0, 9);

    // For topPlayed, try to fetch achievements and schema to compute completion %
    async function enrichGame(game: any) {
      const appid = game.appid;
      let completion = null;
      try {
        // player's achievements
        const playerAchRes = await fetch(`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${apiKey}&steamid=${steamId}&appid=${appid}`);
        const playerAch = await playerAchRes.json();
        // game schema
        const schemaRes = await fetch(`https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${appid}`);
        const schema = await schemaRes.json();

        const playerList = playerAch.playerstats?.achievements || [];
        const totalAchievements = schema.game?.availableGameStats?.achievements?.length || 0;
        if (totalAchievements > 0) {
          const earned = playerList.filter((a: any) => a.achieved === 1).length;
          completion = Math.round((earned / totalAchievements) * 100);
        }
      } catch (e) {
        // ignore per-game failures
        completion = null;
      }
      return {
        ...game,
        completion_percent: completion, // may be null if not available
      };
    }

    // Enrich topPlayed with completion percent (parallel, but limited)
    const enrichedTop = await Promise.all(topPlayed.map(g => enrichGame(g)));

    // profile: lastlogoff (seconds), timecreated (seconds) -> convert to ms in frontend
    const player = profile.response?.players?.[0] || {};

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({
      owned: owned.response || { game_count: 0, games: [] },
      recent: recent.response || { total_count: 0, games: [] },
      profile: player,
      totalHours,
      topPlayed: enrichedTop,
    });
  } catch (err) {
    console.error("steam handler error:", err);
    res.status(500).json({ error: "Steam fetch failed" });
  }
}