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
  cat: `
                   _..
 /}_{\           /.-'
( a a )-.___...-'/
==._.==         ;
     \ i _..._ /,
     {_;/   {_//  
`,

  dog: `
     -----------------------------/ ^^^^^^^ \
   /                             |  | * * |  |
  / |   )                   |  ||\__/  @  \__/
\/   \ / /----------\______/ \ //     '-'
      ||=|=                   ||=|=
`,

  bunny: `
  ,
        /|      __
       / |   ,-~ /
      Y :|  //  /
      | jj /( .^
      >-"~"-v"
     /       Y
    jo  o    |
   ( ~T~     j
    >._-' _./
   /   "~"  |
  Y     _,  |
 /| ;-"~ _  l
/ l/ ,-"~    \
\//\/      .- \
 Y        /    Y    
 l       I     !
 ]\      _\    /"\
(" ~----( ~   Y.  )
`,

  fish: `
+-------------------------------+
|  O                            |
|  o        O                O  |
|  ._        o      O         o |
|  <_><     .      o         _. |
|         ><>      _.      ><_> |
|      } }       ><_>   {       |
|     { }                }      |
|      {                {       |
|===============================|
`,

  // improved skull
  skull: `
           __.-----.._
      _._-'           '-.
   .-'    '- - .         \
  /              '        '.
 /                          \
 |                '          |
 |             .' /          |
/;            /   |         /
+=,_         :   /         /
\  \T| =_    |            /
V\  |   ""=W \.          /
 "|/|       V \_     __)'
  \W'    --.,   ' _."
  |;           /F"
  /        _'="
  '^-Y_Y_;-'
`,

  owl: `
                /^----^\
                | 0  0 |
  Whoo!!        |  \/  |
                /       \
    Whoo!!     |     |;;;|
               |     |;;;|
               |      \;;|
                \       \|
 -----------------(((--(((--------
`,

  duck: `
                        __
                      /' ,\__
                     |    ).-'
                    / .--'
                   / /
     ,      _.=='''  \
   .'(  _.='         |
  {   ''  _.='       |
   {    \`     ;    /
    '.   ''=..'  .='
      '=._    .='
        '-'\\'__
            '-._{
`,

  snail: `
\/
|\____
    SK\'----'\
 '"""""+\
`,

  turtle: `
             ___
          ,+'/.\'+,    ___
        \/\_/\_/\_/\,+' * \
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
       /_/'-------'\_\              
`,

  frog: `
 ~    00    ~
   ~ (--)  ~
~   ( || )  ~
    ^^~~^^
`,

  crab: `
   __       __
  / <'     '> \
 (  / @   @ \  )
  \(_ _\_/_ _)/
(\ '-/     \-' /)
 "===\     /==="
  .==')___('==.
 ' .='     '=.
`,

  mouse: `
()(),~~,.
 .. ___; )
='=     (_. 
`,

  raccoon: `
  /\ /\
-''-   _
  () ()\  ,'_\
  ( . ) )/._./
   (_)-(_).--'
`,

  bat: `
  _..__.          .__.._
.^"-.._ '-(\__/)-' _..-"^.
       '-.' oo '.-'
          '-..-'
`,

  sheep: `
        __  _
    .-.'  '; '-._  __  _
   (_,         .-:'  '; '-._
 ,'o"(        (_,           )
(__,-'      ,'o"(            )>
   (       (__,-'            )
    '-'._.--._(             )
       |||  |||'-'._.--._.-'
                  |||  |||
`,

  hedgehog: `
  ,)))))))_
 ))))))))^'>
/|,,,,,,|,\
`,

  penguin: `
   __
-=(o '.
   '.-.\
   /|  \\
   '|  ||
    _\_):,_
`,

  octopus: `
                        ___
                     .-'   ''.
                    /         \
                    |         ;
                    |         |           ___.--,
           _.._     |0) ~ (0) |    _.---''__.-( (_.
    __.--''_.. '.__.\    '--. \_.-' ,.--''     '""'
   ( ,.--''   ',__ /./;   ;, '.__.''    __
   _') )  .---.__.' / |   |\   \__..--""  """--.,_
  '---' .'.''-._.-''_./  /\ '.  \ _.-~~~''''~~~-._'-.__.'
        | |  .' _.-' |  |  \  \  '.               '~---'
         \ \/ .'     \  \   '. '-._)
          \/ /        \  \    '=.__'~-.
          / /\         ') )    / / '"".'\
    , _.-'.'\ \        / /    ( (     / /
     '--~'   ) )    .-'.'      '.'.  | (
            (/'    ( ('          ) )  '-;
             '      '-;         (-'
`,

  alien: `
   .-""""-.   
  /        \  
 /_        _\ 
// \      / \\
|\__\    /__/|
 \    ||    / 
  \        /  
   \  __  /   
    '.__.'    
     |  |     
     |  |     
`,

  ghost: `
     ___
    /   \
   / O O \
  |   O   |
, |       | ,
 \/(     )\/
  | )   ( |
  |(     )|
  ||   | |'
  '|   | |
   |   | |
   |   /-'
   |_.'
`,
  monke: `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⢺⡕⠱⠞⠶⣄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡴⠁⢽⡷⣦⢤⣶⣦⣧⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠞⢋⣀⢱⠸⠤⠙⣻⣿⣟⠒⢄⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡔⠋⠀⠀⠀⠀⠹⣧⡄⡆⠠⠅⣸⠀⠘⡆⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⠤⠎⠀⠀⠀⠀⠀⠀⠀⢙⡟⠮⡦⠖⢡⠀⠀⣿⠀
⠀⠀⠀⢀⠄⠒⢸⠏⠁⠀⠀⡀⠀⣇⠀⠀⠀⠀⠸⡇⠀⠄⠀⡆⠀⠀⣿⠀
⠀⠀⢠⠃⠀⠀⡋⠀⠀⠀⠀⠑⠻⣿⠀⠀⠀⠀⡇⡇⡀⠀⣠⠃⠀⠀⠏⡀
⠀⠀⢸⡃⠀⠀⢄⠓⠀⠀⠀⠀⠀⡇⢇⠀⠀⠀⢷⠊⡠⢪⡍⢶⣀⡆⠀⡇
⠀⠀⢸⠀⠀⠀⠈⢦⠀⠀⠀⠀⢠⡇⠈⠶⠋⠀⢾⡏⠀⢸⡇⠀⠀⠀⠀⡏
⠀⠀⢸⡀⠀⠀⠀⢸⠣⣭⡶⣰⣸⠙⢤⣄⠀⠀⢈⡇⠀⠀⣿⠀⠀⠀⠸⢻
⠀⠀⡞⠀⠀⠀⣀⠞⠀⠀⠈⢦⠸⣳⠀⠀⠀⠀⢻⠁⠀⠀⠸⡀⠀⠀⠀⣿
⠀⣸⠂⠀⠈⡹⠋⠀⠀⠀⠀⢸⠀⡟⠀⠀⠀⠀⡸⠀⠀⠀⠀⢩⢀⡀⣰⡟
⠀⡷⠀⠀⣾⠁⠀⠀⠀⠀⠀⠸⠄⣸⡦⠀⠀⠀⡇⠀⠀⠀⣤⣳⡈⡛⣩⠀
⣴⣭⠸⠚⠚⠂⠀⠀⠀⠀⠀⠀⠀⠸⡁⠀⢠⣾⠀⠀⠀⠀⠀⠘⠏⠛⠋⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠿⠺⠾⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`,
  whale: `
      __________...----..____..-'''-..___
    ,'.                                  '''--.._
   :                                             ''._
   |                           --                    ''.
   |                   -.-      -.     -   -.        '.
   :                     __           --            .     \
    '._____________     (  '.   -.-      --  -   .   '     \
       '-----------------\   \_.--------..__..--.._ '. '.   :
                          '--'     SSt             '-._ .   |
                                                       '.'  |
                                                         \' |
                                                          \ |
                                                          / \'.
                                                         /  _\-'
                                                        /_,'
`,
  dragon: `
                         .
                         /  , /
                       ,/' /''
                      /(/''   _
                     f'/)  ,-'
                    /    ,' itz
                   f,/  /
                   /"  7
                  / ,f /
             )   / / |J
                7,( ;|j
     ,       (. "'/ ('
         '    )'-'/ l '
   (  (    ) '   ' (_,'  )
(     ,)  7'  /  /,  (, (
 ,  ) (,- '-'  /  (,   -') (
(_ ( '-_(,_,'_(_(__ )_, _'-_, _
`
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
  "You will discover a semicolon in an unexpected place.",

  "A rubber duck will solve your problem.",
  "The compiler understands you less than you think.",
  "A variable in your code has feelings.",
  "You will debug something that was never broken.",
  "An infinite loop watches you sleep.",
  "Today is a good day to refactor... tomorrow.",
  "Someone somewhere already solved your problem in Python.",
  "The documentation will be both correct and useless.",
  "You will read error logs like ancient runes.",
  "Your keyboard knows the truth.",

  "The code works. Do not touch it.",
  "You will break something while fixing something else.",
  "A mysterious bug will disappear when observed.",
  "The machine spirit demands a reboot.",
  "You will forget what this function does tomorrow.",
  "The terminal sees everything.",
  "Your code reviewer is silently judging you.",
  "Someone will say: 'It works on my machine.'",
  "The debugger will reveal uncomfortable truths.",
  "A missing bracket hides in plain sight.",

  "You will search for a bug that is actually a typo.",
  "The next commit will fix everything. Probably.",
  "A stray console.log will reveal the universe.",
  "Your codebase grows... like moss.",
  "The server hums quietly, thinking about errors.",
  "You will open 37 browser tabs.",
  "A forgotten TODO comment will return.",
  "The logs know what happened.",
  "The logs will not tell you.",
  "Your future self will be confused.",

  "A process in the background is plotting something.",
  "The cache contains mysteries.",
  "The cache also contains lies.",
  "Your terminal window has seen worse.",
  "A ghost in the machine pressed enter.",
  "The universe runs on undocumented APIs.",
  "Someone pushed directly to main.",
  "A cosmic bit flipped somewhere.",
  "You will debug a bug that fixes itself.",
  "The system remembers.",

  "The answer is probably DNS.",
  "No, really. It's DNS.",
  "If not DNS, it is permissions.",
  "If not permissions, it is DNS again.",
  "The server whispers: 'try restarting me.'",
  "You will forget to save a file.",
  "The build will fail five minutes before a demo.",
  "The build will succeed when nobody is watching.",
  "An update will break everything.",
  "An update will fix everything.",

  "The terminal approves your curiosity.",
  "You will type a command and instantly regret it.",
  "A hidden command waits to be discovered.",
  "You will run `rm` carefully today.",
  "You will run `rm` confidently tomorrow.",
  "The filesystem is listening.",
  "An old script still works somehow.",
  "You will grep for meaning.",
  "The logs contain poetry.",
  "The logs also contain despair.",

  "You will stare at code until it blinks first.",
  "The bug is subtle and full of malice.",
  "The compiler error message is technically correct.",
  "The code was written by past you.",
  "Past you was optimistic.",
  "Future you will be confused.",
  "The terminal wishes you luck.",
  "The terminal knows what you did.",
  "A commit message will say 'final fix'.",
  "There will be three more fixes.",

  "A variable named 'temp2' will appear.",
  "A function will be called 'testFinalFinal'.",
  "You will promise to refactor later.",
  "Later never arrives.",
  "A mysterious script will run perfectly.",
  "Nobody knows why.",
  "The bug hides behind a race condition.",
  "The race condition hides behind timing.",
  "Timing hides behind chaos.",
  "Chaos hides behind JavaScript.",

  "You will open the same file five times.",
  "You will forget why you opened it.",
  "The terminal blinks patiently.",
  "A build system somewhere is screaming.",
  "Your CPU is thinking very hard.",
  "The fans spin in agreement.",
  "A semicolon dreams of purpose.",
  "A bracket longs to be closed.",
  "The stack grows restless.",
  "The heap expands slowly.",

  "You will learn something useless but fascinating.",
  "The best solution is the simplest one.",
  "You will ignore that advice.",
  "A tiny change will fix everything.",
  "A large change will break everything.",
  "The machine spirit is pleased today.",
  "The machine spirit demands caffeine.",
  "The server dreams of electric sheep.",
  "Reality may be a simulation.",
  "If so, the logs are poorly documented.",

  "You will discover a new command today.",
  "You will forget it tomorrow.",
  "The terminal has secrets.",
  "Curiosity will reveal them.",
  "A hidden message might appear.",
  "Or maybe it won't.",
  "Either way, keep exploring.",
  "The system hums quietly.",
  "The cursor waits patiently.",
  "Type something interesting.",
  "Du wirst deine Vorhaut verlieren"
];

const riddles = [
  { q: "I'm a loop that never ends unless you break me. What am I?", a: "while(true)" },
  { q: "I have keys but no locks, space but no room. What am I?", a: "keyboard" },
  { q: "The more memory I leak, the larger I become. What am I?", a: "memory leak" },
  { q: "I'm full of bugs, constantly changing, yet developers rely on me. What am I?", a: "code" },
  { q: "I always return something, but never the same twice unless you ask nicely. What am I?", a: "random" },
  { q: "I am written once, debugged forever. What am I?", a: "code" },
  { q: "I copy everything you type but never judge your mistakes. What am I?", a: "terminal" },
  { q: "I remember everything but understand nothing. What am I?", a: "computer" },
  { q: "I can travel around the world in milliseconds but never leave the wire. What am I?", a: "packet" },
  { q: "I answer almost every programming question, yet I'm not human. What am I?", a: "stack overflow" },
  { q: "I grow larger the more features you add, yet somehow become slower. What am I?", a: "software" },
  { q: "You see me in every project, promise to remove me later, but never do. What am I?", a: "todo" },
  { q: "I start with a single command but can spawn thousands of processes. What am I?", a: "script" },
  { q: "The more threads you create, the more chaos I bring. What am I?", a: "race condition" },
  { q: "Developers fear me before a demo. What am I?", a: "bug" },
  { q: "I appear only after deployment. What am I?", a: "production bug" },
  { q: "I am invisible until something goes wrong. Then everyone looks for me. What am I?", a: "log" },
  { q: "I exist everywhere yet nowhere in your code. Remove me and everything breaks. What am I?", a: "dependency" },
  { q: "I help you find problems but sometimes create new ones. What am I?", a: "debugger" },
  { q: "I repeat the same mistake thousands of times per second. What am I?", a: "computer" },
  { q: "I promise order but often create chaos. What am I?", a: "algorithm" },
  { q: "I live in your code but run somewhere else. What am I?", a: "server" },
  { q: "I am both a blessing and a curse for developers. What am I?", a: "javascript" },
  { q: "I run everywhere yet behave differently everywhere. What am I?", a: "browser" },
  { q: "I keep secrets but only if configured correctly. What am I?", a: "environment variable" },
  { q: "I run your code faster but make bugs harder to find. What am I?", a: "optimization" },
  { q: "I turn human ideas into machine instructions but never complain about bad logic. What am I?", a: "compiler" },
  { q: "I help programs talk but sometimes nobody listens. What am I?", a: "api" },
  { q: "I store everything but remember nothing about meaning. What am I?", a: "database" },
  { q: "I turn readable code into something only machines understand. What am I?", a: "compiler" },
  { q: "Developers love me in theory but avoid me in practice. What am I?", a: "documentation" },
  { q: "I am the reason your code worked yesterday but not today. What am I?", a: "update" },
  { q: "I exist only to say 'it works on my machine.' What am I?", a: "environment" },
  { q: "The more carefully you type me, the faster everything breaks if I'm wrong. What am I?", a: "command" },
  { q: "I can destroy your system in milliseconds with only two characters. What am I?", a: "rm" },
  { q: "I am invisible but control everything your program does. What am I?", a: "logic" },
  { q: "I help you find things instantly in massive codebases. What am I?", a: "grep" },
  { q: "I turn chaos into structure but developers still misuse me. What am I?", a: "framework" },
  { q: "I solve problems by creating smaller problems. What am I?", a: "function" },
  { q: "I live between your code and the machine and sometimes get blamed for both. What am I?", a: "runtime" }
];

const facts = [
  "The first computer bug was literally a moth found inside a Harvard Mark II computer in 1947.",
  "The first 1GB hard drive (IBM 3380) weighed over 500 pounds and cost around $40,000.",
  "The average programmer writes surprisingly little code per day—often only 10–50 useful lines.",
  "There are more possible chess positions than atoms in the observable universe.",
  "The first computer virus for personal computers was 'Elk Cloner' in 1983.",
  "Python was named after Monty Python, not the snake.",
  "The first website ever created is still online at info.cern.ch.",
  "The first programmer in history was Ada Lovelace in the 1840s.",
  "The original 'debugging' logbook entry with the moth is still preserved in a museum.",
  "Email existed before the World Wide Web.",

  "The Linux kernel started as a hobby project by Linus Torvalds in 1991.",
  "The first domain name ever registered was symbolics.com in 1985.",
  "The first version of Windows was released in 1985.",
  "The C programming language was created in the early 1970s at Bell Labs.",
  "JavaScript was created in just 10 days in 1995.",
  "The first webcam monitored a coffee pot at Cambridge University.",
  "Git was created by Linus Torvalds after a dispute over a proprietary version control system.",
  "Most programming languages borrow syntax ideas from C.",
  "The '@' symbol in email addresses was chosen because it was rarely used in names.",
  "Unix was originally written on a PDP-7 computer.",

  "The original Apple I computer was sold as a kit without a keyboard or monitor.",
  "The famous '404' error likely came from a room number at CERN.",
  "The first graphical web browser was called Mosaic.",
  "Stack Overflow launched in 2008.",
  "The first smartphone is often considered the IBM Simon from 1994.",
  "The first video game is often credited as 'Tennis for Two' from 1958.",
  "The first hard disk drive (1956) stored only 5 megabytes.",
  "The Apollo 11 guidance computer had less computing power than a modern calculator.",
  "The Space Shuttle computers had about 1 MB of memory.",
  "Early punch cards could hold only 80 characters.",

  "The first Google server was built from LEGO.",
  "The original Google algorithm was called 'BackRub'.",
  "The 'CAPTCHA' test was partly used to digitize books.",
  "The first emoji appeared in Japan in 1999.",
  "The first computer mouse was made of wood.",
  "Unix time started on January 1st, 1970.",
  "The Y2K bug was caused by storing years with only two digits.",
  "QR codes were invented in 1994 for tracking car parts.",
  "The first YouTube video was uploaded in 2005.",
  "The first tweet was posted in 2006.",

  "JavaScript and Java have almost nothing in common.",
  "The Linux penguin mascot is named Tux.",
  "GitHub was launched in 2008.",
  "The world’s first computer programmer was a mathematician writing algorithms for a machine that didn’t yet exist.",
  "The word 'robot' comes from a Czech word meaning forced labor.",
  "The internet began as a research network called ARPANET.",
  "The first ARPANET message crashed the system halfway through sending the word 'LOGIN'.",
  "The first version control systems appeared in the 1970s.",
  "Open source software powers most of the internet.",
  "About 90% of the world’s servers run Linux.",

  "The 'Hello, World!' tradition dates back to a 1978 C programming book.",
  "The original Doom game was responsible for popularizing online multiplayer.",
  "Programmers spend far more time reading code than writing it.",
  "A single missing semicolon has caused massive outages.",
  "The Mars Climate Orbiter was lost due to a unit conversion bug.",
  "The fastest supercomputers can perform quadrillions of calculations per second.",
  "The term 'hacker' originally meant a creative programmer, not a criminal.",
  "Early programmers sometimes had to flip switches manually to enter code.",
  "The first floppy disk held only about 80 KB.",
  "The first USB standard appeared in 1996.",

  "Modern browsers contain millions of lines of code.",
  "Some programming languages are designed to be intentionally hard to use.",
  "There are over 700 programming languages.",
  "COBOL code still runs critical financial systems today.",
  "The majority of the internet is invisible to search engines.",
  "The first CAPTCHA solved by AI helped digitize millions of books.",
  "The Unicode standard contains over 140,000 characters.",
  "The Linux kernel has over 30 million lines of code.",
  "NASA once accidentally deleted 45 years of spacecraft telemetry data.",
  "A single cosmic ray can flip a bit in computer memory.",

  "Computers only understand two states: on and off.",
  "Every image, song, and program ultimately becomes binary.",
  "The internet can route around damage by design.",
  "Data centers often use more electricity than small towns.",
  "The first emoji set had only 176 symbols.",
  "Some satellites still run decades-old software.",
  "Early computers required air conditioning because of heat.",
  "The term 'spam' for unwanted messages comes from a Monty Python sketch.",
  "The command line existed long before graphical interfaces.",
  "Your terminal is older than most modern software."

];

const challenges = [
  "Write FizzBuzz in your favorite language.",
  "Reverse a string without using built-in reverse functions.",
  "Implement a binary search algorithm.",
  "Create a function that detects palindromes.",
  "Build a simple calculator using only bitwise operations.",
  "Write a function to compute the nth Fibonacci number.",
  "Write a program that prints numbers from 1–100 without using loops.",
  "Generate the first 20 prime numbers.",
  "Write a function that removes duplicate characters from a string.",
  "Check if two strings are anagrams of each other.",

  "Write a function that finds the longest word in a sentence.",
  "Rotate an array by N positions.",
  "Count how many vowels appear in a string.",
  "Write a function that flattens a nested array.",
  "Find the largest number in an array without using built-ins.",
  "Write a function that sorts numbers without using sort().",
  "Create a simple Caesar cipher encoder.",
  "Decode a Caesar cipher message.",
  "Check if a number is a power of two.",
  "Write a program that swaps two numbers without using a temporary variable.",

  "Print a pyramid pattern using only loops.",
  "Generate a random password generator.",
  "Create a function that counts word frequency in a text.",
  "Write a function that converts Roman numerals to integers.",
  "Convert integers to Roman numerals.",
  "Write a function that determines if a year is a leap year.",
  "Create a function that removes whitespace from a string.",
  "Find the second largest number in an array.",
  "Detect if an array contains duplicates.",
  "Find the intersection of two arrays.",

  "Write a program that simulates a coin flip 1000 times.",
  "Create a simple URL parser.",
  "Write a function that shuffles an array.",
  "Create a function that calculates factorial recursively.",
  "Write factorial without recursion.",
  "Write a function that counts digits in an integer.",
  "Convert a string to title case.",
  "Find the most common character in a string.",
  "Generate the Fibonacci sequence up to 1000.",
  "Write a function that checks balanced parentheses.",

  "Write a function that compresses repeated characters (aaabb → a3b2).",
  "Build a tiny markdown-to-HTML converter.",
  "Create a function that finds the missing number in a sequence.",
  "Write a function that merges two sorted arrays.",
  "Create a function that groups anagrams together.",
  "Write a function that finds the longest palindrome in a string.",
  "Build a command-line number guessing game.",
  "Simulate rolling two dice 10,000 times.",
  "Write a function that calculates the median of an array.",
  "Generate a random maze in ASCII.",

  "Create Conway’s Game of Life.",
  "Write a simple todo list manager in the terminal.",
  "Build a simple key-value store.",
  "Create a function that finds prime factors of a number.",
  "Write a function that converts binary to decimal.",
  "Convert decimal numbers to binary without built-ins.",
  "Write a program that counts lines in a file.",
  "Implement a simple rate limiter.",
  "Write a tiny URL shortener algorithm.",
  "Create a program that detects cycles in a linked list.",

  "Write a function that calculates edit distance between two strings.",
  "Implement a stack using arrays.",
  "Implement a queue using two stacks.",
  "Write a basic JSON parser.",
  "Build a simple cache with expiration.",
  "Create a basic chatbot that responds with rules.",
  "Generate random haikus using code.",
  "Write a program that finds the longest increasing subsequence.",
  "Implement quicksort from scratch.",
  "Write a program that simulates a basic CPU scheduler."
];

const quizzes = [

  {
    q: "What does HTTP stand for?",
    a: "HyperText Transfer Protocol",
    options: [
      "HyperText Transfer Protocol",
      "High Transfer Text Protocol",
      "Hyper Transfer Terminal Protocol",
      "Hyper Terminal Text Process"
    ]
  },

  {
    q: "Which language is often called the 'mother of modern programming languages'?",
    a: "C",
    options: [
      "Python",
      "C",
      "Assembly",
      "FORTRAN"
    ]
  },

  {
    q: "What year was JavaScript created?",
    a: "1995",
    options: [
      "1995",
      "1991",
      "2000",
      "1989"
    ]
  },

  {
    q: "Who created Linux?",
    a: "Linus Torvalds",
    options: [
      "Richard Stallman",
      "Linus Torvalds",
      "Dennis Ritchie",
      "Ken Thompson"
    ]
  },

  {
    q: "What does CPU stand for?",
    a: "Central Processing Unit",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Program Utility",
      "Control Processing Unit"
    ]
  },

  {
    q: "Which company created the Git version control system?",
    a: "Linux",
    options: [
      "Microsoft",
      "Google",
      "Linux",
      "Apple"
    ]
  },

  {
    q: "Which language runs natively in web browsers?",
    a: "JavaScript",
    options: [
      "JavaScript",
      "Python",
      "C++",
      "Go"
    ]
  },

  {
    q: "What does DNS stand for?",
    a: "Domain Name System",
    options: [
      "Domain Name System",
      "Data Network Server",
      "Digital Node System",
      "Distributed Name Service"
    ]
  },

  {
    q: "Which company created the Java programming language?",
    a: "Sun Microsystems",
    options: [
      "Sun Microsystems",
      "Oracle",
      "IBM",
      "Microsoft"
    ]
  },

  {
    q: "What symbol starts a comment in most shell scripts?",
    a: "#",
    options: [
      "#",
      "//",
      "--",
      "/*"
    ]
  },

  {
    q: "Which command lists files in Linux?",
    a: "ls",
    options: [
      "ls",
      "dir",
      "show",
      "list"
    ]
  },

  {
    q: "Which protocol is used for secure web browsing?",
    a: "HTTPS",
    options: [
      "HTTP",
      "HTTPS",
      "FTP",
      "SSH"
    ]
  },

  {
    q: "Which company created the Python programming language?",
    a: "None",
    options: [
      "Google",
      "Microsoft",
      "None",
      "IBM"
    ]
  },

  {
    q: "Who created Python?",
    a: "Guido van Rossum",
    options: [
      "Guido van Rossum",
      "Linus Torvalds",
      "Brendan Eich",
      "James Gosling"
    ]
  },

  {
    q: "What does RAM stand for?",
    a: "Random Access Memory",
    options: [
      "Random Access Memory",
      "Read Access Memory",
      "Rapid Access Machine",
      "Runtime Allocation Memory"
    ]
  },

  {
    q: "What does API stand for?",
    a: "Application Programming Interface",
    options: [
      "Application Programming Interface",
      "Advanced Program Interaction",
      "Application Process Integration",
      "Automated Programming Input"
    ]
  },

  {
    q: "Which company created Windows?",
    a: "Microsoft",
    options: [
      "Apple",
      "IBM",
      "Microsoft",
      "Sun"
    ]
  },

  {
    q: "Which language was created in just 10 days?",
    a: "JavaScript",
    options: [
      "Java",
      "JavaScript",
      "Python",
      "Ruby"
    ]
  },

  {
    q: "Which operating system uses the penguin mascot Tux?",
    a: "Linux",
    options: [
      "Linux",
      "Windows",
      "macOS",
      "BSD"
    ]
  },

  {
    q: "Which command removes files in Linux?",
    a: "rm",
    options: [
      "rm",
      "delete",
      "remove",
      "del"
    ]
  },

  {
    q: "Which company created the Chrome browser?",
    a: "Google",
    options: [
      "Microsoft",
      "Google",
      "Apple",
      "Mozilla"
    ]
  },

  {
    q: "Which language is primarily used for styling web pages?",
    a: "CSS",
    options: [
      "HTML",
      "CSS",
      "JavaScript",
      "XML"
    ]
  },

  {
    q: "Which tag starts a paragraph in HTML?",
    a: "<p>",
    options: [
      "<div>",
      "<p>",
      "<span>",
      "<text>"
    ]
  },

  {
    q: "Which protocol transfers files between computers?",
    a: "FTP",
    options: [
      "HTTP",
      "FTP",
      "SMTP",
      "SSH"
    ]
  },

  {
    q: "What does GPU stand for?",
    a: "Graphics Processing Unit",
    options: [
      "Graphics Processing Unit",
      "General Program Utility",
      "Graphical Performance Unit",
      "Graphics Protocol Unit"
    ]
  },

  {
    q: "Which language is famous for 'write once, run anywhere'?",
    a: "Java",
    options: [
      "C++",
      "Java",
      "Python",
      "Go"
    ]
  },

  {
    q: "What year did the first website go online?",
    a: "1991",
    options: [
      "1991",
      "1995",
      "1989",
      "2000"
    ]
  },

  {
    q: "What does IDE stand for?",
    a: "Integrated Development Environment",
    options: [
      "Integrated Development Environment",
      "Internal Development Engine",
      "Interactive Debug Engine",
      "Integrated Design Environment"
    ]
  },

  {
    q: "Which command prints the working directory?",
    a: "pwd",
    options: [
      "pwd",
      "cwd",
      "dir",
      "where"
    ]
  },

  {
    q: "Which programming language uses indentation as syntax?",
    a: "Python",
    options: [
      "Python",
      "C",
      "Java",
      "PHP"
    ]
  },

  {
    q: "What does SSH stand for?",
    a: "Secure Shell",
    options: [
      "Secure Shell",
      "System Secure Host",
      "Shell Server Host",
      "Secure Server Handler"
    ]
  },

  {
    q: "Which company created GitHub?",
    a: "None",
    options: [
      "Microsoft",
      "Google",
      "None",
      "Apple"
    ]
  },

  {
    q: "Which language is used to query databases?",
    a: "SQL",
    options: [
      "SQL",
      "HTML",
      "CSS",
      "JSON"
    ]
  },

  {
    q: "What does JSON stand for?",
    a: "JavaScript Object Notation",
    options: [
      "JavaScript Object Notation",
      "Java Structured Object Network",
      "JSON System Object Notation",
      "Java Source Object Name"
    ]
  },

  {
    q: "Which programming language is used for iOS apps?",
    a: "Swift",
    options: [
      "Swift",
      "Kotlin",
      "Rust",
      "Go"
    ]
  },

  {
    q: "Which command clears the terminal screen?",
    a: "clear",
    options: [
      "clear",
      "cls",
      "wipe",
      "reset"
    ]
  },

  {
    q: "What does LAN stand for?",
    a: "Local Area Network",
    options: [
      "Local Area Network",
      "Large Access Network",
      "Local Application Node",
      "Linked Access Network"
    ]
  },

  {
    q: "Which company created macOS?",
    a: "Apple",
    options: [
      "Apple",
      "Microsoft",
      "Sun",
      "IBM"
    ]
  },

  {
    q: "Which data structure works LIFO?",
    a: "Stack",
    options: [
      "Stack",
      "Queue",
      "Tree",
      "Graph"
    ]
  },

  {
    q: "Which structure works FIFO?",
    a: "Queue",
    options: [
      "Queue",
      "Stack",
      "Array",
      "Map"
    ]
  },

  {
    q: "Which programming language is strongly associated with data science?",
    a: "Python",
    options: [
      "Python",
      "C++",
      "Java",
      "Swift"
    ]
  },

  {
    q: "Which language compiles to WebAssembly easily?",
    a: "Rust",
    options: [
      "Rust",
      "PHP",
      "Ruby",
      "Bash"
    ]
  },

  {
    q: "Which company originally developed Unix?",
    a: "Bell Labs",
    options: [
      "Bell Labs",
      "IBM",
      "Microsoft",
      "Intel"
    ]
  }

];

const aliases = {
  // help
  'ls': 'help',
  '?': 'help',
  'h': 'help',
  'info': 'help',
  'commands': 'help',

  // exit / restart
  'quit': 'exit',
  'logout': 'exit',
  'bye': 'exit',

  // navigation style
  'cd': 'status',
  'pwd': 'visitor',

  // reading style
  'cat': 'dreams',

  // clear terminal
  'cls': 'clear',
  'wipe': 'clear',

  // system info
  'about': 'status',
  'system': 'status',

  // fun shortcuts
  'fortune-cookie': 'fortune',
  'motivation': 'quote',

  // quick utility
  'ipconfig': 'ip',
  'who': 'whoami'
};

// ===== UTILITY FUNCTIONS =====
function playSound(id) {
  const audio = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    audio.volume = 0.1;
    audio.play().catch(() => { });
  }
}

function applyCustomTheme(color) {
  document.documentElement.style.setProperty('--amber', color);
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const soft = `#${Math.min(255, r + 40).toString(16).padStart(2, '0')}${Math.min(255, g + 40).toString(16).padStart(2, '0')}${Math.min(255, b + 40).toString(16).padStart(2, '0')}`;
  const dim = `#${Math.max(0, r - 40).toString(16).padStart(2, '0')}${Math.max(0, g - 40).toString(16).padStart(2, '0')}${Math.max(0, b - 40).toString(16).padStart(2, '0')}`;
  document.documentElement.style.setProperty('--amber-soft', soft);
  document.documentElement.style.setProperty('--amber-dim', dim);
  localStorage.setItem('terminal-theme', color);
}

function getGreeting() {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  const month = new Date().getMonth();
  const isWeekend = day === 0 || day === 6;
  const isFirstVisit = visitorData.totalVisits === 1;

  const greetings = [];

  // ---- Time based greetings ----

  if (hour >= 5 && hour < 8) {
    greetings.push(
      'You are up early. The terminal approves.',
      'Early morning session detected. Coffee recommended.',
      'Sunrise and a terminal. A good combination.'
    );
  }

  else if (hour >= 8 && hour < 10) {
    greetings.push(
      'Good morning, operator.',
      'Morning system check complete. Terminal ready.',
      'Fresh day, fresh commands.'
    );
  }

  else if (hour >= 10 && hour < 12) {
    greetings.push(
      'Mid-morning productivity detected.',
      'System online. What shall we build today?',
      'Terminal ready. Let’s make something interesting.'
    );
  }

  else if (hour >= 12 && hour < 14) {
    greetings.push(
      'Lunch break coding session?',
      'Fuel level: lunch. Terminal level: operational.',
      'A little coding between meals never hurt anyone.'
    );
  }

  else if (hour >= 14 && hour < 17) {
    greetings.push(
      'Afternoon operations underway.',
      'System stable. Creativity encouraged.',
      'Another productive afternoon in the terminal.'
    );
  }

  else if (hour >= 17 && hour < 20) {
    greetings.push(
      'Evening session initialized.',
      'The workday ends. The interesting projects begin.',
      'Welcome back. The terminal missed you.'
    );
  }

  else if (hour >= 20 && hour < 23) {
    greetings.push(
      'Night mode activated.',
      'Late evening coding detected.',
      'The quiet hours are perfect for programming.'
    );
  }

  else if (hour >= 23 || hour < 2) {
    greetings.push(
      'Midnight terminal access granted.',
      'The best code sometimes happens after midnight.',
      'Night shift detected. Stay sharp.'
    );
  }

  else if (hour >= 2 && hour < 5) {
    greetings.push(
      'Very late session detected.',
      'Either you are very dedicated… or very curious.',
      'The terminal wonders if you should be sleeping.'
    );
  }

  // ---- Weekend flavor ----

  if (isWeekend) {
    greetings.push(
      'Weekend detected. Side projects encouraged.',
      'No deadlines today. Just curiosity.',
      'Weekend terminal access approved.'
    );
  }

  // ---- Seasonal messages ----

  if (month === 11 || month === 0) {
    greetings.push(
      'Winter coding season. Hot beverage recommended.',
      'Cold outside, warm terminal inside.'
    );
  }

  if (month >= 5 && month <= 7) {
    greetings.push(
      'Summer development session.',
      'Hydration reminder: drink water, write code.'
    );
  }

  // ---- Visit milestones ----

  if (isFirstVisit) {
    greetings.push(
      'First contact established. Welcome.',
      'Welcome, new operator. Type "help" to explore.',
      'System handshake successful. Enjoy the terminal.'
    );
  }

  if (visitorData.totalVisits === 5) {
    greetings.push(
      'Fifth visit logged. You seem curious.',
      'Five visits already. Someone likes this terminal.'
    );
  }

  if (visitorData.totalVisits === 10) {
    greetings.push(
      'Visit #10. You are becoming a regular.',
      'Ten visits. The terminal remembers you.'
    );
  }

  if (visitorData.totalVisits === 25) {
    greetings.push(
      'Twenty-five visits. Impressive dedication.',
      'Quarter-century milestone reached.'
    );
  }

  if (visitorData.totalVisits === 50) {
    greetings.push(
      'Visit #50. Veteran terminal operator detected.',
      'Half-century of visits. Respect.'
    );
  }

  if (visitorData.totalVisits === 100) {
    greetings.push(
      'Visit #100. Legendary status achieved.',
      'One hundred visits. The terminal salutes you.'
    );
  }

  if (visitorData.totalVisits > 100 && visitorData.totalVisits % 50 === 0) {
    greetings.push(
      `Visit #${visitorData.totalVisits}. This terminal appreciates your loyalty.`
    );
  }

  // ---- Small rare easter eggs ----

  if (Math.random() < 0.03) {
    greetings.push(
      'Psst... try typing "42".',
      'The terminal whispers: try "da hofa woas".',
      'Hidden commands do exist. Curiosity will be rewarded.'
    );
  }

  if (Math.random() < 0.02) {
    greetings.push(
      'All systems nominal. Probably.',
      'Terminal AI mood: stable.',
      'No bugs detected. Yet.'
    );
  }

  // ---- Default fallback ----

  if (greetings.length === 0) {
    greetings.push(
      'Terminal access granted.',
      'System ready.',
      'Welcome.'
    );
  }

  return greetings[Math.floor(Math.random() * greetings.length)];
}

function typewriterLine(element, text, callback) {
  let i = 0;
  const speed = 3;
  element.textContent = '> ';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
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

    if (document.activeElement !== input) {
      input.focus();
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Tab' || e.key === 'Escape') return;

    // Ctrl+Shift+6 Easter Egg
    if (e.ctrlKey && e.shiftKey && e.key === '6') {
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
    // If user pressed Enter with no input, reprint full prompt like a real terminal
    if (!cmd || !cmd.trim()) {
      const echo = document.createElement('div');
      echo.textContent = 'root@david-unterberger:~$';
      echo.style.color = 'var(--amber-soft)';
      history.appendChild(echo);
      scrollToInput();
      return;
    }

    const output = document.createElement('div');
    output.className = 'cli-output';

    const echo = document.createElement('div');
    echo.textContent = '> ' + cmd;
    echo.style.color = 'var(--amber-soft)';
    history.appendChild(echo);

    const parts = cmd.trim().split(/\s+/);
    let command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    // aliases mapping exists in outer scope
    if (aliases[command]) command = aliases[command];

    // Helper: scroll + append
    function pushAndScroll(node) {
      history.appendChild(node);
      scrollToInput();
    }

    // Helper: enhanced glitch (chromatic aberration + zoom)
    function enhancedGlitch() {
      const terminal = document.querySelector('.terminal-container');
      const overlay = document.createElement('div');
      overlay.className = 'glitch-overlay';
      document.body.appendChild(overlay);

      const originalTransition = terminal.style.transition || '';
      const originalTransform = terminal.style.transform || '';
      const originalFilter = terminal.style.filter || '';
      const originalTextShadow = terminal.style.textShadow || '';

      terminal.style.transition = 'transform 200ms ease, filter 200ms ease, text-shadow 200ms ease';
      terminal.style.transform = 'scale(1.08) rotateX(0.5deg)';
      terminal.style.filter = 'brightness(1.6) contrast(1.4) saturate(1.4)';
      terminal.style.textShadow = '-3px 0 rgba(255,0,0,0.8), 3px 0 rgba(0,255,255,0.8)';

      // Multiple jitter steps
      setTimeout(() => {
        terminal.style.transform = 'scale(0.97) skew(-2deg)';
        terminal.style.filter = 'brightness(0.9) contrast(1.8) saturate(1.6)';
      }, 160);

      setTimeout(() => {
        terminal.style.transform = 'scale(1.03) skew(1deg)';
        terminal.style.textShadow = '-2px 0 rgba(255,0,0,0.7), 2px 0 rgba(0,255,255,0.7)';
      }, 320);

      setTimeout(() => {
        terminal.style.transform = originalTransform;
        terminal.style.filter = originalFilter;
        terminal.style.textShadow = originalTextShadow;
        terminal.style.transition = originalTransition;
        overlay.remove();
      }, 1200);
    }

    // Answer checking while inside riddle/quiz - handled in outer flow earlier,
    // but keep here as safe-guard (these use currentRiddle/currentQuiz from outer scope).
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
      pushAndScroll(output);
      return;
    }

    if (currentQuiz) {
      const answer = cmd.trim();
      const correctIndex = currentQuiz.options.indexOf(currentQuiz.a) + 1; // 1-based

      const isNumberMatch = String(answer) === String(correctIndex);
      const isTextMatch = answer.toLowerCase() === (currentQuiz.a || '').toLowerCase();
      const isExactOptionMatch = currentQuiz.options.some(o => o.toLowerCase() === answer.toLowerCase());

      if (isNumberMatch || isTextMatch || isExactOptionMatch) {
        output.className = 'cli-output cli-success';
        output.textContent = 'Correct! 🎉';
      } else {
        output.className = 'cli-output cli-error';
        output.textContent = `Wrong. The answer was: ${currentQuiz.a}`;
      }

      currentQuiz = null;
      prompt.textContent = 'root@david-unterberger:~$';
      prompt.classList.remove('simple');
      pushAndScroll(output);
      return;
    }

    // ---------- Hidden / Short commands ----------
    if (command === 'carlos') {
      output.className = 'cli-output cli-success';
      output.textContent = 'User carlos deleted!';
      pushAndScroll(output);
      return;
    }

    if (command === 'admin') {
      output.className = 'cli-output cli-error';
      output.textContent = 'ACCESS DENIED!';
      pushAndScroll(output);
      return;
    }

    if (cmd.toLowerCase() === 'markus kargl') {
      output.textContent = 'IT and Electrics-expert currently not available.';
      pushAndScroll(output);
      return;
    }

    if (cmd.toLowerCase() === 'ben bliem') {
      output.textContent = 'Opening Ben Bliem\'s website...';
      pushAndScroll(output);
      setTimeout(() => window.open('https://benedecushtl.github.io/Ben-Bliem-Website/', '_blank'), 500);
      return;
    }

    if (cmd.toLowerCase() === 'siemens lufthaken') {
      output.textContent = 'Siemens Lufthaken out of stock. Try again next year.';
      pushAndScroll(output);
      return;
    }

    if (command === '42') {
      output.textContent = 'The Answer to the Ultimate Question of Life, the Universe, and Everything.';
      pushAndScroll(output);
      return;
    }

    if (command === 'rm' && cmd.includes('-rf')) {
      output.className = 'cli-output cli-error';
      output.textContent = 'Error: This is a read-only filesystem. Nice try though.';
      pushAndScroll(output);
      return;
    }

    if (command === ':wq' || command === ':wq!') {
      output.textContent = 'This isn\'t vim... or is it? 🤔';
      pushAndScroll(output);
      return;
    }

    if (command === 'exit' || command === 'quit') {
      output.textContent = 'There is no escape. You\'re here forever. 😈';
      pushAndScroll(output);
      return;
    }

    if (command === 'teapot') {
      output.textContent = 'HTTP 418: I\'m a teapot ☕\n\nShort and stout.';
      pushAndScroll(output);
      return;
    }

    // Placeholder song outputs (you will paste lyrics here later)
    if (cmd.toLowerCase() === 'banküberfall' || cmd.toLowerCase() === 'ba ba banküberfall') {
      output.innerHTML = `<pre>
Der Kühlschrank ist leer, das Sparschwein auch,
ich habe seit Wochen kein Schnitzel mehr im Bauch.
Der letzte Scheck ist weg, ich bin nicht liquid,
auf der Bank krieg‘ ich sowieso keinen Kredit!

Gestern enterbt mich auch noch meine Mutter
und vor der Tür steht der Exekutor.
Mit einem Wort: Die Lage ist fatal.
Da hilft nur eins: ein Banküberfall!

Ref:
Ba-Ba-Banküberfall … Ba-Ba-Banküberfall …
Ba-Ba-Banküberfall …
Das Böse ist immer und überall!
Ba-Ba-Banküberfall … Ba-Ba-Banküberfall …
Ba-Ba-Banküberfall …
Das Böse ist immer und überall!


Auf meinem Kopf einen Strumpf von Palmers
steh ich vor der Bank und sage: „Überfall ma’s!“
Mit dem Finger im Mantel, statt einer Puff’n.
Ich kann kein Blut sehen, darum muß ich bluff’n!

Ich schrei‘: „Hände hoch! Das ist ein Überfall!
Und seid ihr nicht willig, dann gibt’s an Krawall!“
Eine Oma dreht sich um und sagt: „Junger Mann!
Stell’n Sie sich gefälligst hinten an!“

Ref:
Ba-Ba-Banküberfall … Ba-Ba-Banküberfall …
Ba-Ba-Banküberfall …
Das Böse ist immer und überall!
Ba-Ba-Banküberfall … Ba-Ba-Banküberfall …
Ba-Ba-Banküberfall …
A-Ba-A-Ba-A-Banküberfall!


Nach einer halben Stund‘ bin ich endlich an der Reih‘,
mein Finger ist schon steif von der blöden Warterei.
Ich sag‘: „Jetzt oder nie, her mit der Marie!“
Der Kassier schaut mich an, und fragt: „Was haben Sie?“

Ich sag‘: „An Hunger und an Durst und keinen Plärrer,
ich bin der böse Kassenentleerer!“
Der Kassierer sagt „Nein! Was fällt Ihnen ein?“
„Na, gut“ sage ich, „dann zahl‘ ich halt ‚was ein!“

Ref:
Ba-Ba-Banküberfall … Ba-Ba-Banküberfall …
Ba-Ba-Banküberfall …
Das Böse ist immer und überall!
Ba-Ba-Banküberfall … Ba-Ba-Banküberfall …
Ba-Ba-Banküberfall …
A-Bu-Bi-Ba-Bu-Bu-Ba-Bu!
Ba-Ba-Banküberfall … Ba-Ba-Banküberfall …
Ba-Ba-Banküberfall …
Das Böse ist immer und überall!
Ba-Ba-Banküberfall … Ba-Ba-Banküberfall …
Ba-Ba-Banküberfall …
A-Bu-Bi-Ba-Bu-Bu-Ba-Bu!
Ba-Ba-Banküberfall … Ba-Ba-Banküberfall …
Ba-Ba-Banküberfall …
The Evil is always and everywhere!
Ba-Ba-Bankrobbery … Ba-Ba-Bankrobbery,
Ba-Ba-Bankrobbery, Ba-B-Bankrobbery,
A-Bu-Bi-Ba-Bu-Bu-Ba-Bu! Bankrobbery
Ba-Ba-Banküberfall … Ba-Ba-Banküberfall …
Ba-Ba-Banküberfall …
A-Bu-Bi-Ba-Bu-Bu-Ba-Bu!
Ba-Ba-Banküberfall … Ba-Ba-Banküberfall …</pre>`;
      pushAndScroll(output);
      return;
    }

    if (['da hofa woas', 'der hofer wars', 'da hofa'].includes(cmd.toLowerCase())) {
      output.innerHTML = `<pre>
[Strophe 1]
Schau, da liegt a Leich im Rinnsal, 's Bluat rinnt in Kanäu
Hearst, des is makaber, do liegt jo a Kadaver
Wer is 'n des, kennst du den?
Bei den zerschnittanen Gsicht kaun i des net sehn

[Refrain]
Da Hofa woas vom Zwanzger-Haus
Der schaut ma so verdächtig aus
Da Hofa hat an Anfoi kriagt
Und hot de Leich do massakriert

[Strophe 2]
Do geht a Raunen durch die Leit
Und a jeder hot sei Freid
Da Hofa woas, da Sündenbock
Da Hofa, den wos kana mog
Und da Haufen bewegt se fiere
Hin zum Hofa seiner Türe
Da schrein die Leit: „Kumm aussa, Mörder!“
Aus is heit
Geh, moch auf de Tür, heit is aus mit dir
Weil für dei Verbrechen muasst jetzt zoihn
Geh, kumm ausse do, mir drahn da d' Gurgel oh
Weil du host kane Freind, de da d' Stangen hoitn
Meichelmörder, Leitschinder, de Justiz wor heite gschwinder
Als was d' glaubst
Also, Hofa, kumman s' raus
You might also like
us.
Gracie Abrams
I Love You, I’m Sorry
Gracie Abrams
Taste
Sabrina Carpenter
[Strophe 3]
Und se pumpern an de Tür
Und se mochn an Krawäu als wia
Und sie tretadn se a glott ei
Tat de Hausmasterin net sei
De sogt: „Wos is 'n, meine Herrn?
Tuats ma doch den Hausfrieden ned stören
Denn eines weiß ich ganz gewiss
Dass de Leich da Hofa is“
</pre>`;
      pushAndScroll(output);
      return;
    }

    if (command === 'meep') {
      output.textContent = 'meep';
      pushAndScroll(output);
      return;
    }

    // Navigation quick commands - move view to section
    if (['discord', 'steam', 'github', 'itch', 'weather', 'nasa', 'news', 'hackernews'].includes(command)) {
      const targetId = command === 'news' || command === 'hackernews' ? 'hackernews-mount' : `${command}-mount`;
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // ---------- Normal commands ----------
    switch (command) {
      case 'help': {
        const visitorId = localStorage.getItem('visitor-id') ||
          Math.random().toString(36).substr(2, 8).toUpperCase();
        localStorage.setItem('visitor-id', visitorId);

        output.innerHTML = `Available commands:

help            - Show this help message
clear           - Clear visible terminal output
clear-history   - Clear stored command history
status          - Show system status
visitor         - Show visitor statistics
theme [color]   - Change theme (amber/green/white/blue/magenta) or 'theme custom #hexcode'
restart         - Restart terminal
history         - Show command history
time            - Show current time
uptime          - Show session uptime
memory          - Show memory usage (best-effort)
network         - Show network status (best-effort)
ip              - Show your public IP
whoami          - Show device/platform info (best-effort)
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
glitch          - Trigger screen glitch (visual)
meep            - Echo 'meep'
opacity [0-100] - Set terminal background opacity percentage`;
        pushAndScroll(output);
        return;
      }

      case 'clear':
        history.innerHTML = '';
        return;

      case 'clear-history':
        if (typeof commandHistory !== 'undefined') {
          commandHistory = [];
          localStorage.setItem('cli-history', JSON.stringify([]));
        }
        history.innerHTML = '';
        output.textContent = 'History erased.';
        pushAndScroll(output);
        return;

      case 'status': {
        output.innerHTML = `SYSTEM STATUS: OPERATIONAL

Platform: ${navigator.platform || 'Unknown'}
User Agent: ${navigator.userAgent ? navigator.userAgent.substring(0, 60) + '...' : 'Unknown'}
Language: ${navigator.language || 'Unknown'}
Online: ${navigator.onLine ? 'Yes' : 'No'}
Total Visits: ${visitorData.totalVisits || 'Unknown'}`;
        pushAndScroll(output);
        return;
      }

      case 'visitor': {
        const firstVisitDate = new Date(visitorData.firstVisit);
        const daysSince = Math.floor((Date.now() - firstVisitDate.getTime()) / (1000 * 60 * 60 * 24));
        const visitorId = localStorage.getItem('visitor-id') || Math.random().toString(36).substr(2, 8).toUpperCase();

        output.innerHTML = `VISITOR STATISTICS

Visitor ID: #${visitorId}
Total Visits: ${visitorData.totalVisits}
First Visit: ${firstVisitDate.toLocaleDateString()}
Days Active: ${daysSince}
User Agent: ${navigator.userAgent ? navigator.userAgent.substring(0, 50) + '...' : 'Unknown'}
Screen: ${window.screen.width}x${window.screen.height}
Viewport: ${window.innerWidth}x${window.innerHeight}
Connection: ${navigator.onLine ? 'ONLINE' : 'OFFLINE'}`;
        pushAndScroll(output);
        return;
      }

      case 'theme': {
        if (parts[1]) {
          if (parts[1] === 'custom' && parts[2] && parts[2].match(/^#[0-9A-Fa-f]{6}$/)) {
            applyCustomTheme(parts[2]);
            window.updateTerrainColor(parts[2]);
            output.textContent = 'Custom theme applied: ' + parts[2];
          } else {
            const themes = ['amber', 'green', 'white', 'blue', 'magenta'];
            if (themes.includes(parts[1])) {
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
        pushAndScroll(output);
        return;
      }

      case 'restart':
        output.textContent = 'Restarting terminal...';
        pushAndScroll(output);
        setTimeout(() => location.reload(), 900);
        return;

      case 'history':
        if (Array.isArray(commandHistory)) {
          output.innerHTML = commandHistory.map((c, i) => `${i + 1}  ${c}`).join('\n') || 'No history.';
        } else {
          output.textContent = 'No history.';
        }
        pushAndScroll(output);
        return;

      case 'time':
        output.textContent = new Date().toLocaleString();
        pushAndScroll(output);
        return;

      case 'uptime': {
        const uptime = Math.floor(performance.now() / 1000);
        const minutes = Math.floor(uptime / 60);
        const seconds = uptime % 60;
        output.textContent = `Session uptime: ${minutes}m ${seconds}s`;
        pushAndScroll(output);
        return;
      }

      case 'joke':
        fetch('https://official-joke-api.appspot.com/random_joke')
          .then(r => r.json())
          .then(j => {
            output.textContent = `${j.setup}\n\n${j.punchline}`;
            pushAndScroll(output);
          })
          .catch(() => {
            output.textContent = 'Failed to fetch joke. Try again later.';
            pushAndScroll(output);
          });
        return;

      case 'quote':
        fetch('https://zenquotes.io/api/random')
          .then(r => { if (!r.ok) throw new Error(); return r.json(); })
          .then(q => {
            const quote = q[0];
            output.textContent = `"${quote.q}"\n\n— ${quote.a}`;
            pushAndScroll(output);
          })
          .catch(() => {
            output.textContent = 'Quote service unavailable.';
            pushAndScroll(output);
          });
        return;

      case 'dream':
        if (args) {
          dreamJournal.push({ date: new Date().toISOString(), text: args });
          localStorage.setItem('dream-journal', JSON.stringify(dreamJournal));
          output.textContent = `Dream saved. Total dreams: ${dreamJournal.length}`;
        } else {
          output.className = 'cli-output cli-error';
          output.textContent = 'Usage: dream [your dream text]';
        }
        pushAndScroll(output);
        return;

      case 'dreams':
        if (!dreamJournal.length) {
          output.textContent = 'No dreams saved yet. Use: dream [text]';
        } else {
          output.innerHTML = dreamJournal.map((d, i) => `${i + 1}. [${new Date(d.date).toLocaleDateString()}] ${d.text}`).join('\n\n');
        }
        pushAndScroll(output);
        return;

      case 'ip':
        fetch('https://api.ipify.org?format=json')
          .then(r => r.json())
          .then(data => {
            output.textContent = `Your IP Address: ${data.ip}`;
            pushAndScroll(output);
          })
          .catch(() => {
            output.textContent = 'Failed to fetch IP address.';
            pushAndScroll(output);
          });
        return;

      case 'whoami': {
        // Browsers cannot access machine hostname — provide best-available info
        const platform = navigator.platform || 'Unknown';
        const ua = navigator.userAgent || 'Unknown';
        output.innerHTML = `DEVICE INFO

Device (platform): ${platform}
User Agent: ${ua}
Language: ${navigator.language || 'Unknown'}
Cores: ${navigator.hardwareConcurrency || 'Unknown'}`;
        pushAndScroll(output);
        return;
      }

      case 'memory': {
        if (performance && performance.memory) {
          const usedMB = (performance.memory.usedJSHeapSize / 1048576).toFixed(1);
          const limitMB = (performance.memory.jsHeapSizeLimit / 1048576).toFixed(1);
          output.innerHTML = `MEMORY USAGE

Used: ${usedMB} MB
Limit: ${limitMB} MB
Runtime: JavaScript Heap`;
        } else if (navigator.deviceMemory) {
          output.innerHTML = `MEMORY (approx.)

Total (device): ${navigator.deviceMemory} GB

Note: Precise JS heap metrics are not available in this browser.`;
        } else {
          output.textContent = 'Memory statistics unavailable in this browser.';
        }
        pushAndScroll(output);
        return;
      }

      case 'network': {
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (conn) {
          const downlink = conn.downlink ? `${conn.downlink} Mbps` : 'Unknown';
          const rtt = conn.rtt ? `${conn.rtt} ms` : 'Unknown';
          const type = conn.effectiveType || 'Unknown';
          const saveData = conn.saveData ? 'Enabled' : 'Disabled';
          output.innerHTML = `NETWORK STATUS

Connection: ${navigator.onLine ? 'ONLINE' : 'OFFLINE'}
Type:       ${type}
RTT:        ${rtt}
Downlink:   ${downlink}
Save-Data:  ${saveData}`;
        } else {
          output.textContent = 'Network statistics unavailable.';
        }
        pushAndScroll(output);
        return;
      }

      case 'fortune':
        output.textContent = fortunes[Math.floor(Math.random() * fortunes.length)];
        pushAndScroll(output);
        return;

      case 'quiz':
        currentQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
        prompt.textContent = '>';
        prompt.classList.add('simple');
        output.innerHTML = `${currentQuiz.q}\n\n${currentQuiz.options.map((o, i) => `${i + 1}. ${o}`).join('\n')}\n\nType your answer:`;
        pushAndScroll(output);
        return;

      case 'riddle':
        currentRiddle = riddles[Math.floor(Math.random() * riddles.length)];
        prompt.textContent = '>';
        prompt.classList.add('simple');
        output.textContent = currentRiddle.q;
        pushAndScroll(output);
        return;

      case 'fact':
        output.textContent = facts[Math.floor(Math.random() * facts.length)];
        pushAndScroll(output);
        return;

      case 'challenge':
        output.textContent = 'CODING CHALLENGE:\n\n' + challenges[Math.floor(Math.random() * challenges.length)];
        pushAndScroll(output);
        return;

      case 'animals':
        {
          const animals = Object.values(asciiAnimals);
          output.innerHTML = animals[Math.floor(Math.random() * animals.length)];
          pushAndScroll(output);
        }
        return;

      case 'fish':
        output.innerHTML = asciiAnimals.fish;
        pushAndScroll(output);
        return;

      case 'skull':
        output.innerHTML = asciiAnimals.skull;
        pushAndScroll(output);
        return;

      case 'cowsay': {
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
        pushAndScroll(output);
        return;
      }

      case 'glitch':
        enhancedGlitch();
        output.textContent = 'Reality.exe has encountered an error.';
        pushAndScroll(output);
        return;

      case 'opacity': {
        if (parts[1]) {
          const val = parseInt(parts[1]);
          if (!isNaN(val) && val >= 0 && val <= 100) {
            const terminalOpacity = val / 100;
            document.documentElement.style.setProperty('--terminal-opacity', terminalOpacity);
            localStorage.setItem('terminal-opacity', String(val));
            output.textContent = `Terminal opacity set to ${val}%`;
          } else {
            output.className = 'cli-output cli-error';
            output.textContent = 'Usage: opacity [0-100]';
          }
        } else {
          const stored = localStorage.getItem('terminal-opacity');
          const display = stored ? `${stored}%` : `${Math.round((getComputedStyle(document.documentElement).getPropertyValue('--terminal-opacity') || 1) * 100)}%`;
          output.textContent = `Current opacity: ${display}`;
        }
        pushAndScroll(output);
        return;
      }

      default:
        output.className = 'cli-output cli-error';
        output.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
        pushAndScroll(output);
        return;
    }
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