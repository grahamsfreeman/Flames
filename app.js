// 1. LIVE SYSTEM CLOCK
function startClock() {
    const clock = document.getElementById('system-clock');
    if (clock) {
        const update = () => {
            const now = new Date();
            clock.innerText = now.toLocaleTimeString([], { hour12: false });
        };
        setInterval(update, 1000);
        update();
    }
}

// 2. WINDOW VISIBILITY CONTROL
function openWindow(id) {
    const win = document.getElementById(`window-${id}`);
    if (win) {
        win.classList.remove('hidden');
        if (id === 'terminal') document.getElementById('terminal-input').focus();
    }
}

function closeWindow(id) {
    const win = document.getElementById(`window-${id}`);
    if (win) win.classList.add('hidden');
}

// 3. COMMAND ENGINE DICTIONARY
const COMMAND_REGISTRY = {
    help: "Available commands:<br>  <span class='text-emerald-400'>about</span>    - Display developer bio<br>  <span class='text-emerald-400'>skills</span>   - List core engineering stack<br>  <span class='text-emerald-400'>projects</span> - View active project repositories<br>  <span class='text-emerald-400'>clear</span>    - Wipe screen buffer",
    about: "Senior Web Architecture specialist. Focused on building low-latency, highly micro-interactive applications with uncompromising performance standards.",
    skills: "Languages  :: JavaScript (ES6+), TypeScript, Rust<br>Frameworks :: React, Next.js, TailwindCSS<br>Environments:: Node.js, Cloudflare Workers, Git",
    projects: "Initializing project matrix... Run 'open projects' or click the desktop folder icon to deploy the graphics display module."
};

// 4. TERMINAL SHELL EXECUTION
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const body = document.getElementById('terminal-body');

    if (!input || !body) return;

    // Focus input on console click
    body.addEventListener('click', () => input.focus());

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawValue = input.value;
            const cleanValue = rawValue.trim().toLowerCase();
            input.value = ''; // Reset core input line

            if (!cleanValue) return;

            // Generate Input History Echo
            const echoRow = document.createElement('div');
            echoRow.className = 'flex items-center gap-2 text-slate-400 opacity-80';
            echoRow.innerHTML = `<span class='text-emerald-500 font-bold'>~$</span> <span>${rawValue}</span>`;
            input.parentElement.before(echoRow);

            // Generate System Response Wrapper
            const responseRow = document.createElement('div');
            responseRow.className = 'pl-4 text-slate-300 py-0.5 leading-relaxed';

            if (cleanValue === 'clear') {
                // Clear out everything except the last active input line container
                const blocks = body.querySelectorAll('div:not(:last-child)');
                blocks.forEach(b => b.remove());
                return;
            } else if (COMMAND_REGISTRY[cleanValue]) {
                responseRow.innerHTML = COMMAND_REGISTRY[cleanValue];
            } else {
                responseRow.innerHTML = `Unknown executable command: <span class='text-rose-400'>'${cleanValue}'</span>. Run <span class='text-emerald-400'>'help'</span> for instructions.`;
            }

            input.parentElement.before(responseRow);
            body.scrollTop = body.scrollHeight; // Keep scrolling locked down
        }
    });
}

// RUNTIME INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    startClock();
    initTerminal();
    openWindow('terminal'); // Boot with console open for immediate engagement
});
  
