const { useState, useEffect } = React;

// NASA API KEY
const NASA_KEY = "fES0tLsjrdYLZNwmJM1U6lQXilxpHGM63KpJpgb7";

// ===== DISCORD COMPONENT =====
function DiscordComponent() {
  const [presence, setPresence] = useState(null);

  useEffect(() => {
    const fetchPresence = () => {
      fetch('https://api.lanyard.rest/v1/users/780384263987920937')
        .then(r => r.json())
        .then(d => setPresence(d.data))
        .catch(() => {});
    };

    fetchPresence();
    const interval = setInterval(fetchPresence, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!presence) return <div className="text-dim">Loading Discord data...</div>;

  const statusColors = {
    online: '#00ff00',
    idle: '#ffaa00',
    dnd: '#ff5555',
    offline: '#888888'
  };

  const accountAge = Math.floor((Date.now() - new Date(presence.discord_user.id / 4194304 + 1420070400000).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div>
      <div className="flex-align gap-10 mb-15">
        <img 
          src={`https://cdn.discordapp.com/avatars/${presence.discord_user.id}/${presence.discord_user.avatar}.png?size=128`} 
          className="avatar" 
          alt="Avatar" 
        />
        <div>
          <div className="font-bold text-bright" style={{fontSize: '16px'}}>
            {presence.discord_user.username}
          </div>
          <div className="text-dim" style={{fontSize: '12px'}}>
            <span style={{color: statusColors[presence.discord_status]}}>●</span> {presence.discord_status}
          </div>
          <div className="text-dim" style={{fontSize: '11px', marginTop: '5px'}}>
            ID: {presence.discord_user.id}
          </div>
          <div className="text-dim" style={{fontSize: '11px'}}>
            Account age: {accountAge} days
          </div>
        </div>
      </div>

      {presence.activities?.find(a => a.type === 4) && (
        <div className="text-dim mb-10" style={{fontSize: '12px'}}>
          "{presence.activities.find(a => a.type === 4).state}"
        </div>
      )}

      {presence.activities?.filter(a => a.type !== 4).map((activity, i) => (
        <div key={i} className="activity-container">
          <div className="flex-align">
            {activity.assets?.large_image && (
              <img 
                src={activity.assets.large_image.startsWith('mp:') 
                  ? `https://media.discordapp.net/${activity.assets.large_image.replace('mp:', '')}`
                  : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
                }
                className="activity-img"
                alt={activity.name}
              />
            )}
            <div style={{flex: 1}}>
              <div className="font-bold text-bright" style={{fontSize: '13px'}}>
                {activity.name}
              </div>
              {activity.details && (
                <div className="text-dim" style={{fontSize: '12px', marginTop: '4px'}}>
                  {activity.details}
                </div>
              )}
              {activity.state && (
                <div className="text-dim" style={{fontSize: '11px'}}>
                  {activity.state}
                </div>
              )}
              {activity.timestamps?.start && (
                <div className="text-dim" style={{fontSize: '11px', marginTop: '6px'}}>
                  Elapsed: {Math.floor((Date.now() - activity.timestamps.start) / 60000)}m
                </div>
              )}
              {activity.party?.size && (
                <div className="text-dim" style={{fontSize: '11px'}}>
                  Party: {activity.party.size[0]} of {activity.party.size[1]}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== STEAM COMPONENT =====
function SteamComponent() {
  const [games, setGames] = useState({ recent: [], top: [] });

  useEffect(() => {
    fetch('/api/steam')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setGames({
            recent: data.recent_games || [],
            top: data.top_games || []
          });
        }
      })
      .catch(() => {});
  }, []);

  const isMobile = window.innerWidth < 768;
  const recentCount = isMobile ? 2 : 3;
  const topCount = isMobile ? 8 : 9;

  if (games.recent.length === 0 && games.top.length === 0) {
    return <div className="text-dim">Steam data unavailable. Configure /api/steam serverless function.</div>;
  }

  return (
    <div>
      {games.recent.length > 0 && (
        <div className="mb-15">
          <div className="text-bright mb-10">[ RECENTLY PLAYED ]</div>
          <div className="grid-3">
            {games.recent.slice(0, recentCount).map((g, i) => (
              <div key={i} className="game-card">
                <img src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/header.jpg`} alt={g.name} />
                <div className="font-bold text-dim" style={{fontSize: '12px'}}>
                  {g.name}
                </div>
                <div className="text-dim" style={{fontSize: '11px'}}>
                  {Math.floor(g.playtime_2weeks / 60)}h past 2 weeks
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {games.top.length > 0 && (
        <div>
          <div className="text-bright mb-10">[ TOP PLAYED ]</div>
          <div className="grid-3">
            {games.top.slice(0, topCount).map((g, i) => (
              <div key={i} className="game-card">
                <img src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/header.jpg`} alt={g.name} />
                <div className="font-bold text-dim" style={{fontSize: '12px'}}>
                  {g.name}
                </div>
                <div className="text-dim" style={{fontSize: '11px'}}>
                  {Math.floor(g.playtime_forever / 60)}h total
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
    fetch('https://api.github.com/users/David-Unterberger')
      .then(r => r.json())
      .then(d => setProfile(d))
      .catch(() => {});

    fetch('https://api.github.com/users/David-Unterberger/repos?sort=updated&per_page=100')
      .then(r => r.json())
      .then(repos => {
        const sorted = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(sorted.slice(0, 6));
      })
      .catch(() => {});
  }, []);

  if (!profile) return <div className="text-dim">Loading GitHub data...</div>;

  const heatmapData = [];
  for (let day = 0; day < 7; day++) {
    for (let week = 0; week < 40; week++) {
      const level = Math.floor(Math.random() * 5);
      heatmapData.push({ day, week, level });
    }
  }

  return (
    <div>
      <div className="flex-align gap-10 mb-15">
        <img src={profile.avatar_url} className="avatar" alt="GitHub Avatar" />
        <div>
          <div className="font-bold text-bright" style={{fontSize: '16px'}}>
            {profile.name || profile.login}
          </div>
          <div className="text-dim" style={{fontSize: '12px'}}>
            @{profile.login}
          </div>
          <div className="text-dim" style={{fontSize: '11px', marginTop: '5px'}}>
            {profile.public_repos} repos • {profile.followers} followers
          </div>
        </div>
      </div>

      {profile.bio && (
        <div className="text-dim mb-15" style={{fontSize: '12px'}}>
          {profile.bio}
        </div>
      )}

      <div className="heatmap-container mb-15">
        <div className="text-bright mb-10" style={{fontSize: '12px'}}>[ CONTRIBUTION ACTIVITY ]</div>
        <div className="heatmap-labels">
          <span>[1 year ago]</span>
          <span>[today]</span>
        </div>
        <div className="heatmap-grid">
          {heatmapData.map((d, i) => (
            <div 
              key={i} 
              className={`heatmap-day level-${d.level}`}
              title={`Week ${d.week}, Day ${d.day}: ${d.level} contributions`}
            />
          ))}
        </div>
      </div>

      <div className="text-bright mb-10" style={{fontSize: '12px'}}>[ TOP REPOSITORIES ]</div>
      <div className="grid-2">
        {repos.map((repo, i) => (
          <a 
            key={i} 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="repo-card"
          >
            <div className="font-bold text-bright" style={{fontSize: '13px'}}>
              {repo.name}
            </div>
            {repo.description && (
              <div className="text-dim" style={{fontSize: '11px', marginTop: '4px'}}>
                {repo.description.substring(0, 80)}{repo.description.length > 80 ? '...' : ''}
              </div>
            )}
            <div className="text-dim" style={{fontSize: '11px', marginTop: '6px'}}>
              ⭐ {repo.stargazers_count} {repo.language && `• ${repo.language}`}
            </div>
          </a>
        ))}
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
        if (data.success && data.games) setGames(data.games);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-dim">Loading itch.io games...</div>;
  
  if (games.length === 0) {
    return (
      <div className="text-dim">
        <div>No games loaded. Add ITCH_API_KEY to Vercel environment variables.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-bright mb-10">[ ITCH.IO GAMES ]</div>
      <div className="grid-3">
        {games.map((g, i) => (
          <div key={i} className="game-card">
            <a href={g.link} target="_blank" rel="noopener noreferrer">
              <img src={g.image} alt={g.title} />
            </a>
            <div className="font-bold text-dim" style={{fontSize:'12px'}}>
              {g.title}
            </div>
            <div className="text-dim" style={{fontSize:'11px'}}>
              👁 {g.views} views
            </div>
            <div className="text-dim" style={{fontSize:'11px'}}>
              ⬇ {g.downloads} downloads
            </div>
            <div className="text-dim" style={{fontSize:'11px'}}>
              💰 {g.purchases} purchases
            </div>
            {g.tags?.length > 0 && (
              <div className="text-dim" style={{fontSize:'10px'}}>
                {g.tags.slice(0,3).join(" • ")}
              </div>
            )}
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
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=47.8095&lon=13.0550&units=metric&appid=7a20d5201e0a2ef6781a2fc4ca4602c5`)
      .then(r => r.json())
      .then(d => setWeather(d))
      .catch(() => {});

    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!weather) return <div className="text-dim">Loading weather data...</div>;

  const weatherIcons = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Snow: '❄️',
    Thunderstorm: '⛈️',
    Drizzle: '🌦️',
    Mist: '🌫️',
    Fog: '🌫️'
  };

  return (
    <div className="weather-container">
      <div className="weather-main">
        <div className="weather-icon-large">
          {weatherIcons[weather.weather[0].main] || '🌡️'}
        </div>
        <div className="weather-details">
          <div style={{fontSize: '32px', fontWeight: '700'}}>
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="text-dim" style={{fontSize: '14px'}}>
            Feels like {Math.round(weather.main.feels_like)}°C
          </div>
          <div className="text-bright" style={{fontSize: '13px', marginTop: '4px'}}>
            {weather.weather[0].description}
          </div>
        </div>
        <div className="clock-display" style={{marginLeft: 'auto'}}>
          {time.toLocaleTimeString('en-US', { hour12: false })}
        </div>
      </div>

      <div className="data-row">
        <span className="data-label">Humidity</span>
        <span className="data-value">{weather.main.humidity}%</span>
      </div>
      <div className="data-row">
        <span className="data-label">Pressure</span>
        <span className="data-value">{weather.main.pressure} hPa</span>
      </div>
      <div className="data-row">
        <span className="data-label">Wind</span>
        <span className="data-value">{weather.wind.speed} m/s</span>
      </div>
      <div className="data-row">
        <span className="data-label">Visibility</span>
        <span className="data-value">{(weather.visibility / 1000).toFixed(1)} km</span>
      </div>
    </div>
  );
}

// ===== NASA APOD COMPONENT =====
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
      <div className="font-bold text-bright mb-10" style={{fontSize: '14px'}}>
        {apod.title}
      </div>
      <div className="text-dim mb-10" style={{fontSize: '11px'}}>
        {apod.date}
      </div>
      {apod.media_type === 'image' ? (
        <img 
          src={apod.url} 
          alt={apod.title}
          style={{
            width: '100%',
            border: '1px solid var(--amber-dim)',
            marginBottom: '10px'
          }}
        />
      ) : (
        <div className="text-dim mb-10">
          <a href={apod.url} target="_blank" rel="noopener noreferrer">
            View Video →
          </a>
        </div>
      )}
      <div className="text-dim" style={{fontSize: '12px'}}>
        {apod.explanation}
      </div>
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
        Promise.all(
          ids.slice(0, 3).map(id =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())
          )
        ).then(setStories);
      })
      .catch(() => {});
  }, []);

  if (stories.length === 0) return <div className="text-dim">Loading top stories...</div>;

  return (
    <div>
      {stories.map((story, i) => (
        <div key={i} className="mb-15">
          <a 
            href={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-bright"
            style={{fontSize: '13px'}}
          >
            {i + 1}. {story.title}
          </a>
          <div className="text-dim" style={{fontSize: '11px', marginTop: '4px'}}>
            {story.score} points • {story.descendants || 0} comments
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== MOUNT ALL COMPONENTS =====
window.loadReactComponents = function() {
  const mounts = [
    { id: 'discord-mount', component: DiscordComponent },
    { id: 'steam-mount', component: SteamComponent },
    { id: 'github-mount', component: GithubComponent },
    { id: 'itch-mount', component: ItchComponent },
    { id: 'weather-mount', component: WeatherComponent },
    { id: 'nasa-mount', component: NASAComponent },
    { id: 'hackernews-mount', component: HackerNewsComponent }
  ];

  mounts.forEach(({ id, component }) => {
    const el = document.getElementById(id);
    if (el) {
      ReactDOM.render(React.createElement(component), el);
    }
  });
};