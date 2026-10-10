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

const stage = document.getElementById("stage");
const wrap = document.getElementById("quote-wrap");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");

let lastQuoteIndex = -1;
let lastThemeIndex = -1;

function pickIndex(arr, lastIndex) {
  if (arr.length === 1) return 0;
  let i;
  do {
    i = Math.floor(Math.random() * arr.length);
  } while (i === lastIndex);
  return i;
}

function applyTheme(theme) {
  document.documentElement.style.setProperty("--bg", theme.bg);
  document.documentElement.style.setProperty("--fg", theme.fg);
}

function show() {
  const qi = pickIndex(QUOTES, lastQuoteIndex);
  const ti = pickIndex(THEMES, lastThemeIndex);
  lastQuoteIndex = qi;
  lastThemeIndex = ti;

  const quote = QUOTES[qi];
  const theme = THEMES[ti];

  wrap.classList.remove("visible");

  setTimeout(() => {
    quoteEl.textContent = quote.text;
    authorEl.textContent = quote.author;
    applyTheme(theme);
    wrap.classList.add("visible");
  }, 220);
}

stage.addEventListener("click", show);

show();
