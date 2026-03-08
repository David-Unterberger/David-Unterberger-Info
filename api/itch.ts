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
      // only public/published games
      .filter(g => g.published === true && g.url)

      // map data for frontend
      .map(g => ({
        title: g.title,
        link: g.url,
        image: g.still_cover_url || g.cover_url,
        views: g.views_count || 0,
        downloads: g.downloads_count || 0,
        purchases: g.purchases_count || 0,
        tags: g.tags || []
      }))

      // sort by views
      .sort((a, b) => b.views - a.views)

      // keep only top 6
      .slice(0, 6);

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