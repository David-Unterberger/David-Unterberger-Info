export default async function handler(req, res) {
  const key = process.env.ITCH_API_KEY;

  try {
    const response = await fetch(`https://itch.io/api/1/${key}/my-games`);
    const data = await response.json();

    if (!data.games) {
      return res.status(500).json({
        success: false,
        games: []
      });
    }

    const games = data.games
      // only include public/published projects
      .filter(g => g.published === true)
      .map(g => ({
        title: g.title,
        link: g.url,
        image: g.cover_url || g.still_cover_url,
        views: g.views_count || 0,
        downloads: g.downloads_count || 0,
        purchases: g.purchases_count || 0,
        tags: g.tags || []
      }));

    games.sort((a, b) => b.views - a.views);

    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate"
    );

    res.status(200).json({
      success: true,
      games
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      games: []
    });
  }
}