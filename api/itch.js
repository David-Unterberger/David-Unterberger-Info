const chromium = require('chrome-aws-lambda');

module.exports = async (req, res) => {
  let browser = null;

  try {
    // Launch headless Chrome
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    
    // Navigate to itch.io profile
    await page.goto('https://davebbx.itch.io/', {
      waitUntil: 'networkidle0',
      timeout: 10000
    });

    // Wait for games to load
    await page.waitForSelector('.game_cell', { timeout: 5000 });

    // Extract game data
    const games = await page.evaluate(() => {
      const gameElements = Array.from(document.querySelectorAll('.game_cell'));
      
      return gameElements.slice(0, 3).map(game => {
        const title = game.querySelector('.game_title, .title')?.textContent?.trim();
        const image = game.querySelector('.game_thumb img, img')?.src;
        const link = game.querySelector('a')?.href;
        const views = game.querySelector('.view_count, .views_count')?.textContent?.trim() || 'N/A';
        const downloads = game.querySelector('.download_count, .downloads_count')?.textContent?.trim() || 'N/A';
        
        return { 
          title, 
          image, 
          link, 
          views,
          downloads
        };
      }).filter(g => g.title && g.image);
    });

    await browser.close();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');

    res.status(200).json({ 
      success: true, 
      games,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    if (browser) await browser.close();
    
    console.error('Itch.io scraping error:', error);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    res.status(500).json({ 
      success: false, 
      error: error.message,
      games: [],
      fallback: true
    });
  }
};