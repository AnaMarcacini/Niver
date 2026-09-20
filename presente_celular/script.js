/* =========================================================
   PERSONALIZE AQUI
   ========================================================= */
const CONFIG = {
  // ALTERE O NOME DA PESSOA:
  name: "[NOME]",

  // MENSAGENS — você pode trocar, adicionar ou remover:
  messages: [
    "Oi! Só queria deixar uma pequena lembrança por aqui. ♡",
    "Você é uma pessoa muito especial para mim.",
    "Espero que você encontre alguns sorrisos escondidos neste celular.",
    "E que a gente ainda tenha muitas histórias para guardar."
  ],

  // MEMÓRIAS — altere livremente:
  memories: [
    { year: "2023", title: "Quando tudo começou.", text: "Algumas histórias começam sem avisar que vão se tornar importantes." },
    { year: "2024", title: "Um dos meus dias favoritos.", text: "Daqueles dias simples que ficam na memória por motivos difíceis de explicar." },
    { year: "2025", title: "Mais uma história para guardar.", text: "Entre conversas, risadas e pequenos momentos, mais uma página." },
    { year: "2026", title: "E ainda tem muito pela frente. ♡", text: "Talvez essa seja a parte mais bonita: a história ainda continua." }
  ],

  // CARTA — edite o texto abaixo:
  letter: {
    title: "Oi, você.",
    paragraphs: [
      "Eu queria te deixar uma pequena lembrança — não uma coisa enorme ou cheia de enfeites, mas um cantinho que reunisse algumas coisas que me fazem lembrar de você.",
      "Espero que, quando abrir cada aplicativo, encontre um pedacinho de carinho escondido.",
      "Feliz aniversário. Que o próximo capítulo seja bonito, leve e cheio de momentos que valham a pena guardar. ♡"
    ]
  },

  // MÚSICA — coloque seu arquivo em assets/music/ e altere o nome aqui:
  music: {
    file: "assets/music/minha-musica.mp3",
    title: "Uma música para nós",
    artist: "Escolha sua música",
    durationHint: "adicione seu .mp3 em assets/music/"
  },

  // FOTOS — coloque suas fotos em assets/photos/ e altere os caminhos:
  photos: [
    { file: "assets/photos/foto-1.jpg", caption: "um momento para guardar" },
    { file: "assets/photos/foto-2.jpg", caption: "uma memória bonita" },
    { file: "assets/photos/foto-3.jpg", caption: "mais uma história" },
    { file: "assets/photos/foto-4.jpg", caption: "e ainda tem muitas por vir" }
  ]
};
/* ========================================================= */

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

$("#personName").textContent = CONFIG.name;

const lockScreen = $("#lockScreen");
const homeScreen = $("#homeScreen");
const appScreen = $("#appScreen");
const appContent = $("#appContent");
const appTitle = $("#appTitle");
const toast = $("#toast");

let visited = new Set();
let giftUnlocked = false;
let heartTaps = 0;
let clockTaps = 0;

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString("pt-BR", {hour: "2-digit", minute: "2-digit"});
  const date = now.toLocaleDateString("pt-BR", {day:"numeric", month:"long"});
  $("#lockTime").textContent = time;
  $("#homeTime").textContent = time;
  $("#lockDate").textContent = date;
}
updateClock();
setInterval(updateClock, 1000);

function unlock() {
  lockScreen.classList.remove("active");
  homeScreen.classList.add("active");
}
$("#unlockBtn").addEventListener("click", unlock);

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function touchFeedback(button) {
  button.animate(
    [{transform:"scale(1)"},{transform:"scale(.88)"},{transform:"scale(1)"}],
    {duration:220, easing:"ease-out"}
  );
}

function renderMessages() {
  const chat = document.createElement("div");
  chat.className = "chat";
  CONFIG.messages.forEach((msg, i) => {
    const bubble = document.createElement("div");
    bubble.className = `bubble ${i % 3 === 1 ? "me" : ""}`;
    bubble.style.animationDelay = `${i * 450}ms`;
    bubble.textContent = msg;
    chat.appendChild(bubble);
  });
  const hint = document.createElement("div");
  hint.className = "chat-hint";
  hint.textContent = "algumas coisas são melhores descobertas devagar ♡";
  chat.appendChild(hint);
  return chat;
}

function renderPhotos() {
  const grid = document.createElement("div");
  grid.className = "photo-grid";
  CONFIG.photos.forEach((photo, i) => {
    const btn = document.createElement("button");
    btn.className = "photo-card";
    const img = document.createElement("img");
    img.src = photo.file;
    img.alt = photo.caption;
    img.onerror = () => {
      btn.innerHTML = `<div class="photo-placeholder">Coloque sua foto aqui<br><br><strong>${photo.file}</strong></div>`;
    };
    btn.appendChild(img);
    btn.addEventListener("click", () => openPhoto(photo));
    grid.appendChild(btn);
  });
  return grid;
}

function openPhoto(photo) {
  const viewer = document.createElement("div");
  viewer.className = "photo-viewer";
  viewer.innerHTML = `
    <button class="viewer-close" aria-label="Fechar">×</button>
    <div class="photo-viewer-inner">
      <img src="${photo.file}" alt="${photo.caption}" onerror="this.style.display='none'">
      <p>${photo.caption}</p>
    </div>`;
  viewer.querySelector(".viewer-close").onclick = () => viewer.remove();
  viewer.addEventListener("click", e => { if (e.target === viewer) viewer.remove(); });
  document.body.appendChild(viewer);
}

function renderMusic() {
  return `
    <div class="section-label">um pequeno soundtrack</div>
    <h2 class="app-heading">Música</h2>
    <div class="player">
      <div class="album-art">♫</div>
      <div class="track-title">${CONFIG.music.title}</div>
      <div class="artist">${CONFIG.music.artist}</div>
      <input class="progress" id="progress" type="range" min="0" max="100" value="0">
      <div class="time-row"><span id="currentTime">0:00</span><span id="duration">--:--</span></div>
      <div class="player-controls">
        <button class="play-btn" id="playBtn">▶</button>
      </div>
      <div class="music-note">${CONFIG.music.durationHint}</div>
      <audio id="audio" src="${CONFIG.music.file}" preload="metadata"></audio>
    </div>`;
}

function renderMemories() {
  const timeline = document.createElement("div");
  timeline.className = "timeline";
  CONFIG.memories.forEach((m, i) => {
    const item = document.createElement("article");
    item.className = "memory";
    item.style.animationDelay = `${i * 120}ms`;
    item.innerHTML = `
      <span class="memory-dot"></span>
      <div class="memory-year">${m.year}</div>
      <h3>${m.title}</h3>
      <p>${m.text}</p>`;
    timeline.appendChild(item);
  });
  return timeline;
}

function renderLetter() {
  const wrap = document.createElement("div");
  wrap.className = "letter-wrap";
  wrap.innerHTML = `
    <div class="envelope" id="envelope">
      <div class="paper">
        <h2>${CONFIG.letter.title}</h2>
        ${CONFIG.letter.paragraphs.map(p => `<p>${p}</p>`).join("")}
      </div>
      <div class="envelope-back"></div>
      <div class="envelope-flap"></div>
      <div class="envelope-front"></div>
      <button class="open-letter" id="openLetter">Abrir carta</button>
    </div>`;
  wrap.querySelector("#openLetter").onclick = () => {
    wrap.querySelector("#envelope").classList.toggle("open");
    wrap.querySelector("#openLetter").textContent =
      wrap.querySelector("#envelope").classList.contains("open") ? "Fechar carta" : "Abrir carta";
  };
  return wrap;
}

function renderGift() {
  const wrap = document.createElement("div");
  wrap.className = "gift-stage";
  wrap.innerHTML = `
    <div>
      <div class="gift-box" id="giftBox">
        <div class="gift-lid"></div>
        <div class="bow"></div>
        <div class="gift-body"></div>
        <div class="ribbon-v"></div>
        <div class="ribbon-h"></div>
      </div>
      <div class="gift-message">
        <h2>Feliz aniversário. ♡</h2>
        <p>Meu presente é simples:<br>
        mais momentos para guardar,<br>
        mais histórias para contar<br>
        e mais motivos para sorrir.</p>
      </div>
    </div>`;
  wrap.querySelector("#giftBox").onclick = () => {
    const box = wrap.querySelector("#giftBox");
    box.classList.toggle("opened");
    if (box.classList.contains("opened")) {
      showToast("um pequeno presente, com muito carinho.");
    }
  };
  return wrap;
}

function openApp(name) {
  visited.add(name);

  if (name === "gift" && !giftUnlocked) {
    showToast("Tem algo escondido aqui... explore os outros aplicativos primeiro.");
    return;
  }

  const titles = {
    messages: "Mensagens", photos: "Fotos", music: "Música",
    memories: "Memórias", letter: "Carta", gift: "Presente"
  };
  appTitle.textContent = titles[name];
  appContent.innerHTML = "";

  if (name === "messages") appContent.appendChild(renderMessages());
  if (name === "photos") appContent.appendChild(renderPhotos());
  if (name === "music") {
    appContent.innerHTML = renderMusic();
    setupAudio();
  }
  if (name === "memories") appContent.appendChild(renderMemories());
  if (name === "letter") appContent.appendChild(renderLetter());
  if (name === "gift") appContent.appendChild(renderGift());

  appScreen.classList.add("active");
  homeScreen.classList.remove("active");

  checkGift();
}

function checkGift() {
  const required = ["messages", "photos", "music", "memories", "letter"];
  if (required.every(x => visited.has(x))) {
    giftUnlocked = true;
    $("#giftApp").classList.remove("locked-app");
    $("#giftLock").textContent = "♡";
    $("#homeNote").textContent = "alguma coisa foi desbloqueada ♡";
    showToast("Você encontrou o caminho até o presente.");
  }
}

function setupAudio() {
  const audio = $("#audio");
  const playBtn = $("#playBtn");
  const progress = $("#progress");
  const currentTime = $("#currentTime");
  const duration = $("#duration");

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
  });
  audio.addEventListener("timeupdate", () => {
    if (audio.duration) progress.value = (audio.currentTime / audio.duration) * 100;
    currentTime.textContent = formatTime(audio.currentTime);
  });
  progress.addEventListener("input", () => {
    if (audio.duration) audio.currentTime = (progress.value / 100) * audio.duration;
  });
  playBtn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        playBtn.textContent = "Ⅱ";
      } else {
        audio.pause();
        playBtn.textContent = "▶";
      }
    } catch {
      showToast("Coloque seu arquivo .mp3 em assets/music/ e atualize o nome no CONFIG.");
    }
  });
  audio.addEventListener("ended", () => playBtn.textContent = "▶");
}
function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2,"0");
  return `${m}:${s}`;
}

$$(".app").forEach(btn => {
  btn.addEventListener("click", () => {
    touchFeedback(btn);
    openApp(btn.dataset.app);
  });
});

$("#backBtn").addEventListener("click", () => {
  appScreen.classList.remove("active");
  homeScreen.classList.add("active");
});

$("#heartEgg").addEventListener("click", () => {
  heartTaps++;
  touchFeedback($("#heartEgg"));
  if (heartTaps === 3) showToast("Você encontrou uma coisinha escondida. Eu gosto muito de você. ♡");
  if (heartTaps >= 6) {
    showToast("ok, acho que você gosta mesmo de apertar esse coração. ✦");
    heartTaps = 0;
  }
});

$("#homeTime").addEventListener("click", () => {
  clockTaps++;
  if (clockTaps === 3) {
    showToast("Alguns minutos viram memórias sem a gente perceber.");
    clockTaps = 0;
  }
});
