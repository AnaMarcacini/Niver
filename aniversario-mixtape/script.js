const songs = [
  { title: "Sua música aqui", artist: "artista", file: "assets/musica1.mp3", art: "01" },
  { title: "Outra música", artist: "artista", file: "assets/musica2.mp3", art: "02" },
  { title: "Aquela que lembra você", artist: "artista", file: "assets/musica3.mp3", art: "03" },
  { title: "Mais uma memória", artist: "artista", file: "assets/musica4.mp3", art: "04" },
  { title: "Para ouvir de noite", artist: "artista", file: "assets/musica5.mp3", art: "05" },
  { title: "Última faixa", artist: "artista", file: "assets/musica6.mp3", art: "06" }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const tracksEl = document.getElementById("tracks");
const titleEl = document.getElementById("songTitle");
const artistEl = document.getElementById("songArtist");
const artEl = document.getElementById("albumArt");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const progressFill = document.getElementById("progressFill");

let current = 0;

function renderTracks() {
  tracksEl.innerHTML = songs.map((song, i) => `
    <div class="track ${i === current ? "active" : ""}" data-index="${i}">
      <span class="track-number">${String(i + 1).padStart(2, "0")}</span>
      <div>
        <div class="track-name">${song.title}</div>
        <div class="track-artist">${song.artist}</div>
      </div>
      <span class="track-meta">A-SIDE</span>
    </div>
  `).join("");

  document.querySelectorAll(".track").forEach(el => {
    el.addEventListener("click", () => {
      loadSong(Number(el.dataset.index));
      playSong();
    });
  });
}

function loadSong(index) {
  current = (index + songs.length) % songs.length;
  const song = songs[current];

  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  artEl.querySelector("span").textContent = song.art;
  audio.src = song.file;

  renderTracks();
}

function playSong() {
  audio.play().then(() => {
    playBtn.textContent = "Ⅱ";
  }).catch(() => {
    playBtn.textContent = "▶";
  });
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
  audio.paused ? playSong() : pauseSong();
});

prevBtn.addEventListener("click", () => {
  loadSong(current - 1);
  playSong();
});

nextBtn.addEventListener("click", () => {
  loadSong(current + 1);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("ended", () => {
  loadSong(current + 1);
  playSong();
});

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const min = Math.floor(seconds / 60).toString().padStart(2, "0");
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

document.getElementById("startBtn").addEventListener("click", () => {
  document.querySelector(".player-section").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => playSong(), 500);
});

document.getElementById("replayBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  loadSong(0);
  setTimeout(() => playSong(), 700);
});

loadSong(0);
