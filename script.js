/**
 * KEYBOARD QUEST - Vanilla JS Engine
 * Built for Youth Center Computer Classes
 */

// --- 1. GAME DATA STRUCTURES & DEFINITIONS ---

const RANKS = [
    { title: "Keyboard Explorer", icon: "🟢", minXP: 0 },
    { title: "Key Hunter", icon: "🔵", minXP: 100 },
    { title: "Letter Learner", icon: "🟡", minXP: 250 },
    { title: "Word Builder", icon: "🟠", minXP: 450 },
    { title: "Keyboard Champion", icon: "🔴", minXP: 700 },
    { title: "Keyboard Master", icon: "🏆", minXP: 1000 }
];

const BADGES = [
    { id: "first_mission", title: "First Mission", icon: "🏅", desc: "Completed your first challenge." },
    { id: "home_row_hero", title: "Home Row Hero", icon: "⌨️", desc: "Mastered the home row keys!" },
    { id: "top_row_typer", title: "Top Row Typer", icon: "🔤", desc: "Found all top row letters." },
    { id: "bottom_row_buddy", title: "Bottom Row Buddy", icon: "🔡", desc: "Found all bottom row letters." },
    { id: "number_navigator", title: "Number Navigator", icon: "🔢", desc: "Found all number keys." },
    { id: "special_keys", title: "Special Keys", icon: "⭐", desc: "Learned the special keys." },
    { id: "word_builder", title: "Word Builder", icon: "📝", desc: "Typed your first words." },
    { id: "kb_master", title: "Keyboard Master", icon: "🏆", desc: "Completed all levels!" }
];

const KEYBOARD_LAYOUT = [
    ["Esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
    ["Ctrl", "Win", "Alt", "Space", "Alt", "Win", "Ctrl"]
];

const KEY_DESCRIPTIONS = {
    "Space": { name: "Spacebar", code: "Space", desc: "Inserts a space between words.", shortcut: "None" },
    "Enter": { name: "Enter Key", code: "Enter", desc: "Executes a command or moves to a new line.", shortcut: "Alt + Enter (Properties)" },
    "Backspace": { name: "Backspace", code: "Backspace", desc: "Deletes character to the left of cursor.", shortcut: "None" },
    "Tab": { name: "Tab Key", code: "Tab", desc: "Moves cursor to next focus area or indents text.", shortcut: "Alt + Tab (Switch App)" },
    "Caps Lock": { name: "Caps Lock", code: "CapsLock", desc: "Locks key entry to UPPERCASE letters.", shortcut: "None" },
    "Shift": { name: "Shift Key", code: "ShiftLeft / ShiftRight", desc: "Capitalizes letters or accesses upper key symbols.", shortcut: "Shift + Delete (Permanent Delete)" },
    "Ctrl": { name: "Control Key", code: "ControlLeft", desc: "Used in combination shortcuts.", shortcut: "Ctrl + C (Copy), Ctrl + V (Paste)" },
    "Win": { name: "Windows Key", code: "MetaLeft", desc: "Opens the Windows Start Menu.", shortcut: "Win + D (Show Desktop), Win + E (Explorer)" },
    "Alt": { name: "Alternate Key", code: "AltLeft", desc: "Used in combination key commands.", shortcut: "Alt + Tab (Switch Windows)" }
};

let LEVEL_CHALLENGES = [
    // LEVEL 1: HOME ROW HEROES - A, S, D, F, G, H, J, K, L + Space
    { id: "l1_a", level: 1, type: "key-finder", question: "Find the letter A!", answer: "A", hint: "It is the first letter on the home row.", xp: 10 },
    { id: "l1_s", level: 1, type: "key-finder", question: "Find the letter S!", answer: "S", hint: "It is next to A.", xp: 10 },
    { id: "l1_d", level: 1, type: "key-finder", question: "Find the letter D!", answer: "D", hint: "It is next to S.", xp: 10 },
    { id: "l1_f", level: 1, type: "key-finder", question: "Find the letter F!", answer: "F", hint: "It is near the middle of the home row.", xp: 10 },
    { id: "l1_g", level: 1, type: "key-finder", question: "Find the letter G!", answer: "G", hint: "Look between F and H.", xp: 10 },
    { id: "l1_h", level: 1, type: "key-finder", question: "Find the letter H!", answer: "H", hint: "It is next to G.", xp: 10 },
    { id: "l1_j", level: 1, type: "key-finder", question: "Find the letter J!", answer: "J", hint: "Look to the right of H.", xp: 10 },
    { id: "l1_k", level: 1, type: "key-finder", question: "Find the letter K!", answer: "K", hint: "Look next to J.", xp: 10 },
    { id: "l1_l", level: 1, type: "key-finder", question: "Find the letter L!", answer: "L", hint: "It is next to K.", xp: 10 },
    { id: "l1_space", level: 1, type: "key-finder", question: "Find the Spacebar!", answer: "Space", hint: "It is the longest key at the bottom.", xp: 10 },

    // LEVEL 2: TOP ROW TEAM - Q, W, E, R, T, Y, U, I, O, P
    { id: "l2_q", level: 2, type: "key-finder", question: "Find the letter Q!", answer: "Q", hint: "It is the first letter on the top row.", xp: 15 },
    { id: "l2_w", level: 2, type: "key-finder", question: "Find the letter W!", answer: "W", hint: "Look next to Q.", xp: 15 },
    { id: "l2_e", level: 2, type: "key-finder", question: "Find the letter E!", answer: "E", hint: "It is between W and R.", xp: 15 },
    { id: "l2_r", level: 2, type: "key-finder", question: "Find the letter R!", answer: "R", hint: "Look after E.", xp: 15 },
    { id: "l2_t", level: 2, type: "key-finder", question: "Find the letter T!", answer: "T", hint: "It is after R.", xp: 15 },
    { id: "l2_y", level: 2, type: "key-finder", question: "Find the letter Y!", answer: "Y", hint: "Look after T.", xp: 15 },
    { id: "l2_u", level: 2, type: "key-finder", question: "Find the letter U!", answer: "U", hint: "It is after Y.", xp: 15 },
    { id: "l2_i", level: 2, type: "key-finder", question: "Find the letter I!", answer: "I", hint: "Look after U.", xp: 15 },
    { id: "l2_o", level: 2, type: "key-finder", question: "Find the letter O!", answer: "O", hint: "Look after I.", xp: 15 },
    { id: "l2_p", level: 2, type: "key-finder", question: "Find the letter P!", answer: "P", hint: "It is near the right end of the top row.", xp: 15 },

    // LEVEL 3: BOTTOM ROW BUDDIES - Z, X, C, V, B, N, M
    { id: "l3_z", level: 3, type: "key-finder", question: "Find the letter Z!", answer: "Z", hint: "It starts the bottom letter row.", xp: 15 },
    { id: "l3_x", level: 3, type: "key-finder", question: "Find the letter X!", answer: "X", hint: "Look next to Z.", xp: 15 },
    { id: "l3_c", level: 3, type: "key-finder", question: "Find the letter C!", answer: "C", hint: "Look after X.", xp: 15 },
    { id: "l3_v", level: 3, type: "key-finder", question: "Find the letter V!", answer: "V", hint: "Look after C.", xp: 15 },
    { id: "l3_b", level: 3, type: "key-finder", question: "Find the letter B!", answer: "B", hint: "It is near the middle of the bottom row.", xp: 15 },
    { id: "l3_n", level: 3, type: "key-finder", question: "Find the letter N!", answer: "N", hint: "It is next to B.", xp: 15 },
    { id: "l3_m", level: 3, type: "key-finder", question: "Find the letter M!", answer: "M", hint: "It is at the end of the bottom row.", xp: 15 },

    // LEVEL 4: NUMBER NAVIGATORS - 1, 2, 3, 4, 5, 6, 7, 8, 9, 0
    { id: "l4_1", level: 4, type: "key-finder", question: "Find number 1!", answer: "1", hint: "Look at the top number row.", xp: 15 },
    { id: "l4_2", level: 4, type: "key-finder", question: "Find number 2!", answer: "2", hint: "It is next to 1.", xp: 15 },
    { id: "l4_3", level: 4, type: "key-finder", question: "Find number 3!", answer: "3", hint: "It is next to 2.", xp: 15 },
    { id: "l4_4", level: 4, type: "key-finder", question: "Find number 4!", answer: "4", hint: "It is after 3.", xp: 15 },
    { id: "l4_5", level: 4, type: "key-finder", question: "Find number 5!", answer: "5", hint: "It is near the middle of the number row.", xp: 15 },
    { id: "l4_6", level: 4, type: "key-finder", question: "Find number 6!", answer: "6", hint: "It is after 5.", xp: 15 },
    { id: "l4_7", level: 4, type: "key-finder", question: "Find number 7!", answer: "7", hint: "Look at the top number row.", xp: 15 },
    { id: "l4_8", level: 4, type: "key-finder", question: "Find number 8!", answer: "8", hint: "It is after 7.", xp: 15 },
    { id: "l4_9", level: 4, type: "key-finder", question: "Find number 9!", answer: "9", hint: "It is near the right side of the number row.", xp: 15 },
    { id: "l4_0", level: 4, type: "key-finder", question: "Find number 0!", answer: "0", hint: "It comes after 9.", xp: 15 },

    // LEVEL 5: SPECIAL KEYS - Space, Enter, Backspace, Shift, Caps Lock, Tab
    { id: "l5_space", level: 5, type: "key-finder", question: "Find the Spacebar!", answer: "Space", hint: "It is the longest key at the bottom.", xp: 15 },
    { id: "l5_enter", level: 5, type: "key-finder", question: "Find the Enter Key!", answer: "Enter", hint: "Look on the right side of the letter keys.", xp: 15 },
    { id: "l5_backspace", level: 5, type: "key-finder", question: "Find the Backspace Key!", answer: "Backspace", hint: "It is near the top-right of the main keyboard.", xp: 15 },
    { id: "l5_shift", level: 5, type: "key-finder", question: "Find the Shift Key!", answer: "Shift", hint: "There are Shift keys on both sides of the keyboard.", xp: 15 },
    { id: "l5_caps", level: 5, type: "key-finder", question: "Find Caps Lock!", answer: "Caps Lock", hint: "It is on the left side of the home row.", xp: 15 },
    { id: "l5_tab", level: 5, type: "key-finder", question: "Find the Tab Key!", answer: "Tab", hint: "It is on the left side, above Caps Lock.", xp: 15 },

    // FUN TYPING - simple words and short phrases
    { id: "ty_cat", level: 3, type: "typing", question: "Type this word:", answer: "cat", hint: "Type the word cat.", xp: 20 },
    { id: "ty_dog", level: 3, type: "typing", question: "Type this word:", answer: "dog", hint: "Type the word dog.", xp: 20 },
    { id: "ty_sun", level: 3, type: "typing", question: "Type this word:", answer: "sun", hint: "Type the word sun.", xp: 20 },
    { id: "ty_fun", level: 3, type: "typing", question: "Type this word:", answer: "fun", hint: "Type the word fun.", xp: 20 },
    { id: "ty_play", level: 3, type: "typing", question: "Type this word:", answer: "play", hint: "Type the word play.", xp: 25 },
    { id: "ty_school", level: 3, type: "typing", question: "Type this word:", answer: "school", hint: "Type the word school.", xp: 25 },
    { id: "ty_friend", level: 3, type: "typing", question: "Type this word:", answer: "friend", hint: "Type the word friend.", xp: 25 },
    { id: "ty_hello", level: 3, type: "typing", question: "Type this word:", answer: "hello", hint: "Type the word hello.", xp: 25 },
    { id: "ty_blue", level: 3, type: "typing", question: "Type this word:", answer: "blue", hint: "Type the word blue.", xp: 25 },
    { id: "ty_tree", level: 3, type: "typing", question: "Type this word:", answer: "tree", hint: "Type the word tree.", xp: 25 },
    { id: "ty_i_like", level: 3, type: "typing", question: "Type this phrase:", answer: "I like cats", hint: "Type the phrase I like cats.", xp: 30 },
    { id: "ty_my_cat", level: 3, type: "typing", question: "Type this phrase:", answer: "My cat is fun", hint: "Type the phrase My cat is fun.", xp: 30 },
    { id: "ty_go_play", level: 3, type: "typing", question: "Type this phrase:", answer: "Go play outside", hint: "Type the phrase Go play outside.", xp: 30 },
    { id: "ty_i_read", level: 3, type: "typing", question: "Type this phrase:", answer: "I read books", hint: "Type the phrase I read books.", xp: 30 },
    { id: "ty_the_cat", level: 3, type: "typing", question: "Type this phrase:", answer: "The cat ran fast", hint: "Type the phrase The cat ran fast.", xp: 35 }
];

// --- 2. STATE MANAGEMENT ---

let gameState = {
    studentId: "",
    playerName: "",
    xp: 0,
    level: 1,
    maxUnlockedLevel: 1,
    missionsCompleted: 0,
    badges: [],
    streak: 0,
    bestTypingSpeed: 0,
    completedChallenges: [],
    soundEnabled: true,
    totalAttempts: 0,
    correctAnswers: 0,
    perfectChallenges: 0,
    bestStreak: 0,
    lastLevelPerformance: null
};

let currentActiveLevel = 1;
let currentChallengeIndex = 0;
let currentChallengeList = [];
let hintUsedCurrent = false;
let challengeCompleted = false;
let activeShortcutHandler = null;
let bossTimerInterval = null;
let wrongAttemptsCurrent = 0;
let currentLevelPerfects = 0;
let labKeyDownHandler = null;
let labKeyUpHandler = null;

const BOSS_CONFIG = { hp: 100, damagePerHit: 35, timeLimit: 60 };
const STREAK_XP_MULTIPLIERS = [
    { threshold: 10, multiplier: 2.0 },
    { threshold: 5, multiplier: 1.5 },
    { threshold: 3, multiplier: 1.2 }
];
const TIMING = { successAdvance: 1200, levelCompleteDisplay: 2800, countdownTick: 700 };
const NO_HINT_BONUS_XP = 10;
const BOSS_XP_REWARD = 100;

function normalizeKey(e) {
    if (e.code === "Space" || e.key === " ") return "Space";
    if (e.key === "Control") return "Ctrl";
    if (e.key === "Meta") return "Win";
    return e.key;
}

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// --- 3. AUDIO SYNTHESIZER (WEB AUDIO API) ---

let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playSound(type) {
    if (!gameState.soundEnabled) return;
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === "correct") {
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08); // E5
            osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.16); // G5
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === "wrong") {
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.2);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        } else if (type === "xp") {
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
        } else if (type === "click") {
            osc.frequency.setValueAtTime(300, now);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        } else if (type === "complete") {
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1);
            osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2);
            osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.35);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
        }
    } catch (e) {
        console.error("Audio synth error:", e);
    }
}

// --- CELEBRATION & ENCOURAGEMENT SYSTEM ---
const ENCOURAGEMENTS = {
    high: ["Outstanding! You are becoming a keyboard superstar!", "Amazing work! Your keyboard skills are leveling up fast!", "Fantastic! That was a master-level performance!", "Brilliant! You should be proud of that progress!"],
    medium: ["Great progress! Every mission makes you stronger!", "Nice work! Keep practicing and you'll be even faster!", "You're getting better! One more step toward Keyboard Master!", "Well done! Your hard work is paying off!"],
    growing: ["Good effort! Mistakes are part of learning.", "You did it! Keep practicing and your confidence will grow!", "Nice try! You are learning something new every mission!", "Keep going! Every key you learn is a win!"]
};
function injectCelebrationStyles() {
    if (document.getElementById("keyboard-quest-celebration-styles")) return;
    const style = document.createElement("style"); style.id = "keyboard-quest-celebration-styles";
    style.textContent = `.celebration-stars{font-size:1.7rem;letter-spacing:.15rem;margin:.35rem 0;animation:kqPop .65s ease both}.celebration-encouragement{font-size:1.05rem;font-weight:700;margin:.4rem auto .8rem;max-width:520px}.kq-confetti{position:fixed;width:9px;height:14px;z-index:10000;pointer-events:none;animation:kqFall 1.9s ease-out forwards}.kq-milestone{animation:kqPop .75s cubic-bezier(.2,1.4,.4,1) both}.kq-xp-burst{position:fixed;z-index:10001;pointer-events:none;font-weight:900;font-size:1.25rem;animation:kqXP 1s ease-out forwards}@keyframes kqPop{from{transform:scale(.5);opacity:0}to{transform:scale(1);opacity:1}}@keyframes kqFall{0%{transform:translate3d(0,-20px,0) rotate(0);opacity:1}100%{transform:translate3d(var(--dx),90vh,0) rotate(720deg);opacity:0}}@keyframes kqXP{0%{transform:translate(-50%,0) scale(.8);opacity:0}20%{opacity:1}100%{transform:translate(-50%,-85px) scale(1.25);opacity:0}}@media(prefers-reduced-motion:reduce){.kq-confetti,.kq-xp-burst{animation:none!important;display:none}.celebration-stars,.kq-milestone{animation:none!important}}`;
    document.head.appendChild(style);
}
function celebrateProgress(options={}) {
    injectCelebrationStyles();
    const card=document.querySelector("#level-complete-overlay .level-complete-card");
    if(card){card.classList.remove("kq-milestone");void card.offsetWidth;card.classList.add("kq-milestone")}
    for(let i=0;i<(options.count??24);i++){const p=document.createElement("span");p.className="kq-confetti";p.style.left=`${35+Math.random()*30}%`;p.style.top=`${8+Math.random()*8}%`;p.style.setProperty("--dx",`${(Math.random()-.5)*75}vw`);document.body.appendChild(p);setTimeout(()=>p.remove(),2100)}
    if(options.xp){const b=document.createElement("div");b.className="kq-xp-burst";b.textContent=`+${options.xp} XP`;b.style.left="50%";b.style.top="42%";document.body.appendChild(b);setTimeout(()=>b.remove(),1100)}
}
function getPerformanceMessage(ratio){const a=ratio>=.9?ENCOURAGEMENTS.high:ratio>=.7?ENCOURAGEMENTS.medium:ENCOURAGEMENTS.growing;return a[Math.floor(Math.random()*a.length)]}
function getPerformanceStars(ratio){return ratio>=.95?"⭐⭐⭐":ratio>=.75?"⭐⭐☆":"⭐☆☆"}
function recordAttempt(correct){gameState.totalAttempts=(gameState.totalAttempts||0)+1;if(correct)gameState.correctAnswers=(gameState.correctAnswers||0)+1}

// --- 4. PERSISTENCE (LOCAL STORAGE) ---

const SAVE_VERSION = 1;

function getSaveKey(studentId) {
    return `keyboard_quest_save_${studentId}`;
}

function loadGame() {
    const studentId = gameState.studentId || gameState.playerName || "default";
    const saved = localStorage.getItem(getSaveKey(studentId));
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed.version && parsed.version !== SAVE_VERSION) {
                console.log(`[KeyboardQuest] Migrating save from version ${parsed.version} to ${SAVE_VERSION}`);
            }
            gameState = { ...gameState, ...parsed.data };
            if (!gameState.maxUnlockedLevel) gameState.maxUnlockedLevel = gameState.level || 1;
        } catch (e) {
            console.error("[KeyboardQuest] Failed to parse save game data.", e);
        }
    }
}

function saveGame() {
    try {
        const studentId = gameState.studentId || gameState.playerName || "default";
        const payload = JSON.stringify({ version: SAVE_VERSION, data: gameState });
        if (payload.length > 1024 * 1024) {
            console.warn("[KeyboardQuest] Save data exceeds 1MB, skipping save.");
            return;
        }
        localStorage.setItem(getSaveKey(studentId), payload);
    } catch (e) {
        console.error("[KeyboardQuest] Failed to save game data.", e);
    }
}

function resetProgress() {
    if (confirm("Are you sure? This will erase your Keyboard Quest progress.")) {
        const studentId = gameState.studentId || gameState.playerName || "default";
        localStorage.removeItem(getSaveKey(studentId));
        location.reload();
    }
}

function getAllStudents() {
    const students = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("keyboard_quest_save_")) {
            try {
                const saved = localStorage.getItem(key);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    const data = parsed.data || {};
                    students.push({
                        studentId: data.studentId || data.playerName || key.replace("keyboard_quest_save_", ""),
                        playerName: data.playerName || "Unknown",
                        xp: data.xp || 0,
                        level: data.level || 1,
                        maxUnlockedLevel: data.maxUnlockedLevel || 1,
                        missionsCompleted: data.missionsCompleted || 0,
                        badges: data.badges || [],
                        bestTypingSpeed: data.bestTypingSpeed || 0,
                        streak: data.streak || 0,
                        bestStreak: data.bestStreak || 0,
                        totalAttempts: data.totalAttempts || 0,
                        correctAnswers: data.correctAnswers || 0,
                        lastPlayed: new Date().toLocaleString()
                    });
                }
            } catch (e) {
                console.warn("[KeyboardQuest] Failed to parse student data:", key, e);
            }
        }
    }
    return students.sort((a, b) => b.xp - a.xp);
}

// --- 5. PROGRESS & XP SYSTEM ---

function addXP(amount) {
    const previousXP = gameState.xp;
    let finalAmount = amount;
    for (const { threshold, multiplier } of STREAK_XP_MULTIPLIERS) {
        if (gameState.streak >= threshold) {
            finalAmount = Math.round(amount * multiplier);
            break;
        }
    }

    gameState.xp += finalAmount;
    showToast(`+${finalAmount} XP Earned!`);
    playSound("xp");
    checkRankUp(previousXP);
    if (finalAmount >= 20) celebrateProgress({xp: finalAmount, count: 10});
    saveGame();
    updateHUD();
    return finalAmount;
}

function checkRankUp(previousXP = 0) {
    const reached = [...RANKS].reverse().find(r => gameState.xp >= r.minXP);
    const previous = [...RANKS].reverse().find(r => previousXP >= r.minXP);
    if (reached && (!previous || reached.minXP > previous.minXP)) {
        showToast(`🎉 RANK UP! You are now a ${reached.title}!`); playSound("complete"); celebrateProgress({count:32});
    }
}

function getCurrentRankObj() {
    for (let i = RANKS.length - 1; i >= 0; i--) {
        if (gameState.xp >= RANKS[i].minXP) return RANKS[i];
    }
    return RANKS[0];
}

function unlockBadge(badgeId) {
    if (!gameState.badges.includes(badgeId)) {
        gameState.badges.push(badgeId);
        const b = BADGES.find(item => item.id === badgeId);
        if (b) {
            showToast(`🏆 Badge Unlocked: ${b.title}!`, "badge-toast");
        }
        saveGame();
        return true;
    }
    return false;
}

// --- 6. RENDER VIRTUAL KEYBOARDS ---

function renderVirtualKeyboard(containerId, clickCallback, targetKey) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    KEYBOARD_LAYOUT.forEach(row => {
        const rowEl = document.createElement("div");
        rowEl.className = "key-row";

        row.forEach(keyLabel => {
            const keyEl = document.createElement("button");
            keyEl.className = "key";
            keyEl.textContent = keyLabel;
            keyEl.dataset.key = keyLabel.toUpperCase();

            if (["Backspace", "Enter", "Caps Lock"].includes(keyLabel)) keyEl.classList.add("special", "wide");
            if (["Shift", "Ctrl", "Alt", "Tab"].includes(keyLabel)) keyEl.classList.add("special");
            if (keyLabel === "Space") keyEl.classList.add("space");
            if (targetKey && keyLabel.toUpperCase() === targetKey.toUpperCase()) keyEl.classList.add("target-practice");

            keyEl.addEventListener("click", () => {
                playSound("click");
                setPhysicalModeIndicator(false);
                if (clickCallback) clickCallback(keyLabel);
            });

            rowEl.appendChild(keyEl);
        });

        container.appendChild(rowEl);
    });
}

function setPhysicalModeIndicator(isPhysical) {
    const el = document.getElementById("input-mode-indicator");
    if (!el) return;
    if (isPhysical) {
        el.textContent = "⌨️ Physical Keyboard Active";
        el.style.color = "var(--secondary)";
    } else {
        el.textContent = "🖱️ Virtual Keyboard Active";
        el.style.color = "var(--accent)";
    }
}

// --- 7. UI ROUTING & HUD UPDATE ---

function navigateTo(viewId) {
    cleanupLabListeners();
    const target = document.getElementById(viewId);
    if (!target) {
        console.error(`[KeyboardQuest] View not found: ${viewId}`);
        return;
    }
    document.querySelectorAll(".view").forEach(v => v.classList.add("hidden"));
    target.classList.remove("hidden");
    updateHUD();
}

function updateHUD() {
    const rank = getCurrentRankObj();
    document.getElementById("hud-rank").textContent = `${rank.icon} ${rank.title}`;
    document.getElementById("hud-name").textContent = gameState.playerName || "Agent";
    document.getElementById("hud-xp").textContent = `${gameState.xp} XP`;
    document.getElementById("hud-streak").textContent = gameState.streak;

    // Mini bar calculation
    const nextRankIndex = RANKS.findIndex(r => r.title === rank.title) + 1;
    let percent = 100;
    if (nextRankIndex < RANKS.length) {
        const currentMin = rank.minXP;
        const nextMin = RANKS[nextRankIndex].minXP;
        percent = Math.min(100, Math.max(0, ((gameState.xp - currentMin) / (nextMin - currentMin)) * 100));
    }
    document.getElementById("hud-xp-fill").style.width = `${percent}%`;

    // Dashboard values
    document.getElementById("dash-rank-icon").textContent = rank.icon;
    document.getElementById("dash-player-name").textContent = gameState.playerName || "Agent";
    document.getElementById("dash-rank-title").textContent = rank.title;
    document.getElementById("dash-xp-text").textContent = `${gameState.xp} XP`;
    document.getElementById("dash-xp-bar").style.width = `${percent}%`;
    document.getElementById("dash-stat-missions").textContent = gameState.missionsCompleted;
    document.getElementById("dash-stat-badges").textContent = gameState.badges.length;
    document.getElementById("dash-stat-wpm").textContent = `${gameState.bestTypingSpeed} WPM`;

    // Progress View values
    document.getElementById("prog-name").textContent = gameState.playerName;
    document.getElementById("prog-rank").textContent = rank.title;
    document.getElementById("prog-xp").textContent = `${gameState.xp} XP`;
    document.getElementById("prog-next-xp").textContent = `${nextRankIndex < RANKS.length ? RANKS[nextRankIndex].minXP : 'MAX'} XP`;
    document.getElementById("prog-completed").textContent = gameState.missionsCompleted;
    document.getElementById("prog-wpm").textContent = `${gameState.bestTypingSpeed} WPM`;
    document.getElementById("prog-streak").textContent = gameState.streak;

    updateLevelTabs();
    renderBadges();
}

function updateLevelTabs() {
    document.querySelectorAll(".tab-btn").forEach(btn => {
        const level = parseInt(btn.dataset.level);
        if (level <= gameState.maxUnlockedLevel) {
            btn.classList.remove("locked");
            let levelTitle = `L${level}`;
            if (level === 1) levelTitle = "L1: Home Row";
            if (level === 2) levelTitle = "L2: Top Row";
            if (level === 3) levelTitle = "L3: Bottom Row";
            if (level === 4) levelTitle = "L4: Numbers";
            if (level === 5) levelTitle = "L5: Special Keys";
            if (level === 6) levelTitle = "👑 Final Challenge";
            btn.textContent = levelTitle;
        } else {
            btn.classList.add("locked");
            btn.textContent = `🔒 L${level}`;
        }
    });
}

function showFacilitatorDashboard() {
    navigateTo("view-facilitator");
    renderFacilitatorDashboard();
}

function renderFacilitatorDashboard() {
    const students = getAllStudents();
    const tbody = document.getElementById("students-table-body");
    const countEl = document.getElementById("fac-student-count");
    
    if (!tbody) return;
    
    if (countEl) {
        countEl.textContent = `${students.length} student${students.length !== 1 ? 's' : ''}`;
    }
    
    if (students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="empty-state">No student data found yet. Students need to play the game first.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = students.map((student, index) => {
        const accuracy = student.totalAttempts > 0 
            ? Math.round((student.correctAnswers / student.totalAttempts) * 100) 
            : 0;
        const rank = getCurrentRankObj(student.xp);
        
        return `<tr>
            <td><strong>${escapeHtml(student.playerName)}</strong></td>
            <td>${rank.icon} ${rank.title}</td>
            <td><strong>${student.xp}</strong></td>
            <td>${student.missionsCompleted}</td>
            <td>${student.badges.length} / ${BADGES.length}</td>
            <td>${student.bestTypingSpeed} WPM</td>
            <td>${student.streak} 🔥</td>
            <td>${accuracy}%</td>
            <td>
                <button class="btn-small btn-view" onclick="viewStudentProgress('${escapeHtml(student.studentId)}')">View</button>
                <button class="btn-small btn-reset" onclick="resetStudentProgress('${escapeHtml(student.studentId)}')">Reset</button>
            </td>
        </tr>`;
    }).join("");
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function viewStudentProgress(studentId) {
    if (confirm(`View progress for ${studentId}? This will load their data.`)) {
        gameState.studentId = studentId;
        gameState.playerName = studentId;
        loadGame();
        navigateTo("view-progress");
        updateHUD();
        showToast(`📊 Viewing ${studentId}'s progress`);
    }
}

function resetStudentProgress(studentId) {
    if (confirm(`Are you sure you want to reset ALL progress for ${studentId}?`)) {
        localStorage.removeItem(getSaveKey(studentId));
        renderFacilitatorDashboard();
        showToast(`🗑️ Reset progress for ${studentId}`);
    }
}

function exportAllProgress() {
    const students = getAllStudents();
    if (students.length === 0) {
        showToast("⚠️ No student data to export");
        return;
    }
    
    const exportData = {
        exportedAt: new Date().toISOString(),
        totalStudents: students.length,
        students: students
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `keyboard-quest-all-students-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("📊 All student progress exported!");
}

function showToast(text, customClass = "") {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = `toast ${customClass}`;
    toast.textContent = text;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    announceToScreenReader(text);
}

function announceToScreenReader(text) {
    const announcer = document.getElementById("sr-announcer");
    if (!announcer) return;
    announcer.textContent = "";
    requestAnimationFrame(() => {
        announcer.textContent = text;
    });
}

let previousActiveElement = null;
let currentFocusedModal = null;

function trapFocus(modalEl) {
    if (!modalEl) return;
    previousActiveElement = document.activeElement;
    currentFocusedModal = modalEl;

    const focusableSelector = 'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const focusableElements = modalEl.querySelectorAll(focusableSelector);
    if (focusableElements.length === 0) return;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handler = (e) => {
        if (e.key !== "Tab") return;
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    };

    modalEl._focusTrapHandler = handler;
    modalEl.addEventListener("keydown", handler);
    firstFocusable.focus();
}

function releaseFocusTrap(modalEl) {
    if (!modalEl) return;
    if (modalEl._focusTrapHandler) {
        modalEl.removeEventListener("keydown", modalEl._focusTrapHandler);
        delete modalEl._focusTrapHandler;
    }
    if (previousActiveElement && typeof previousActiveElement.focus === "function") {
        previousActiveElement.focus();
    }
    currentFocusedModal = null;
}

function renderBadges() {
    const container = document.getElementById("badges-container");
    if (!container) return;
    container.innerHTML = "";

    BADGES.forEach(badge => {
        const unlocked = gameState.badges.includes(badge.id);
        const card = document.createElement("div");
        card.className = `badge-card ${unlocked ? 'unlocked' : ''}`;

        const icon = document.createElement("div");
        icon.className = "badge-icon";
        icon.textContent = badge.icon;

        const title = document.createElement("div");
        title.className = "badge-title";
        title.textContent = badge.title;

        const desc = document.createElement("div");
        desc.className = "badge-desc";
        desc.textContent = badge.desc;

        card.append(icon, title, desc);
        container.appendChild(card);
    });
}

// --- 8. CENTRALIZED CHALLENGE SUCCESS SYSTEM ---

function completeChallenge(challenge, options = {}) {
    if (challengeCompleted) return;
    challengeCompleted = true;

    playSound("correct");
    cleanupLabListeners();

    recordAttempt(true);
    gameState.streak++;
    gameState.bestStreak = Math.max(gameState.bestStreak || 0, gameState.streak);
    if (gameState.missionsCompleted === 0) unlockBadge("first_mission");
    gameState.missionsCompleted++;
    gameState.completedChallenges = gameState.completedChallenges || [];
    if (!gameState.completedChallenges.includes(challenge.id)) gameState.completedChallenges.push(challenge.id);

    let earnedXP = challenge.xp;
    if (!hintUsedCurrent) earnedXP += NO_HINT_BONUS_XP;
    if (options.bonusXP) earnedXP += options.bonusXP;

    const actualXpAwarded = addXP(earnedXP);
    if (!hintUsedCurrent && !options.noPerfect) {
        currentLevelPerfects++;
        gameState.perfectChallenges = (gameState.perfectChallenges || 0) + 1;
    }

    // Show inline animated success glow on target virtual key if available
    if (options.targetKey) {
        const keys = document.querySelectorAll("#arena-keyboard-container .key");
        keys.forEach(k => {
            if (k.dataset.key === options.targetKey.toUpperCase()) {
                k.classList.add("correct-glow");
            }
        });
    }

    // Show Success Overlay Card
    showSuccessOverlay(
        options.title || "🎉 GREAT JOB!",
        options.message || `You solved: ${challenge.answer}!`,
        actualXpAwarded,
        gameState.streak
    );

    // Auto-advance after 1.2s delay
    setTimeout(() => {
        hideSuccessOverlay();
        currentChallengeIndex++;
        
        if (currentChallengeIndex >= currentChallengeList.length) {
            handleLevelCompletion();
        } else {
            loadChallenge();
        }
    }, TIMING.successAdvance);
}

function showSuccessOverlay(title, message, xp, streak) {
    const overlay = document.getElementById("success-overlay");
    document.getElementById("success-title").textContent = title;
    document.getElementById("success-message").textContent = message;
    document.getElementById("success-xp").textContent = `+${xp} XP`;
    
    const streakEl = document.getElementById("success-streak");
    if (streak >= 3) {
        streakEl.textContent = `🔥 ${streak} Answer Streak!`;
        streakEl.classList.remove("hidden");
    } else {
        streakEl.classList.add("hidden");
    }

    overlay.classList.remove("hidden");
    announceToScreenReader(`${title}. ${message}. ${xp} experience points earned.`);
}

function hideSuccessOverlay() {
    document.getElementById("success-overlay").classList.add("hidden");
}

function runCountdown(callback) {
    const overlay = document.getElementById("countdown-overlay");
    const numEl = document.getElementById("countdown-number");
    overlay.classList.remove("hidden");

    let count = 3;
    numEl.textContent = count;
    playSound("click");

    const timer = setInterval(() => {
        count--;
        if (count > 0) {
            numEl.textContent = count;
            playSound("click");
        } else if (count === 0) {
            numEl.textContent = "GO! 🚀";
            playSound("correct");
        } else {
            clearInterval(timer);
            overlay.classList.add("hidden");
            callback();
        }
    }, TIMING.countdownTick);
}

function handleLevelCompletion() {
    let unlockedBadge = null;

    if (currentActiveLevel === 1) if (unlockBadge("home_row_hero")) unlockedBadge = "Home Row Hero";
    if (currentActiveLevel === 2) if (unlockBadge("top_row_typer")) unlockedBadge = "Top Row Typer";
    if (currentActiveLevel === 3) if (unlockBadge("bottom_row_buddy")) unlockedBadge = "Bottom Row Buddy";
    if (currentActiveLevel === 4) if (unlockBadge("number_navigator")) unlockedBadge = "Number Navigator";
    if (currentActiveLevel === 5) if (unlockBadge("special_keys")) unlockedBadge = "Special Keys";

    const nextLevel = currentActiveLevel + 1;

    // A level is considered complete only after every challenge in that level is solved.
    if (nextLevel > gameState.maxUnlockedLevel && currentActiveLevel < 6) {
        gameState.maxUnlockedLevel = nextLevel;
    }

    // Keep the player's active level synchronized with progression.
    if (currentActiveLevel < 6) {
        gameState.level = nextLevel;
    } else {
        gameState.level = 6;
    }

    saveGame();
    updateHUD();

    playSound("complete");

    const lcModal = document.getElementById("level-complete-overlay");
    document.getElementById("completed-level-title").textContent =
        `LEVEL ${currentActiveLevel} COMPLETE!`;
    document.getElementById("lc-missions").textContent =
        `${currentChallengeList.length} / ${currentChallengeList.length}`;
    document.getElementById("lc-xp").textContent =
        `Level XP +${currentChallengeList.reduce((sum, c) => sum + c.xp, 0)}`;
    document.getElementById("lc-streak").textContent =
        `${gameState.streak} 🔥`;

    const badgePill = document.getElementById("lc-badge-unlocked");
    if (unlockedBadge) {
        badgePill.textContent = `🏅 New Badge: ${unlockedBadge}!`;
        badgePill.classList.remove("hidden");
    } else {
        badgePill.classList.add("hidden");
    }

    const nextUnlock = document.getElementById("lc-next-unlock");

    if (currentActiveLevel < 5) {
        nextUnlock.textContent = `LEVEL ${nextLevel} UNLOCKED! GET READY...`;
    } else if (currentActiveLevel === 5) {
        nextUnlock.textContent = "👑 FINAL CHALLENGE! GET READY...";
    } else {
        nextUnlock.textContent = "🏆 YOU ARE A KEYBOARD MASTER!";
    }

    lcModal.classList.remove("hidden");
    trapFocus(lcModal);
    announceToScreenReader(`Level ${currentActiveLevel} complete! ${unlockedBadge ? `New badge: ${unlockedBadge}.` : ''} ${nextUnlock.textContent}`);

    // Automatically move the child forward instead of sending them back to the menu.
    setTimeout(() => {
        releaseFocusTrap(lcModal);
        lcModal.classList.add("hidden");

        if (currentActiveLevel < 5) {
            showToast(`🚀 Level ${nextLevel} unlocked! Starting your next adventure!`);
            startLevelMissions(nextLevel);
        } else if (currentActiveLevel === 5) {
            showToast("👑 Final Challenge incoming!");
            startLevelMissions(6);
        } else {
            navigateTo("view-main-menu");
        }
    }, TIMING.levelCompleteDisplay);
}

// --- 9. MISSION ENGINE & CHALLENGES ---

function startLevelMissions(levelNum) {
    if (levelNum > gameState.maxUnlockedLevel) {
        showToast("🔒 Complete previous levels to unlock this mission!");
        playSound("wrong");
        return;
    }

    currentActiveLevel = levelNum;
    currentLevelPerfects = 0;

    if (levelNum === 6) {
        runCountdown(() => startBossBattle());
        return;
    }

    currentChallengeList = LEVEL_CHALLENGES.filter(c => c.level === levelNum);
    currentChallengeList = shuffleArray(currentChallengeList);
    currentChallengeIndex = 0;

    // Update level tab UI
    document.querySelectorAll(".tab-btn").forEach(t => {
        t.classList.toggle("active", parseInt(t.dataset.level) === levelNum);
    });

    navigateTo("view-missions");
    runCountdown(() => loadChallenge());
}

function loadChallenge() {
    challengeCompleted = false;
    hintUsedCurrent = false;
    wrongAttemptsCurrent = 0;

    if (currentChallengeIndex >= currentChallengeList.length) {
        handleLevelCompletion();
        return;
    }

    const challenge = currentChallengeList[currentChallengeIndex];

    const progressLabel = document.getElementById("mission-progress-label");
    const xpLabel = document.getElementById("mission-xp-label");
    const progressFill = document.getElementById("mission-progress-fill");
    const instruction = document.getElementById("challenge-instruction");
    const typeTag = document.getElementById("challenge-type-tag");
    const hintBox = document.getElementById("hint-box");
    const hintText = document.getElementById("hint-text");
    const streakBanner = document.getElementById("challenge-streak-banner");
    const streakCount = document.getElementById("streak-count-val");
    const workspace = document.getElementById("workspace-area");
    const kbContainer = document.getElementById("arena-keyboard-container");

    if (!progressLabel || !xpLabel || !progressFill || !instruction || !typeTag || !hintBox || !hintText || !workspace || !kbContainer) {
        console.error("[KeyboardQuest] Missing required DOM elements for challenge UI.");
        return;
    }

    // Update Mission Progress UI
    const total = currentChallengeList.length;
    const currentNum = currentChallengeIndex + 1;
    progressLabel.textContent = `Mission ${currentNum} of ${total}`;
    xpLabel.textContent = `+${challenge.xp} XP`;
    const progressPercent = ((currentNum - 1) / total) * 100;
    progressFill.style.width = `${progressPercent}%`;

    instruction.textContent = challenge.question;
    typeTag.textContent = challenge.type.toUpperCase();

    if (challenge.type === "key-finder") {
        instruction.classList.add("hidden");
        const existingTarget = document.getElementById("keyfinder-target");
        if (existingTarget) existingTarget.remove();
        const targetEl = document.createElement("div");
        targetEl.className = "keyfinder-target";
        targetEl.id = "keyfinder-target";
        targetEl.textContent = challenge.answer;
        instruction.parentElement.appendChild(targetEl);
    } else {
        const existingTarget = document.getElementById("keyfinder-target");
        if (existingTarget) existingTarget.remove();
        instruction.classList.remove("hidden");
    }

    hintBox.classList.add("hidden");
    hintText.textContent = challenge.hint;

    if (gameState.streak >= 3) {
        if (streakBanner) streakBanner.classList.remove("hidden");
        if (streakCount) streakCount.textContent = gameState.streak;
    } else {
        if (streakBanner) streakBanner.classList.add("hidden");
    }

    workspace.innerHTML = "";

    try {
        if (challenge.type === "key-finder") {
            kbContainer.classList.remove("hidden");
            renderVirtualKeyboard("arena-keyboard-container", (pressedKey) => handleKeyFinderAnswer(pressedKey, challenge));
            setupPhysicalKeyFinder(challenge);
        } else if (challenge.type === "typing") {
            kbContainer.classList.add("hidden");
            setupTypingChallenge(workspace, challenge);
        }
    } catch (err) {
        console.error("[KeyboardQuest] Failed to load challenge:", challenge.id, err);
        showToast("⚠️ Something went wrong loading this challenge.");
    }
}

function handleKeyFinderAnswer(pressedKey, challenge) {
    if (challengeCompleted) return;

    const isCorrect = pressedKey.toUpperCase() === challenge.answer.toUpperCase();

    if (isCorrect) {
        completeChallenge(challenge, {
            title: "🎉 PERFECT!",
            message: `You found the ${challenge.answer} key!`
        });
    } else {
        wrongAttemptsCurrent++;
        recordAttempt(false);
        playSound("wrong");
        gameState.streak = 0;
        updateHUD();

        const keys = document.querySelectorAll("#arena-keyboard-container .key");
        keys.forEach(k => {
            if (k.dataset.key === pressedKey.toUpperCase()) {
                k.classList.add("wrong-shake");
                setTimeout(() => k.classList.remove("wrong-shake"), 400);
            }
        });

        if (wrongAttemptsCurrent >= 2) {
            const hintBox = document.getElementById("hint-box");
            const hintText = document.getElementById("hint-text");
            if (hintBox && hintText) {
                hintUsedCurrent = true;
                hintBox.classList.remove("hidden");
                hintText.textContent = `💡 Progressive Hint: Look for the key labeled "${challenge.answer}" on your keyboard.`;
            }
        }
    }
}

function setupPhysicalKeyFinder(challenge) {
    const handler = (e) => {
        if (challengeCompleted) return;
        setPhysicalModeIndicator(true);
        handleKeyFinderAnswer(normalizeKey(e), challenge);
    };

    activeShortcutHandler = handler;
    window.addEventListener("keydown", activeShortcutHandler);
}

function setupTypingChallenge(workspace, challenge) {
    const targetText = document.createElement("div");
    targetText.className = "typing-target-text";
    targetText.textContent = challenge.answer;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "typing-input-field";
    input.id = "typing-input";
    input.placeholder = "Type here...";
    input.autocomplete = "off";

    const feedback = document.createElement("div");
    feedback.className = "typing-feedback-pill";

    const msgSpan = document.createElement("span");
    msgSpan.id = "type-message";
    msgSpan.textContent = "Type the word above!";
    feedback.appendChild(msgSpan);

    workspace.append(targetText, input, feedback);

    const typingInput = document.getElementById("typing-input");
    setTimeout(() => typingInput.focus(), 50);

    const messageEl = document.getElementById("type-message");

    typingInput.addEventListener("input", () => {
        if (challengeCompleted) return;
        const val = typingInput.value;

        if (val.toLowerCase() === challenge.answer.toLowerCase()) {
            typingInput.disabled = true;
            if (messageEl) {
                messageEl.textContent = "🎉 Great job!";
                messageEl.className = "accuracy good";
            }
            completeChallenge(challenge, {
                title: "🎉 AWESOME!",
                message: `You typed "${challenge.answer}" perfectly!`
            });
        } else if (val.length >= challenge.answer.length) {
            if (messageEl) {
                messageEl.textContent = "Almost! Try again!";
                messageEl.className = "accuracy warn";
            }
            typingInput.value = "";
        }
    });
}

function cleanupLabListeners() {
    if (labKeyDownHandler) {
        window.removeEventListener("keydown", labKeyDownHandler);
        labKeyDownHandler = null;
    }
    if (labKeyUpHandler) {
        window.removeEventListener("keyup", labKeyUpHandler);
        labKeyUpHandler = null;
    }
}

// --- 10. BOSS BATTLES ---

function startBossBattle() {
    navigateTo("view-boss");
    let hp = BOSS_CONFIG.hp;
    let timeLeft = BOSS_CONFIG.timeLimit;

    const bossTasks = [
        { task: "Find Enter Key", target: "Enter" },
        { task: "Find Spacebar", target: "Space" },
        { task: "Find Backspace Key", target: "Backspace" },
        { task: "Find Tab Key", target: "Tab" },
        { task: "Find Caps Lock", target: "Caps Lock" },
        { task: "Find Shift Key", target: "Shift" },
        { task: "Find Letter A", target: "A" },
        { task: "Find Letter S", target: "S" },
        { task: "Find Letter D", target: "D" },
        { task: "Find Letter F", target: "F" },
        { task: "Find Letter J", target: "J" },
        { task: "Find Letter K", target: "K" },
        { task: "Find Letter L", target: "L" },
        { task: "Find Number 1", target: "1" },
        { task: "Find Number 5", target: "5" },
        { task: "Find Number 0", target: "0" }
    ];

    const taskCount = Math.min(6, bossTasks.length);
    const tasks = shuffleArray(bossTasks).slice(0, taskCount);

    let currentTaskIdx = 0;

    const updateBossUI = () => {
        document.getElementById("boss-hp-fill").style.width = `${Math.max(0, hp)}%`;
        document.getElementById("boss-hp-text").textContent = `${Math.max(0, hp)} / ${BOSS_CONFIG.hp} HP`;
        document.getElementById("boss-timer").textContent = timeLeft;
        if (currentTaskIdx < tasks.length) {
            document.getElementById("boss-current-task").textContent = tasks[currentTaskIdx].task;
        }
    };

    renderVirtualKeyboard("boss-keyboard-container", (pressedKey) => {
        const cur = tasks[currentTaskIdx];
        if (cur && pressedKey.toUpperCase() === cur.target.toUpperCase()) {
            hp -= BOSS_CONFIG.damagePerHit;
            playSound("correct");
            currentTaskIdx++;
            if (hp <= 0 || currentTaskIdx >= tasks.length) {
                winBoss();
            }
            updateBossUI();
        }
    });

    const winBoss = () => {
        clearInterval(bossTimerInterval);
        playSound("complete");
        unlockBadge("kb_master");
        addXP(BOSS_XP_REWARD);
        showToast("🤖 ROBOT DEFEATED! YOU ARE A KEYBOARD MASTER!");
        setTimeout(() => navigateTo("view-main-menu"), 1500);
    };

    updateBossUI();
    clearInterval(bossTimerInterval);
    bossTimerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(bossTimerInterval);
            showToast("⏰ Time's up! Try again!");
            navigateTo("view-main-menu");
        }
        document.getElementById("boss-timer").textContent = timeLeft;
    }, 1000);
}

// --- 11. INTERACTIVE LAB & PHYSICAL KEY MAPPER ---

let labPracticeActive = false;
let labPracticeTarget = null;

function setupKeyboardLab() {
    renderVirtualKeyboard("lab-keyboard-container", (key) => inspectKey(key));

    labKeyDownHandler = (e) => {
        const keyName = normalizeKey(e);
        highlightVirtualKey(keyName.toUpperCase());
        inspectKey(keyName);
        if (labPracticeActive) handleLabPracticeAnswer(keyName);
    };

    labKeyUpHandler = (e) => {
        const keyName = normalizeKey(e);
        unhighlightVirtualKey(keyName.toUpperCase());
    };

    window.addEventListener("keydown", labKeyDownHandler);
    window.addEventListener("keyup", labKeyUpHandler);
}

function startLabPractice() {
    labPracticeActive = true;
    const allKeys = KEYBOARD_LAYOUT.flat();
    labPracticeTarget = allKeys[Math.floor(Math.random() * allKeys.length)];
    renderVirtualKeyboard("lab-keyboard-container", (key) => inspectKey(key), labPracticeTarget);

    const targetEl = document.getElementById("lab-practice-target");
    const feedbackEl = document.getElementById("lab-practice-feedback");
    const toggleBtn = document.getElementById("lab-practice-toggle");

    if (targetEl) targetEl.innerHTML = `Press <strong>${labPracticeTarget}</strong> on your keyboard`;
    if (feedbackEl) feedbackEl.textContent = "";
    if (toggleBtn) {
        toggleBtn.textContent = "Stop Practice";
        toggleBtn.classList.remove("btn-secondary");
        toggleBtn.classList.add("btn-danger");
    }
}

function stopLabPractice() {
    labPracticeActive = false;
    labPracticeTarget = null;
    renderVirtualKeyboard("lab-keyboard-container", (key) => inspectKey(key));

    const targetEl = document.getElementById("lab-practice-target");
    const feedbackEl = document.getElementById("lab-practice-feedback");
    const toggleBtn = document.getElementById("lab-practice-toggle");

    if (targetEl) targetEl.innerHTML = "Press <strong>Start Practice</strong> to begin";
    if (feedbackEl) feedbackEl.textContent = "";
    if (toggleBtn) {
        toggleBtn.textContent = "Start Practice";
        toggleBtn.classList.remove("btn-danger");
        toggleBtn.classList.add("btn-secondary");
    }
}

function handleLabPracticeAnswer(pressedKey) {
    if (!labPracticeActive || !labPracticeTarget) return;

    const isCorrect = pressedKey.toUpperCase() === labPracticeTarget.toUpperCase();
    const feedbackEl = document.getElementById("lab-practice-feedback");
    const targetEl = document.getElementById("lab-practice-target");

    if (isCorrect) {
        playSound("correct");
        if (feedbackEl) {
            feedbackEl.textContent = "🎉 Correct!";
            feedbackEl.style.color = "var(--success)";
        }
        if (targetEl) targetEl.classList.add("correct");

        setTimeout(() => {
            if (targetEl) targetEl.classList.remove("correct");
            startLabPractice();
        }, 800);
    } else {
        playSound("wrong");
        if (feedbackEl) {
            feedbackEl.textContent = "❌ Try again!";
            feedbackEl.style.color = "var(--danger)";
        }
        if (targetEl) {
            targetEl.classList.add("wrong");
            setTimeout(() => targetEl.classList.remove("wrong"), 400);
        }
    }
}

function inspectKey(keyLabel) {
    const display = document.getElementById("lab-key-display");
    const nameEl = document.getElementById("lab-key-name");
    const codeEl = document.getElementById("lab-key-code");
    const descEl = document.getElementById("lab-key-desc");
    const shortEl = document.getElementById("lab-key-shortcut");

    if (!display && !nameEl && !codeEl && !descEl && !shortEl) return;

    const info = KEY_DESCRIPTIONS[keyLabel] || {
        name: `Key '${keyLabel}'`,
        code: `Key${keyLabel.toUpperCase()}`,
        desc: "Standard alphanumeric or punctuation key.",
        shortcut: "None"
    };

    if (display) display.textContent = keyLabel.length > 3 ? keyLabel.substring(0, 3) : keyLabel;
    if (nameEl) nameEl.textContent = info.name;
    if (codeEl) codeEl.textContent = info.code;
    if (descEl) descEl.textContent = info.desc;
    if (shortEl) shortEl.textContent = info.shortcut;
}

function highlightVirtualKey(keyLabel) {
    const keys = document.querySelectorAll(".key");
    keys.forEach(k => {
        if (k.dataset.key === keyLabel) k.classList.add("pressed");
    });
}

function unhighlightVirtualKey(keyLabel) {
    const keys = document.querySelectorAll(".key");
    keys.forEach(k => {
        if (k.dataset.key === keyLabel) k.classList.remove("pressed");
    });
}

function validateChallenges() {
    const validTypes = new Set(["key-finder", "typing"]);
    const seenIds = new Set();
    const valid = [];
    let invalidCount = 0;

    LEVEL_CHALLENGES.forEach((c, i) => {
        if (!c.id || seenIds.has(c.id)) {
            console.warn(`[KeyboardQuest] Skipping duplicate or missing challenge id at index ${i}`);
            invalidCount++;
            return;
        }
        seenIds.add(c.id);
        if (!c.level || !c.type || !validTypes.has(c.type) || !c.question || c.answer === undefined) {
            console.warn(`[KeyboardQuest] Skipping invalid challenge data: ${c.id}`);
            invalidCount++;
            return;
        }
        if (typeof c.xp !== "number" || c.xp <= 0) {
            console.warn(`[KeyboardQuest] Skipping challenge with invalid XP: ${c.id}`);
            invalidCount++;
            return;
        }
        valid.push(c);
    });

    if (invalidCount > 0) {
        console.warn(`[KeyboardQuest] ${invalidCount} invalid challenges were removed.`);
    }
    console.log(`[KeyboardQuest] Validated ${valid.length} of ${LEVEL_CHALLENGES.length} challenges.`);

    if (valid.length === 0) {
        console.error("[KeyboardQuest] No valid challenges found! Please check challenge data.");
    }

    LEVEL_CHALLENGES = valid;
}

// --- 12. INITIALIZATION & EVENT BINDINGS ---

document.addEventListener("DOMContentLoaded", () => {
    injectCelebrationStyles();
    validateChallenges();
    gameState.totalAttempts=gameState.totalAttempts||0; gameState.correctAnswers=gameState.correctAnswers||0; gameState.perfectChallenges=gameState.perfectChallenges||0; gameState.bestStreak=gameState.bestStreak||0; gameState.completedChallenges=gameState.completedChallenges||[];

    const nameModal = document.getElementById("view-name-modal");
    nameModal.classList.remove("hidden");
    trapFocus(nameModal);

    document.getElementById("save-name-btn").addEventListener("click", () => {
        const val = document.getElementById("player-nickname-input").value.trim();
        if (val) {
            if (val.toLowerCase() === "sysadmin") {
                const nameModal = document.getElementById("view-name-modal");
                releaseFocusTrap(nameModal);
                nameModal.classList.add("hidden");
                showFacilitatorDashboard();
                return;
            }
            gameState.studentId = val;
            gameState.playerName = val;
            loadGame();
            saveGame();
            const nameModal = document.getElementById("view-name-modal");
            releaseFocusTrap(nameModal);
            nameModal.classList.add("hidden");
            updateHUD();
        }
    });

    // Allow switching students from progress view
    document.getElementById("btn-switch-student")?.addEventListener("click", () => {
        if (confirm("Switch to a different student? Current progress will be saved.")) {
            saveGame();
            gameState.playerName = "";
            gameState.studentId = "";
            navigateTo("view-main-menu");
            const nameModal = document.getElementById("view-name-modal");
            nameModal.classList.remove("hidden");
            trapFocus(nameModal);
        }
    });

    // Main Navigation
    document.getElementById("btn-goto-missions").addEventListener("click", () => startLevelMissions(gameState.level || 1));
    document.getElementById("btn-goto-lab").addEventListener("click", () => { navigateTo("view-lab"); setupKeyboardLab(); });
    document.getElementById("btn-goto-achievements").addEventListener("click", () => navigateTo("view-achievements"));
    document.getElementById("btn-goto-progress").addEventListener("click", () => navigateTo("view-progress"));
    document.getElementById("btn-goto-howto").addEventListener("click", () => navigateTo("view-howto"));

    document.getElementById("lab-practice-toggle")?.addEventListener("click", () => {
        if (labPracticeActive) {
            stopLabPractice();
        } else {
            startLabPractice();
        }
    });

    document.querySelectorAll(".back-btn").forEach(btn => {
        btn.addEventListener("click", () => navigateTo(btn.dataset.target));
    });

    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const levelNum = parseInt(btn.dataset.level);
            startLevelMissions(levelNum);
        });
    });

    // Hint toggle
    document.getElementById("btn-trigger-hint").addEventListener("click", () => {
        hintUsedCurrent = true;
        document.getElementById("hint-box").classList.remove("hidden");
    });

    // Sound toggle
    document.getElementById("sound-toggle-btn").addEventListener("click", () => {
        gameState.soundEnabled = !gameState.soundEnabled;
        document.getElementById("sound-toggle-btn").textContent = gameState.soundEnabled ? "🔊" : "🔇";
    });

    // Theme toggle
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
        const savedTheme = localStorage.getItem("keyboard_quest_theme");
        if (savedTheme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
            themeBtn.textContent = "☀️";
        }

        themeBtn.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme");
            if (current === "light") {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("keyboard_quest_theme", "dark");
                themeBtn.textContent = "🌓";
            } else {
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("keyboard_quest_theme", "light");
                themeBtn.textContent = "☀️";
            }
        });
    }

    // Facilitator Modal
    document.getElementById("facilitator-btn").addEventListener("click", () => {
        document.getElementById("fac-player-name").textContent = gameState.playerName || "Agent";
        document.getElementById("fac-level").textContent = gameState.maxUnlockedLevel;
        document.getElementById("fac-xp").textContent = gameState.xp;
        document.getElementById("fac-shortcuts").textContent = gameState.missionsCompleted;
        const facModal = document.getElementById("facilitator-modal");
        facModal.classList.remove("hidden");
        trapFocus(facModal);
    });

    document.getElementById("fac-close-btn").addEventListener("click", () => {
        const facModal = document.getElementById("facilitator-modal");
        releaseFocusTrap(facModal);
        facModal.classList.add("hidden");
    });

    document.getElementById("fac-reset-btn").addEventListener("click", resetProgress);
    document.getElementById("btn-reset-game").addEventListener("click", resetProgress);

    document.getElementById("fac-export-btn").addEventListener("click", () => {
        const exportData = {
            playerName: gameState.playerName,
            xp: gameState.xp,
            level: gameState.level,
            maxUnlockedLevel: gameState.maxUnlockedLevel,
            missionsCompleted: gameState.missionsCompleted,
            badges: gameState.badges,
            bestTypingSpeed: gameState.bestTypingSpeed,
            streak: gameState.streak,
            bestStreak: gameState.bestStreak,
            totalAttempts: gameState.totalAttempts,
            correctAnswers: gameState.correctAnswers,
            completedChallenges: gameState.completedChallenges,
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `keyboard-quest-progress-${gameState.playerName || 'agent'}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast("📊 Progress exported!");
    });

    // Facilitator Dashboard buttons
    document.getElementById("btn-refresh-students")?.addEventListener("click", () => {
        renderFacilitatorDashboard();
        showToast("🔄 Student list refreshed");
    });

    document.getElementById("btn-export-all")?.addEventListener("click", exportAllProgress);

    updateHUD();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch((err) => {
            console.warn('[KeyboardQuest] Service worker registration failed:', err);
        });
    }
});