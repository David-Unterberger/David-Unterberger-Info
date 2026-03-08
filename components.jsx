// ===== REACT COMPONENTS =====
// Discord, Steam, GitHub, Itch.io, Weather, NASA, Hacker News

const { useState, useEffect } = React;

// Configuration
const DISCORD_ID = "780384263987920937";
const GITHUB_USER = "David-Unterberger";
const OPENWEATHER_KEY = "7a20d5201e0a2ef6781a2fc4ca4602c5";
const NASA_KEY = "fES0tLsjrdYLZNwmJM1U6lQXilxpHGM63KpJpgb7";

// ===== DISCORD COMPONENT =====
function DiscordComponent() {
  const [data, setData] = useState(null);
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    let interval;
    async function fetchPresence() {
      try {
        const r = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const json = await r.json();
        if (json.success) setData(json.data);
      } catch (e) { console.warn("Discord fetch failed", e); }
    }
    fetchPresence();
    interval = setInterval(fetchPresence, 30000);
    return () => clearInterval(interval);
  }, []);

  const activity = data?.activities?.find(a => a.type === 0);

  useEffect(() => {
    if (!activity?.timestamps?.start) return;
    let interval;
    function updateElapsed() {
      const start = Number(activity.timestamps.start);
      const diff = Date.now() - start;
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      setElapsed(h > 0 ? `${h}h ${m}m` : `${m}m`);
    }
    updateElapsed();
    interval = setInterval(updateElapsed, 60000);
    return () => clearInterval(interval);
  }, [activity]);

  if (!data) return <div className="text-dim">Connecting to Discord API...</div>;

  const user = data.discord_user;
  const status = data.discord_status || "offline";
  const customStatus = data.activities?.find(a => a.type === 4);

  let accountAge = null;
  try {
    const snowflake = BigInt(user.id);
    const timestamp = Number((snowflake >> 22n) + 1420070400000n);
    const created = new Date(timestamp);
    accountAge = Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24));
  } catch (e) { }

  function getActivityImage(act) {
    if (!act?.assets?.large_image) return null;
    const large = act.assets.large_image;
    if (large.startsWith("mp:")) return `https://media.discordapp.net/${large.replace("mp:", "")}`;
    if (act.application_id) return `https://cdn.discordapp.com/app-assets/${act.application_id}/${large}.png`;
    return null;
  }

  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    : "https://cdn.discordapp.com/embed/avatars/0.png";

  return (
    <div>
      <div className="flex flex-align mb-15">
        <img src={avatarUrl} alt="avatar" className="avatar" />
        <div>
          <div className="font-bold text-bright">{user.username}</div>
          <div className="text-dim">Status: {status}</div>
        </div>
      </div>

      <div className="data-row">
        <span className="data-label">USER_ID</span>
        <span className="data-value">{user.id}</span>
      </div>

      {accountAge && (
        <div className="data-row">
          <span className="data-label">ACCOUNT_AGE</span>
          <span className="data-value">{accountAge} days</span>
        </div>
      )}

      {customStatus?.state && (
        <div className="data-row">
          <span className="data-label">CUSTOM_STATUS</span>
          <span className="data-value">{customStatus.emoji?.name || ''} {customStatus.state}</span>
        </div>
      )}

      {activity && (
        <div className="activity-container">
          <div className="text-bright mb-10">[ CURRENT ACTIVITY ]</div>
          <div className="flex gap-10" style={{ alignItems: 'flex-start' }}>
            {getActivityImage(activity) && (
              <img src={getActivityImage(activity)} alt="activity" className="activity-img" />
            )}
            <div style={{ flex: 1 }}>
              <div className="font-bold text-bright">{activity.name}</div>
              {activity.details && <div className="text-dim mt-10">{activity.details}</div>}
              {activity.state && <div className="text-dim">{activity.state}</div>}
              {elapsed && <div className="text-dim mt-10">Elapsed: {elapsed}</div>}
              {activity.party?.size && (
                <div className="text-dim">Party: {activity.party.size[0]} / {activity.party.size[1]}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== STEAM COMPONENT =====
function SteamComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    fetch('/api/steam')
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => setData(d))
      .catch(() => setError(true));
  }, []);

  if (error) return <div className="text-dim">Steam API unavailable</div>;
  if (!data) return <div className="text-dim">Querying Steam database...</div>;

  const profile = data.profile || {};
  const owned = data.owned || { game_count: 0 };
  const recent = (data.recent?.games || []).slice(0, isMobile ? 2 : 3);
  const topPlayed = (data.topPlayed || []).slice(0, isMobile ? 8 : 9);
  const totalHours = data.totalHours || 0;

  return (
    <div>
      <div className="flex flex-align mb-15">
        <img src={profile.avatarfull} alt="steam" className="avatar" />
        <div>
          <div className="font-bold text-bright">{profile.personaname}</div>
          <div className="text-dim">{profile.gameextrainfo || (profile.personastate === 1 ? "Online" : "Offline")}</div>
        </div>
      </div>

      <div className="data-row">
        <span className="data-label">TOTAL_GAMES</span>
        <span className="data-value">{owned.game_count}</span>
      </div>
      <div className="data-row">
        <span className="data-label">TOTAL_HOURS</span>
        <span className="data-value">{totalHours}h</span>
      </div>
      <div className="data-row">
        <span className="data-label">ACCOUNT_CREATED</span>
        <span className="data-value">{new Date(profile.timecreated * 1000).toLocaleDateString()}</span>
      </div>

      {recent.length > 0 && (
        <div className="mt-10">
          <div className="text-bright mb-10">[ RECENTLY PLAYED ]</div>
          <div className="grid-3">
            {recent.map(g => (
              <div key={g.appid} className="game-card">
                <img src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/header.jpg`} alt={g.name} />
                <div className="font-bold text-dim" style={{ fontSize: '12px' }}>{g.name}</div>
                <div className="text-dim" style={{ fontSize: '11px' }}>{Math.round(g.playtime_2weeks / 60)}h last 2 weeks</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {topPlayed.length > 0 && (
        <div className="mt-10">
          <div className="text-bright mb-10">[ TOP PLAYED ]</div>
          <div className="grid-3">
            {topPlayed.map(g => (
              <div key={g.appid} className="game-card">
                <img src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/header.jpg`} alt={g.name} />
                <div className="font-bold text-dim" style={{ fontSize: '12px' }}>{g.name}</div>
                <div className="text-dim" style={{ fontSize: '11px' }}>
                  {Math.round(g.playtime_forever / 60)}h total
                  {g.completion_percent != null && ` • ${g.completion_percent}%`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ===== GITHUB COMPONENT =====
function GithubComponent() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}`)
      .then(r => r.json())
      .then(setProfile)
      .catch(() => {});

    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`)
      .then(r => r.json())
      .then(list => Array.isArray(list) && setRepos(list))
      .catch(() => {});
  }, []);

  if (!profile) return <div className="text-dim">Indexing GitHub repositories...</div>;

  const totals = repos.reduce((acc, r) => {
    acc.stars += r.stargazers_count || 0;
    acc.forks += r.forks_count || 0;
    if (r.language) acc.langs[r.language] = (acc.langs[r.language] || 0) + 1;
    return acc;
  }, { stars: 0, forks: 0, langs: {} });

  const topLang = Object.entries(totals.langs).sort((a, b) => b[1] - a[1])[0]?.[0] || "Unknown";
  const topRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);

  const heatmapData = [];
  for (let day = 0; day < 7; day++) {
    for (let week = 0; week < 40; week++) {
      const level = Math.floor(Math.random() * 5);
      heatmapData.push({ day, week, level });
    }
  }

  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  return (
    <div>
      <div className="flex flex-align mb-15">
        <img src={profile.avatar_url} alt="github" className="avatar" />
        <div>
          <div className="font-bold text-bright">{profile.name || profile.login}</div>
          <div className="text-dim">{profile.followers} followers</div>
        </div>
      </div>

      {profile.bio && (
        <div className="mb-15 text-dim" style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
          {profile.bio}
        </div>
      )}

      <div className="data-row">
        <span className="data-label">PUBLIC_REPOS</span>
        <span className="data-value">{profile.public_repos}</span>
      </div>
      <div className="data-row">
        <span className="data-label">TOTAL_STARS</span>
        <span className="data-value">{totals.stars}</span>
      </div>
      <div className="data-row">
        <span className="data-label">TOTAL_FORKS</span>
        <span className="data-value">{totals.forks}</span>
      </div>
      <div className="data-row">
        <span className="data-label">TOP_LANGUAGE</span>
        <span className="data-value">{topLang}</span>
      </div>

      <div className="mt-10 mb-10">
        <div className="text-bright mb-10">[ CONTRIBUTION ACTIVITY ]</div>
        <div className="heatmap-container">
          <div className="heatmap-labels">
            <span>{oneYearAgo.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            <span>{now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="heatmap-grid">
            {heatmapData.map((item, idx) => (
              <div
                key={idx}
                className={`heatmap-day ${item.level > 0 ? 'level-' + item.level : ''}`}
                style={{ gridRow: item.day + 1, gridColumn: item.week + 1 }}
                title={`${item.level} contributions`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-bright mb-10">[ TOP REPOSITORIES ]</div>
        <div className="grid-2">
          {topRepos.map(r => (
            <a key={r.id} href={r.html_url} target="_blank" className="repo-card" rel="noopener noreferrer">
              <div className="font-bold">{r.name}</div>
              <div className="text-dim" style={{ fontSize: '12px', marginTop: '5px' }}>
                {r.description || 'No description'}
              </div>
              <div className="text-dim" style={{ fontSize: '11px', marginTop: '8px' }}>
                ★ {r.stargazers_count} • {r.language || '—'}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== ITCH.IO COMPONENT =====
function ItchComponent() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/itch')
      .then(r => r.json())
      .then(data => {
        if (data.games) setGames(data.games);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-dim">Loading itch.io games...</div>;

  if (games.length === 0) return <div className="text-dim">No games loaded. Add ITCH_API_KEY to environment variables.</div>;

  return (
    <div>
      <div className="text-bright mb-10">[ ITCH.IO GAMES ]</div>
      <div className="grid-3">
        {games.map((g, i) => (
          <div key={i} className="game-card">
            <a href={g.link} target="_blank" rel="noopener noreferrer">
              <img src={g.image} alt={g.title} />
            </a>
            <div className="font-bold text-dim" style={{ fontSize: '12px' }}>{g.title}</div>
            <div className="text-dim" style={{ fontSize: '11px' }}>👁 {g.views} views</div>
            <div className="text-dim" style={{ fontSize: '11px' }}>⬇ {g.downloads} downloads</div>
            <div className="text-dim" style={{ fontSize: '11px' }}>💰 {g.purchases} purchases</div>
            {g.tags?.length > 0 && <div className="text-dim" style={{ fontSize: '10px' }}>{g.tags.slice(0, 3).join(" • ")}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== WEATHER COMPONENT =====
function WeatherComponent() {
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=47.8095&lon=13.0550&appid=${OPENWEATHER_KEY}&units=metric`)
      .then(r => r.json())
      .then(d => setWeather(d))
      .catch(() => { });

    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!weather) return <div className="text-dim">Establishing weather link...</div>;

  const temp = Math.round(weather.main?.temp || 0);
  const feels = Math.round(weather.main?.feels_like || 0);
  const humidity = weather.main?.humidity || 0;
  const pressure = weather.main?.pressure || 0;
  const windSpeed = Math.round((weather.wind?.speed || 0) * 3.6);
  const windDir = weather.wind?.deg || 0;
  const description = weather.weather?.[0]?.description || 'unknown';
  const icon = weather.weather?.[0]?.icon || '01d';

  const iconMap = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
  };

  const emoji = iconMap[icon] || '🌤️';

  function getWindDirection(deg) {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return dirs[Math.round(deg / 45) % 8];
  }

  return (
    <div className="weather-container">
      <div className="weather-main">
        <div className="weather-icon-large no-glow">{emoji}</div>
        <div className="weather-details" style={{ flex: 1 }}>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>{temp}°C</div>
          <div className="text-dim">{description}</div>
          <div className="text-dim" style={{ fontSize: '12px' }}>Feels like {feels}°C</div>
        </div>
        <div className="clock-display">{time.toLocaleTimeString('en-US', { hour12: false })}</div>
      </div>

      <div className="data-row"><span className="data-label">HUMIDITY</span><span className="data-value">{humidity}%</span></div>
      <div className="data-row"><span className="data-label">PRESSURE</span><span className="data-value">{pressure} hPa</span></div>
      <div className="data-row"><span className="data-label">WIND</span><span className="data-value">{windSpeed} km/h {getWindDirection(windDir)}</span></div>
      <div className="data-row"><span className="data-label">VISIBILITY</span><span className="data-value">{Math.round((weather.visibility || 0) / 1000)} km</span></div>
    </div>
  );
}

// ===== NASA COMPONENT =====
function NASAComponent() {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`)
      .then(r => r.json())
      .then(d => setApod(d))
      .catch(() => {});
  }, []);

  if (!apod) return <div className="text-dim">Loading NASA image...</div>;

  return (
    <div>
      <div className="text-bright mb-10">{apod.title}</div>
      <div className="text-dim mb-10" style={{ fontSize: '11px' }}>{apod.date}</div>
      {apod.media_type === 'image' && (
        <img src={apod.url} alt={apod.title} style={{ width: '100%', border: '1px solid var(--amber-dim)', marginBottom: '10px' }} />
      )}
      {apod.media_type === 'video' && (
        <iframe src={apod.url} style={{ width: '100%', height: '300px', marginBottom: '10px' }} title="NASA Video" frameBorder="0" allowFullScreen />
      )}
      <div className="text-dim" style={{ fontSize: '12px', lineHeight: '1.5' }}>{apod.explanation}</div>
    </div>
  );
}

// ===== HACKER NEWS COMPONENT =====
function HackerNewsComponent() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(r => r.json())
      .then(ids => {
        const top3 = ids.slice(0, 3);
        return Promise.all(top3.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())));
      })
      .then(items => setStories(items))
      .catch(() => {});
  }, []);

  if (stories.length === 0) return <div className="text-dim">Loading top stories...</div>;

  return (
    <div>
      <div className="text-bright mb-10">[ TOP 3 STORIES ]</div>
      {stories.map((story, i) => (
        <div key={story.id} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: i < 2 ? '1px solid var(--amber-dim)' : 'none' }}>
          <div className="font-bold" style={{ fontSize: '13px' }}>
            {i + 1}. <a href={story.url || `https://news.ycombinator.com/item?id=${story.id}`} target="_blank" rel="noopener noreferrer">{story.title}</a>
          </div>
          <div className="text-dim" style={{ fontSize: '11px', marginTop: '4px' }}>
            {story.score} points • {story.by} • {story.descendants || 0} comments
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== LOAD ALL COMPONENTS =====
window.loadReactComponents = function () {
  const mapping = [
    { id: 'discord-mount', comp: <DiscordComponent /> },
    { id: 'steam-mount', comp: <SteamComponent /> },
    { id: 'github-mount', comp: <GithubComponent /> },
    { id: 'itch-mount', comp: <ItchComponent /> },
    { id: 'weather-mount', comp: <WeatherComponent /> },
    { id: 'nasa-mount', comp: <NASAComponent /> },
    { id: 'hackernews-mount', comp: <HackerNewsComponent /> }
  ];

  mapping.forEach(({ id, comp }) => {
    const el = document.getElementById(id);
    if (el) {
      const root = ReactDOM.createRoot(el);
      root.render(comp);
    }
  });
};