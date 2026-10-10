const THEMES = [
  { bg: "#1a1a2e", fg: "#eaeaea" },
  { bg: "#faf3e0", fg: "#2b2b2b" },
  { bg: "#0b3d2e", fg: "#d9f2e6" },
  { bg: "#2d1b4e", fg: "#f3e9ff" },
  { bg: "#fff5f0", fg: "#4a2c2a" },
  { bg: "#0d1b2a", fg: "#e0fbfc" },
  { bg: "#1b1b1b", fg: "#f5c518" },
  { bg: "#e8f1f2", fg: "#14213d" },
  { bg: "#3d1f1f", fg: "#f6e1cf" },
  { bg: "#f0f4e8", fg: "#2f3e1f" },
];

const DAILY_KEY = "impulso:daily";
const UNKNOWN_AUTHOR = "Autor desconhecido";

const stage = document.getElementById("stage");
const wrap = document.getElementById("quote-wrap");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const copyBtn = document.getElementById("copy-btn");
const toast = document.getElementById("toast");

let quotes = {};
let ids = [];
let currentId = null;
let lastThemeIndex = -1;
let toastTimer = null;

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function pickRandomId(excludeId) {
  if (ids.length === 1) return ids[0];
  let id;
  do {
    id = ids[Math.floor(Math.random() * ids.length)];
  } while (id === excludeId);
  return id;
}

function pickThemeIndex() {
  if (THEMES.length === 1) return 0;
  let i;
  do {
    i = Math.floor(Math.random() * THEMES.length);
  } while (i === lastThemeIndex);
  return i;
}

function applyTheme(theme) {
  document.documentElement.style.setProperty("--bg", theme.bg);
  document.documentElement.style.setProperty("--fg", theme.fg);
}

function getDailyId() {
  let stored = null;
  try {
    stored = JSON.parse(localStorage.getItem(DAILY_KEY));
  } catch {
    stored = null;
  }

  if (stored && stored.date === todayKey() && quotes[stored.id]) {
    return stored.id;
  }

  const id = pickRandomId(stored && stored.id);
  localStorage.setItem(DAILY_KEY, JSON.stringify({ date: todayKey(), id }));
  return id;
}

function render(id) {
  const quote = quotes[id];
  const themeIndex = pickThemeIndex();
  lastThemeIndex = themeIndex;

  wrap.classList.remove("visible");

  setTimeout(() => {
    quoteEl.textContent = quote.text;
    authorEl.textContent = quote.author;
    authorEl.hidden = quote.author === UNKNOWN_AUTHOR;
    applyTheme(THEMES[themeIndex]);
    wrap.classList.add("visible");
    currentId = id;
  }, 220);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 1400);
}

async function copyCurrentQuote() {
  const quote = quotes[currentId];
  const text =
    quote.author === UNKNOWN_AUTHOR
      ? `"${quote.text}"`
      : `"${quote.text}" ~~ ${quote.author}`;
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copiado!");
  } catch {
    // clipboard indisponível (permissão negada ou contexto não seguro)
  }
}

stage.addEventListener("click", () => render(pickRandomId(currentId)));

copyBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  copyCurrentQuote();
});

async function init() {
  const res = await fetch("quotes.json");
  quotes = await res.json();
  ids = Object.keys(quotes);
  render(getDailyId());
}

init();
