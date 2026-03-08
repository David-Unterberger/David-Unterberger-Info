// ===== DAVID UNTERBERGER TERMINAL - COMPLETE AND FIXED =====

// ===== URL REDIRECT =====
if (window.location.hostname !== 'david-unterberger-info.vercel.app' && 
    window.location.hostname !== 'localhost' && 
    window.location.hostname !== '127.0.0.1') {
  window.location.href = 'https://david-unterberger-info.vercel.app';
}

// ===== CONFIGURATION =====
const savedTheme = localStorage.getItem('terminal-theme') || 'amber';
if (savedTheme !== 'amber') {
  if (savedTheme.startsWith('#')) {
    applyCustomTheme(savedTheme);
  } else {
    document.body.className = 'theme-' + savedTheme;
  }
}

const visitorData = {
  totalVisits: parseInt(localStorage.getItem('total-visits') || '0') + 1,
  firstVisit: localStorage.getItem('first-visit') || new Date().toISOString(),
  lastVisit: new Date().toISOString(),
  sessionStart: Date.now()
};
localStorage.setItem('total-visits', visitorData.totalVisits);
localStorage.setItem('first-visit', visitorData.firstVisit);
localStorage.setItem('last-visit', visitorData.lastVisit);

const dreamJournal = JSON.parse(localStorage.getItem('dream-journal') || '[]');

// ===== DATA =====
const asciiAnimals = {
  cat: `  /\\_/\\  
 ( o.o ) 
  > ^ <`,
  dog: `  __
 /  \\
/ .. \\
\\____/
 |  |`,
  bunny: `(\\__/)
(='.'=)
(")_(")`,
  fish: `  ><>
><((('>
  ><>`,
  skull: `   _____
  /     \\
 | () () |
 |   >   |
 |  ---  |
  \\_____/`
};

const fortunes = [
  "You will write bug-free code today... just kidding.",
  "A wild segmentation fault appears!",
  "Your code compiles on the first try. This is a dream.",
  "Stack Overflow will have the answer you seek.",
  "Beware of off-by-one errors... or is it two?",
  "The bug is not in your code. Check again anyway.",
  "Your pull request will be approved... eventually.",
  "Coffee is the answer. What was the question?",
  "Merge conflicts await in your future.",
  "You will discover a semicolon in an unexpected place."
];

const riddles = [
  { q: "I'm a loop that never ends, unless you break or return. What am I?", a: "while(true)" },
  { q: "I have keys but no locks, space but no room. What am I?", a: "keyboard" },
  { q: "The more you take away, the larger I become. What am I?", a: "a hole (or memory leak)" },
  { q: "I'm full of bugs but programmers love me. What am I?", a: "code" }
];

const facts = [
  "The first computer bug was an actual moth found in a computer in 1947.",
  "The first 1GB hard drive weighed over 500 pounds and cost $40,000.",
  "The average programmer writes about 10-12 lines of code per day.",
  "There are more possible chess positions than atoms in the observable universe.",
  "The first computer virus was created in 1983 and was called 'Elk Cloner'.",
  "Python is named after Monty Python, not the snake.",
  "The first website is still online: info.cern.ch"
];

const challenges = [
  "Write FizzBuzz in your favorite language",
  "Reverse a string without using built-in functions",
  "Implement a binary search algorithm",
  "Create a function to detect palindromes",
  "Build a simple calculator using only bitwise operations",
  "Write a function to find the nth Fibonacci number"
];

const quizzes = [
  {
    q: "What does HTTP stand for?",
    a: "HyperText Transfer Protocol",
    options: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "Hyper Transfer Terminal Protocol"]
  },
  {
    q: "Which language is known as the 'mother of all languages'?",
    a: "C",
    options: ["Python", "C", "Assembly", "FORTRAN"]
  },
  {
    q: "What year was JavaScript created?",
    a: "1995",
    options: ["1995", "1991", "2000", "1989"]
  }
];

const aliases = {
  'ls': 'help',
  'cd': 'status',
  'pwd': 'visitor',
  'cat': 'dreams'
};

// ===== UTILITY FUNCTIONS =====
function playSound(id) {
  const audio = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    audio.volume = 0.1;
    audio.play().catch(() => {});
  }
}

function applyCustomTheme(color) {
  document.documentElement.style.setProperty('--amber', color);
  const r = parseInt(color.slice(1,3), 16);
  const g = parseInt(color.slice(3,5), 16);
  const b = parseInt(color.slice(5,7), 16);
  const soft = `#${Math.min(255, r+40).toString(16).padStart(2,'0')}${Math.min(255, g+40).toString(16).padStart(2,'0')}${Math.min(255, b+40).toString(16).padStart(2,'0')}`;
  const dim = `#${Math.max(0, r-40).toString(16).padStart(2,'0')}${Math.max(0, g-40).toString(16).padStart(2,'0')}${Math.max(0, b-40).toString(16).padStart(2,'0')}`;
  document.documentElement.style.setProperty('--amber-soft', soft);
  document.documentElement.style.setProperty('--amber-dim', dim);
  localStorage.setItem('terminal-theme', color);
}

function triggerGlitch() {
  const overlay = document.createElement('div');
  overlay.className = 'glitch-overlay';
  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 100);
}

function getGreeting() {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  const month = new Date().getMonth();
  const isWeekend = day === 0 || day === 6;
  const isFirstVisit = visitorData.totalVisits === 1;
  
  const greetings = [];
  
  if (hour >= 5 && hour < 8) greetings.push('Early bird catches the code. Good morning, operator.');
  else if (hour >= 8 && hour < 10) greetings.push('Morning coffee and terminal access. Perfect start.');
  else if (hour >= 10 && hour < 12) greetings.push('Mid-morning productivity detected. Systems ready.');
  else if (hour >= 12 && hour < 14) greetings.push('Lunch break coding session? Dedication appreciated.');
  else if (hour >= 14 && hour < 17) greetings.push('Afternoon operations commence. All systems nominal.');
  else if (hour >= 17 && hour < 20) greetings.push('Evening terminal access granted. Welcome back.');
  else if (hour >= 20 && hour < 23) greetings.push('Night owl detected. The best code happens after dark.');
  else if (hour >= 23 || hour < 2) greetings.push('Midnight coding session initiated. True dedication.');
  else if (hour >= 2 && hour < 5) greetings.push('3 AM thoughts require terminal access. Understood.');
  
  if (isWeekend && hour >= 10 && hour < 14) greetings.push('Weekend project time? This is the way.');
  if (isWeekend && hour >= 20) greetings.push('Saturday night terminal session. Respect.');
  if (month === 11 || month === 0) greetings.push('Winter coding season. Hot beverage recommended.');
  if (month >= 5 && month <= 7) greetings.push('Summer development continues. Stay hydrated, operator.');
  
  if (isFirstVisit) greetings.push('First contact established. Welcome to the system.');
  if (visitorData.totalVisits === 5) greetings.push('Fifth visit logged. You seem interested in this terminal.');
  if (visitorData.totalVisits === 10) greetings.push('Visit #10. Regular access pattern detected.');
  if (visitorData.totalVisits === 25) greetings.push('Twenty-five visits. You are now a frequent operator.');
  if (visitorData.totalVisits === 50) greetings.push('Half-century achievement. Welcome back, regular.');
  if (visitorData.totalVisits === 100) greetings.push('Visit #100. Legendary status achieved.');
  if (visitorData.totalVisits > 100 && visitorData.totalVisits % 50 === 0) {
    greetings.push(`Visit #${visitorData.totalVisits}. Exceptional dedication to the terminal.`);
  }
  
  if (!isWeekend && hour >= 9 && hour < 17) greetings.push('Business hours terminal access. Productivity mode engaged.');
  
  return greetings[Math.floor(Math.random() * greetings.length)] || 'Terminal access granted. Proceed.';
}

function typewriterLine(element, text, callback) {
  let i = 0;
  const speed = 15;
  element.textContent = '> ';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      playSound('key-click');
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

// ===== BOOT SEQUENCE =====
const bootMessages = [
  'INITIALIZING SECURE TERMINAL...',
  'AUTHENTICATING USER CREDENTIALS...',
  'ACCESS LEVEL: SWORDFISH-7',
  'LOADING OPERATOR PROFILE...',
  'CONNECTING TO DISCORD PRESENCE API...',
  'QUERYING STEAM DATABASE...',
  'INDEXING GITHUB REPOSITORIES...',
  'LOADING ITCH.IO GAMES...',
  'FETCHING NASA DATA...',
  'SYNCING HACKER NEWS...',
  'ESTABLISHING WEATHER LINK...',
  'DECRYPTION COMPLETE',
  'ACCESS GRANTED'
];

function bootSequence() {
  playSound('boot-beep');
  
  const bootDiv = document.getElementById('boot-sequence');
  const mainContent = document.getElementById('main-content');
  
  let lineIndex = 0;
  
  function nextLine() {
    if (lineIndex >= bootMessages.length) {
      setTimeout(() => {
        const greetingBox = document.createElement('div');
        greetingBox.className = 'boot-greeting';
        greetingBox.textContent = '◆ ' + getGreeting();
        bootDiv.appendChild(greetingBox);
        
        setTimeout(() => {
          const continueMsg = document.createElement('div');
          continueMsg.className = 'boot-continue';
          continueMsg.textContent = '> Press any key to continue...';
          bootDiv.appendChild(continueMsg);
          
          function handleContinue(e) {
            e.preventDefault();
            document.removeEventListener('keydown', handleContinue);
            document.removeEventListener('touchstart', handleContinue);
            document.removeEventListener('click', handleContinue);
            bootDiv.style.display = 'none';
            mainContent.style.display = 'block';
            revealTerminalContent();
          }
          
          document.addEventListener('keydown', handleContinue);
          document.addEventListener('touchstart', handleContinue);
          document.addEventListener('click', handleContinue);
        }, 500);
      }, 200);
      return;
    }
    
    const line = document.createElement('div');
    line.className = 'boot-line';
    bootDiv.appendChild(line);
    
    typewriterLine(line, bootMessages[lineIndex], () => {
      lineIndex++;
      setTimeout(nextLine, 10);
    });
  }
  
  nextLine();
}

// ===== CONTENT REVEAL =====
function revealTerminalContent() {
  const content = `
    <div class="section-header">╔═══════════════════════════════════════[ OPERATOR PROFILE ]════════════════════════════════════════╗</div>
    <div class="component-box">
      <div class="term-line">ROLE: Hobby Game Developer</div>
      <div class="term-line">ACTIVE_SINCE: 2020</div>
      <div class="term-line">FOCUS: Procedural Terrain, Simulation Systems, Shader Experimentation</div>
    </div>
    <div class="section-footer">╚════════════════════════════════════════════════════════════════════════════════════════════════════╝</div>
    
    <div class="section-header">╔════════════════════════════════════════[ CURRENT PROJECT ]════════════════════════════════════════╗</div>
    <div class="component-box">
      <div class="font-bold text-bright mb-10">Procedural Terrain & Shader Engine Experiments</div>
      <div class="text-dim mb-10">Building modular terrain systems using layered noise stacks, runtime mesh deformation and custom shader pipelines.</div>
      <div class="text-dim mb-10">TAGS: C# • Shaders • Procedural Gen • Simulation</div>
      <div>
        <a href="https://github.com/David-Unterberger" target="_blank">[ github ]</a>
        <a href="https://davebbx.itch.io" target="_blank">[ itch.io ]</a>
      </div>
    </div>
    <div class="section-footer">╚════════════════════════════════════════════════════════════════════════════════════════════════════╝</div>

    <div class="section-header">╔══════════════════════════════════════[ DISCORD PRESENCE ]══════════════════════════════════════════╗</div>
    <div id="discord-mount" class="component-box">Loading Discord data...</div>
    <div class="section-footer">╚════════════════════════════════════════════════════════════════════════════════════════════════════╝</div>

    <div class="section-header">╔════════════════════════════════════════[ STEAM RECORDS ]═══════════════════════════════════════════╗</div>
    <div id="steam-mount" class="component-box">Loading Steam data...</div>
    <div class="section-footer">╚════════════════════════════════════════════════════════════════════════════════════════════════════╝</div>

    <div class="section-header">╔═══════════════════════════════════════════[ GITHUB ]═══════════════════════════════════════════════╗</div>
    <div id="github-mount" class="component-box">Loading GitHub data...</div>
    <div class="section-footer">╚════════════════════════════════════════════════════════════════════════════════════════════════════╝</div>

    <div class="section-header">╔═══════════════════════════════════════════[ ITCH.IO ]══════════════════════════════════════════════╗</div>
    <div id="itch-mount" class="component-box">Loading itch.io data...</div>
    <div class="section-footer">╚════════════════════════════════════════════════════════════════════════════════════════════════════╝</div>

    <div class="section-header">╔════════════════════════════════════[ SALZBURG WEATHER ]════════════════════════════════════════════╗</div>
    <div id="weather-mount" class="component-box">Loading weather data...</div>
    <div class="section-footer">╚════════════════════════════════════════════════════════════════════════════════════════════════════╝</div>

    <div class="section-header">╔════════════════════════════════════════[ NASA APOD ]═══════════════════════════════════════════════╗</div>
    <div id="nasa-mount" class="component-box">Loading NASA image...</div>
    <div class="section-footer">╚════════════════════════════════════════════════════════════════════════════════════════════════════╝</div>

    <div class="section-header">╔═══════════════════════════════════════[ HACKER NEWS ]══════════════════════════════════════════════╗</div>
    <div id="hackernews-mount" class="component-box">Loading top stories...</div>
    <div class="section-footer">╚════════════════════════════════════════════════════════════════════════════════════════════════════╝</div>

    <div class="cli-container">
      <div class="section-header">╔══════════════════════════════════════[ COMMAND LINE ]══════════════════════════════════════════════╗</div>
      <div id="cli-history"></div>
      <div class="cli-input-line">
        <span class="cli-prompt">root@david-unterberger:~$</span>
        <div class="cli-input-wrapper">
          <input type="text" class="cli-input" id="cli-input" autocomplete="off" placeholder="..." />
          <span class="cli-cursor"></span>
        </div>
      </div>
      <div class="section-footer">╚════════════════════════════════════════════════════════════════════════════════════════════════════╝</div>
    </div>
  `;

  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = content;
  
  window.loadReactComponents();
  initCLI();
  setupGlobalTyping();
  
  const input = document.getElementById('cli-input');
  if (input) input.focus();
}

// ===== GLOBAL TYPING =====
function setupGlobalTyping() {
  document.addEventListener('keydown', (e) => {
    const input = document.getElementById('cli-input');
    if (!input) return;
    
    if (document.activeElement === input) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Tab' || e.key === 'Escape') return;
    
    // Ctrl+Shift+6 Easter Egg
    if (e.ctrlKey && e.shiftKey && e.key === '^') {
      e.preventDefault();
      const output = document.createElement('div');
      output.className = 'cli-output';
      output.textContent = "You're not in Cisco Packet Tracer!";
      document.getElementById('cli-history').appendChild(output);
      scrollToInput();
      return;
    }
    
    input.focus();
  });
}

// ===== CLI SYSTEM =====
function initCLI() {
  const input = document.getElementById('cli-input');
  const cursor = document.querySelector('.cli-cursor');
  const wrapper = document.querySelector('.cli-input-wrapper');
  const prompt = document.querySelector('.cli-prompt');
  const history = document.getElementById('cli-history');
  let commandHistory = JSON.parse(localStorage.getItem('cli-history') || '[]');
  let historyIndex = commandHistory.length;
  let currentRiddle = null;
  let currentQuiz = null;

  input.focus();

  input.addEventListener('input', () => {
    if (input.value.length > 0) {
      wrapper.classList.add('typing');
    } else {
      wrapper.classList.remove('typing');
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      if (cmd) {
        executeCommand(cmd);
        commandHistory.push(cmd);
        localStorage.setItem('cli-history', JSON.stringify(commandHistory.slice(-50)));
        historyIndex = commandHistory.length;
      }
      input.value = '';
      wrapper.classList.remove('typing');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
        wrapper.classList.add('typing');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
        wrapper.classList.add('typing');
      } else {
        historyIndex = commandHistory.length;
        input.value = '';
        wrapper.classList.remove('typing');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion(input);
    }
  });

  function handleTabCompletion(input) {
    const value = input.value;
    const allCommands = [
      'help', 'clear', 'status', 'visitor', 'theme', 'restart', 'history',
      'time', 'uptime', 'joke', 'quote', 'dream', 'dreams', 'cowsay',
      'animals', 'fish', 'skull', 'hidden', 'memory', 'network', 'fortune',
      'quiz', 'riddle', 'fact', 'challenge', 'glitch', 'ls', 'cd', 'pwd', 'cat'
    ];
    
    const matches = allCommands.filter(cmd => cmd.startsWith(value));
    
    if (matches.length === 1) {
      input.value = matches[0] + ' ';
      wrapper.classList.add('typing');
    } else if (matches.length > 1) {
      const output = document.createElement('div');
      output.className = 'cli-output tab-complete';
      output.textContent = matches.join('  ');
      
      const existingComplete = document.querySelector('.tab-complete');
      if (existingComplete) existingComplete.remove();
      
      document.querySelector('.cli-input-line').appendChild(output);
      setTimeout(() => output.remove(), 2000);
    }
  }

  function executeCommand(cmd) {
    const output = document.createElement('div');
    output.className = 'cli-output';
    
    const echo = document.createElement('div');
    echo.textContent = '> ' + cmd;
    echo.style.color = 'var(--amber-soft)';
    history.appendChild(echo);

    const parts = cmd.split(' ');
    let command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    // Check aliases
    if (aliases[command]) {
      command = aliases[command];
    }

    // Answer checking
    if (currentRiddle) {
      if (cmd.toLowerCase().includes(currentRiddle.a.toLowerCase())) {
        output.className = 'cli-output cli-success';
        output.textContent = 'Correct! Well done.';
      } else {
        output.className = 'cli-output cli-error';
        output.textContent = `Not quite. The answer was: ${currentRiddle.a}`;
      }
      currentRiddle = null;
      prompt.textContent = 'root@david-unterberger:~$';
      prompt.classList.remove('simple');
      history.appendChild(output);
      scrollToInput();
      return;
    }

    if (currentQuiz) {
      if (cmd === currentQuiz.a) {
        output.className = 'cli-output cli-success';
        output.textContent = 'Correct! 🎉';
      } else {
        output.className = 'cli-output cli-error';
        output.textContent = `Wrong. The answer was: ${currentQuiz.a}`;
      }
      currentQuiz = null;
      prompt.textContent = 'root@david-unterberger:~$';
      prompt.classList.remove('simple');
      history.appendChild(output);
      scrollToInput();
      return;
    }

    // Hidden commands
    if (command === 'carlos') {
      output.className = 'cli-output cli-success';
      output.textContent = 'User carlos deleted!';
    } else if (command === 'admin') {
      output.className = 'cli-output cli-error';
      output.textContent = 'ACCESS DENIED!';
    } else if (cmd.toLowerCase() === 'markus kargl') {
      output.textContent = 'IT and Electrics-expert currently not available.';
    } else if (cmd.toLowerCase() === 'ben bliem') {
      output.textContent = 'Opening Ben Bliem\'s website...';
      setTimeout(() => window.open('https://benedecushtl.github.io/Ben-Bliem-Website/', '_blank'), 500);
    } else if (cmd.toLowerCase() === 'siemens lufthaken') {
      output.textContent = 'Siemens Lufthaken out of stock. Try again next year.';
    } else if (command === '42') {
      output.textContent = 'The Answer to the Ultimate Question of Life, the Universe, and Everything.';
    } else if (cmd === 'rm -rf /' || cmd === 'rm -rf /*') {
      output.className = 'cli-output cli-error';
      output.textContent = 'Error: This is a read-only filesystem. Nice try though.';
    } else if (command === ':wq' || command === ':wq!') {
      output.textContent = 'This isn\'t vim... or is it? 🤔';
    } else if (command === 'exit') {
      output.textContent = 'There is no escape. You\'re here forever. 😈';
    } else if (command === 'teapot') {
      output.textContent = 'HTTP 418: I\'m a teapot ☕\n\nShort and stout.';
    } else if (command === 'hidden') {
      output.innerHTML = `Hidden commands:

carlos          - Delete user carlos
admin           - Attempt admin access
markus kargl    - Check IT expert availability  
ben bliem       - Open Ben's website
siemens lufthaken - Check Siemens stock
42              - The answer to everything
rm -rf /        - Try to delete everything
:wq             - Exit vim (?)
exit            - Try to leave
teapot          - HTTP 418
glitch          - Trigger screen glitch
Ctrl+Shift+6    - Cisco easter egg
↑↑↓↓←→←→BA      - Konami code`;
    } else if (command === 'glitch') {
      triggerGlitch();
      output.textContent = 'Reality.exe has encountered an error.';
    } else if (command === 'animals') {
      const animals = Object.values(asciiAnimals);
      output.innerHTML = animals[Math.floor(Math.random() * animals.length)];
    } else if (command === 'fish') {
      output.innerHTML = asciiAnimals.fish;
    } else if (command === 'skull') {
      output.innerHTML = asciiAnimals.skull;
    } else if (command === 'cowsay') {
      const message = args || 'Moo!';
      const border = '_'.repeat(message.length + 2);
      output.innerHTML = ` ${border}
< ${message} >
 ${'-'.repeat(message.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
    } else if (command === 'memory') {
      const used = Math.floor(Math.random() * 60) + 20;
      output.innerHTML = `MEMORY USAGE

Total:    ${navigator.deviceMemory || 8}GB
Used:     ${used}%
Free:     ${100-used}%

[${('█'.repeat(used/2))}${('░'.repeat((100-used)/2))}]`;
    } else if (command === 'network') {
      const latency = Math.floor(Math.random() * 50) + 10;
      const speed = (Math.random() * 100 + 50).toFixed(1);
      output.innerHTML = `NETWORK STATUS

Connection:   ${navigator.onLine ? 'ONLINE' : 'OFFLINE'}
Latency:      ${latency}ms
Download:     ${speed} Mbps
Protocol:     HTTP/2
Encryption:   TLS 1.3`;
    } else if (command === 'fortune') {
      output.textContent = fortunes[Math.floor(Math.random() * fortunes.length)];
    } else if (command === 'quiz') {
      currentQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
      prompt.textContent = '>';
      prompt.classList.add('simple');
      output.innerHTML = `${currentQuiz.q}\n\n${currentQuiz.options.map((o, i) => `${i+1}. ${o}`).join('\n')}\n\nType your answer:`;
    } else if (command === 'riddle') {
      currentRiddle = riddles[Math.floor(Math.random() * riddles.length)];
      prompt.textContent = '>';
      prompt.classList.add('simple');
      output.textContent = currentRiddle.q;
    } else if (command === 'fact') {
      output.textContent = facts[Math.floor(Math.random() * facts.length)];
    } else if (command === 'challenge') {
      output.textContent = 'CODING CHALLENGE:\n\n' + challenges[Math.floor(Math.random() * challenges.length)];
    } else {
      switch(command) {
        case 'help':
          output.innerHTML = `Available commands:

help            - Show this help message
clear           - Clear command history
status          - Show system status
visitor         - Show visitor statistics
theme [color]   - Change theme (amber/green/white/blue/magenta)
                  or use 'theme custom #hexcode'
restart         - Restart terminal
history         - Show command history
time            - Show current time
uptime          - Show session uptime
memory          - Show memory usage
network         - Show network status
joke            - Get a random programming joke
quote           - Get quote of the day
fortune         - Get a fortune cookie
quiz            - Programming quiz
riddle          - Solve a riddle
fact            - Random programming fact
challenge       - Get a coding challenge
dream [text]    - Save a dream to your journal
dreams          - View all saved dreams
cowsay [text]   - Cow says your message
animals         - Random ASCII animal
fish            - ASCII fish tank
skull           - ASCII skull
glitch          - Trigger screen glitch`;
          break;
          
        case 'clear':
          history.innerHTML = '';
          return;
          
        case 'status':
          output.innerHTML = `SYSTEM STATUS: OPERATIONAL

Platform: ${navigator.platform}
User Agent: ${navigator.userAgent.substring(0, 60)}...
Language: ${navigator.language}
Online: ${navigator.onLine ? 'Yes' : 'No'}
Total Visits: ${visitorData.totalVisits}`;
          break;

        case 'visitor':
          const firstVisitDate = new Date(visitorData.firstVisit);
          const daysSince = Math.floor((Date.now() - firstVisitDate.getTime()) / (1000 * 60 * 60 * 24));
          
          output.innerHTML = `VISITOR STATISTICS

Visitor ID: #${Math.random().toString(36).substr(2, 8).toUpperCase()}
Total Visits: ${visitorData.totalVisits}
First Visit: ${firstVisitDate.toLocaleDateString()}
Days Active: ${daysSince}
User Agent: ${navigator.userAgent.substring(0, 50)}...
Screen: ${window.screen.width}x${window.screen.height}
Viewport: ${window.innerWidth}x${window.innerHeight}
Connection: ${navigator.onLine ? 'ONLINE' : 'OFFLINE'}`;
          break;
          
        case 'theme':
          if (parts[1]) {
            if (parts[1] === 'custom' && parts[2] && parts[2].match(/^#[0-9A-Fa-f]{6}$/)) {
              applyCustomTheme(parts[2]);
              window.updateTerrainColor(parts[2]);
              output.textContent = 'Custom theme applied: ' + parts[2];
            } else {
              const themes = ['amber', 'green', 'white', 'blue', 'magenta'];
              if (themes.includes(parts[1])) {
                // Clear custom theme
                document.documentElement.style.removeProperty('--amber');
                document.documentElement.style.removeProperty('--amber-soft');
                document.documentElement.style.removeProperty('--amber-dim');
                
                document.body.className = parts[1] === 'amber' ? '' : 'theme-' + parts[1];
                localStorage.setItem('terminal-theme', parts[1]);
                window.updateTerrainColor(parts[1]);
                output.textContent = 'Theme changed to: ' + parts[1];
              } else {
                output.className = 'cli-output cli-error';
                output.textContent = 'Invalid theme. Options: amber, green, white, blue, magenta\nOr use: theme custom #hexcode';
              }
            }
          } else {
            output.textContent = 'Current theme: ' + (localStorage.getItem('terminal-theme') || 'amber');
          }
          break;
          
        case 'restart':
          output.textContent = 'Restarting terminal...';
          history.appendChild(output);
          setTimeout(() => location.reload(), 1000);
          return;
          
        case 'history':
          output.innerHTML = commandHistory.map((c, i) => `${i + 1}  ${c}`).join('\n');
          break;
          
        case 'time':
          output.textContent = new Date().toLocaleString();
          break;
          
        case 'uptime':
          const uptime = Math.floor(performance.now() / 1000);
          const minutes = Math.floor(uptime / 60);
          const seconds = uptime % 60;
          output.textContent = `Session uptime: ${minutes}m ${seconds}s`;
          break;

        case 'joke':
          fetch('https://official-joke-api.appspot.com/random_joke')
            .then(r => r.json())
            .then(j => {
              output.textContent = `${j.setup}\n\n${j.punchline}`;
              history.appendChild(output);
              scrollToInput();
            })
            .catch(() => {
              output.textContent = 'Failed to fetch joke. Try again later.';
              history.appendChild(output);
              scrollToInput();
            });
          return;

        case 'quote':
          fetch('https://zenquotes.io/api/random')
            .then(r => { if(!r.ok) throw new Error(); return r.json(); })
            .then(q => {
              const quote = q[0];
              output.textContent = `"${quote.q}"\n\n— ${quote.a}`;
              history.appendChild(output);
              scrollToInput();
            })
            .catch(() => {
              output.textContent = 'Quote service unavailable.';
              history.appendChild(output);
              scrollToInput();
            });
          return;

        case 'dream':
          if (args) {
            dreamJournal.push({
              date: new Date().toISOString(),
              text: args
            });
            localStorage.setItem('dream-journal', JSON.stringify(dreamJournal));
            output.textContent = `Dream saved. Total dreams: ${dreamJournal.length}`;
          } else {
            output.className = 'cli-output cli-error';
            output.textContent = 'Usage: dream [your dream text]';
          }
          break;

        case 'dreams':
          if (dreamJournal.length === 0) {
            output.textContent = 'No dreams saved yet. Use: dream [text]';
          } else {
            output.innerHTML = dreamJournal.map((d, i) => 
              `${i + 1}. [${new Date(d.date).toLocaleDateString()}] ${d.text}`
            ).join('\n\n');
          }
          break;
          
        default:
          output.className = 'cli-output cli-error';
          output.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
      }
    }

    history.appendChild(output);
    scrollToInput();
  }

  function scrollToInput() {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  }
}

// ===== KONAMI CODE =====
let konamiIndex = 0;
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      activateWhale();
    }
  } else {
    konamiIndex = 0;
  }
});

function activateWhale() {
  const whaleDiv = document.getElementById('whale-animation');
  const frames = [`
                                  ___
                              .-'   \`'.
                             /         \\
                             |         ;
                             |         |           ___.--,
                    _.._     |0) ~ (0) |    _.---'\`__.-( (_.
             __.--'\`_.. '.__.\\    '--. \\_.-' ,.--'\`     \`""\`
            ( ,.--'\`   ',__ /./;   ;, '.__.'\ \`
            _\`) )  .---.__.' / |   |\\   \\__..\\
           \`---' .'.''-._.-'\`_./  /\\ '.  \\ _.'
                 | |  .' _.-' |  |  \\  \\  '.
                  \\ \`-' /     |  /    \\  \\   \\
                   \`.__/      |  \\     \\  '.__/
                              \\_  \\     \`.__/
                                \`--'
`, `
                                  ___
                              .-'   \`'.
                             /         \\
                             |         ;
                             |         |           ___.--,
                    _.._     |0) - (0) |    _.---'\`__.-( (_.
             __.--'\`_.. '.__.\\    '--. \\_.-' ,.--'\`     \`""\`
            ( ,.--'\`   ',__ /./;   ;, '.__.'\ \`
            _\`) )  .---.__.' / |   |\\   \\__..\\
           \`---' .'.''-._.-'\`_./  /\\ '.  \\ _.'
                 | |  .' _.-' |  |  \\  \\  '.
                  \\ \`-' /     |  /    \\  \\   \\
                   \`.__/      |  \\     \\  '.__/
                              \\_  \\     \`.__/
                                \`--'
`];

  let frame = 0;
  whaleDiv.style.display = 'block';
  whaleDiv.textContent = frames[frame];
  
  const interval = setInterval(() => {
    frame = (frame + 1) % frames.length;
    whaleDiv.textContent = frames[frame];
  }, 500);
  
  setTimeout(() => {
    clearInterval(interval);
    whaleDiv.style.display = 'none';
  }, 5000);
}

// ===== START =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSequence);
} else {
  bootSequence();
}