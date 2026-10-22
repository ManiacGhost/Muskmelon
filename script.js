// ---------- fill in personal content ----------
document.querySelectorAll(".her-name").forEach((el) => (el.textContent = CONFIG.herName));
document.querySelectorAll(".nick-name").forEach((el) => (el.textContent = CONFIG.nickname));
document.getElementById("your-name").textContent = CONFIG.yourName;
document.querySelectorAll(".your-name").forEach((el) => (el.textContent = CONFIG.yourName));
document.getElementById("letter-body").innerHTML = CONFIG.letter.map((p) => `<p>${p}</p>`).join("");

// together counter
const since = new Date(CONFIG.togetherSince);
function updateCounter() {
  const ms = Math.max(0, Date.now() - since.getTime());
  document.getElementById("days").textContent = Math.floor(ms / 86400000).toLocaleString();
  document.getElementById("hours").textContent = Math.floor(ms / 3600000).toLocaleString();
  document.getElementById("seconds").textContent = Math.floor(ms / 1000).toLocaleString();
}
updateCounter();
setInterval(updateCounter, 1000);

// ---------- polaroid gallery ----------
const polaroids = document.getElementById("polaroids");
CONFIG.photos.forEach((photo, i) => {
  const card = document.createElement("figure");
  card.className = "polaroid reveal";
  card.style.transform = `rotate(${(i % 2 ? 1 : -1) * (2 + (i % 3))}deg)`;
  card.innerHTML = `<div class="img"><img src="${photo.src}" alt="${photo.caption}" loading="lazy" style="object-position: ${photo.focus || "50% 40%"}" /></div><p>${photo.caption}</p>`;
  const img = card.querySelector("img");
  img.onerror = () => {
    img.parentElement.innerHTML = `<div class="placeholder"><span>📷</span>photo coming soon</div>`;
    card.dataset.missing = "1";
  };
  card.addEventListener("click", () => {
    if (card.dataset.missing) return;
    openLightbox(photo.src, photo.caption);
  });
  polaroids.appendChild(card);
});

const lightbox = document.getElementById("lightbox");
function openLightbox(src, caption) {
  document.getElementById("lb-img").src = src;
  document.getElementById("lb-cap").textContent = caption;
  lightbox.classList.add("show");
}
lightbox.addEventListener("click", (e) => {
  if (e.target.tagName !== "IMG") lightbox.classList.remove("show");
});
document.addEventListener("keydown", (e) => e.key === "Escape" && lightbox.classList.remove("show"));

// ---------- reasons cards ----------
const reasonGrid = document.getElementById("reason-grid");
CONFIG.reasons.forEach((r, i) => {
  const card = document.createElement("div");
  card.className = "card reveal";
  card.innerHTML = `<div class="card-inner">
      <div class="card-face card-front">${r.front}<small>reason #${i + 1}</small></div>
      <div class="card-face card-back">${r.back}</div>
    </div>`;
  card.addEventListener("click", () => card.classList.toggle("flipped"));
  reasonGrid.appendChild(card);
});

// ---------- envelope ----------
const envelope = document.getElementById("envelope");
envelope.addEventListener("click", () => {
  if (envelope.classList.contains("open")) return;
  envelope.classList.add("open");
  burstHearts(20);
  // make room below for the unfolded letter so it doesn't overlap the gallery
  setTimeout(() => {
    const paper = envelope.querySelector(".paper");
    const overflow = paper.offsetTop + paper.scrollHeight - 200 - envelope.offsetHeight;
    envelope.style.marginBottom = Math.max(0, overflow) + 40 + "px";
  }, 1300);
});

// ---------- cake candles ----------
const candles = document.querySelectorAll(".candle");
candles.forEach((c) =>
  c.addEventListener("click", () => {
    c.classList.add("out");
    if ([...candles].every((x) => x.classList.contains("out"))) {
      document.getElementById("wish-msg").classList.add("show");
      confetti(220);
      revealSurprise();
    }
  })
);

// ---------- intro gift ----------
const gift = document.getElementById("gift");
gift.addEventListener("click", () => {
  gift.classList.add("open");
  confetti(180);
  setTimeout(() => {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("main").classList.remove("hidden");
    window.scrollTo(0, 0);
    observeReveals();
  }, 900);
});

document.getElementById("more-confetti").addEventListener("click", () => {
  confetti(250);
  burstHearts(30);
});

// ---------- scroll reveal ----------
function observeReveals() {
  document.querySelectorAll(".section > h2, .section > .section-sub").forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    io.observe(el);
  });
}

// ---------- floating hearts ----------
const heartBox = document.getElementById("hearts");
const heartIcons = ["💖", "💕", "💗", "🌸", "💓", "✨"];
function spawnHeart(fromBottom = true) {
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 14 + Math.random() * 22 + "px";
  h.style.animationDuration = 7 + Math.random() * 8 + "s";
  if (!fromBottom) h.style.bottom = Math.random() * 40 + "vh";
  heartBox.appendChild(h);
  h.addEventListener("animationend", () => h.remove());
}
setInterval(spawnHeart, 700);
function burstHearts(n) {
  for (let i = 0; i < n; i++) setTimeout(() => spawnHeart(false), i * 40);
}

// ---------- confetti ----------
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];
let animating = false;
function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

function confetti(n) {
  const colors = ["#ff8fab", "#fb6f92", "#ffc2d1", "#ffd23f", "#c9184a", "#ffffff", "#a2d2ff"];
  for (let i = 0; i < n; i++) {
    pieces.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.6,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 18 - 6,
      size: 6 + Math.random() * 6,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      heart: Math.random() < 0.25,
    });
  }
  if (!animating) {
    animating = true;
    requestAnimationFrame(tick);
  }
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach((p) => {
    p.vy += 0.4;
    p.vx *= 0.99;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    if (p.heart) {
      ctx.font = `${p.size * 2}px serif`;
      ctx.fillText("❤", 0, 0);
    } else {
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    }
    ctx.restore();
  });
  pieces = pieces.filter((p) => p.y < canvas.height + 40);
  if (pieces.length) requestAnimationFrame(tick);
  else {
    animating = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// ---------- miles apart ----------
document.getElementById("city-you").innerHTML = `${CONFIG.distance.yourCity}<small>${CONFIG.yourName}</small>`;
document.getElementById("city-her").textContent = CONFIG.distance.herCity;
const distanceMsg = document.getElementById("distance-msg");
distanceMsg.innerHTML = CONFIG.distance.message.map((p) => `<p>${p}</p>`).join("");

const routePath = document.getElementById("route-path");
const plane = document.getElementById("plane");
const routeSvg = routePath.ownerSVGElement;
const arrived = document.getElementById("arrived");
const pinHer = document.querySelector(".pin-her");
function flyPlane(t) {
  // Nikku's heart travels from 'wherever I am' to Delhi in 3.5s, waits there 2.5s, then repeats
  const phase = t % 6000;
  const progress = Math.min(1, phase / 3500);
  const landed = progress >= 1;
  arrived.classList.toggle("show", landed);
  pinHer.classList.toggle("landed", landed);
  const len = routePath.getTotalLength();
  const pt = routePath.getPointAtLength(progress * len);
  const box = routeSvg.getBoundingClientRect();
  const sx = box.width / 600, sy = box.height / 160;
  const mapBox = routeSvg.parentElement.getBoundingClientRect();
  plane.style.transform = `translate(${box.left - mapBox.left + pt.x * sx - 15}px, ${box.top - mapBox.top + pt.y * sy - 18}px)`;
  plane.style.opacity = landed ? 0 : 1;
  requestAnimationFrame(flyPlane);
}
requestAnimationFrame(flyPlane);

const distanceIO = new IntersectionObserver((entries) => {
  if (!entries[0].isIntersecting) return;
  distanceMsg.querySelectorAll("p").forEach((p, i) => setTimeout(() => p.classList.add("in"), 400 + i * 1600));
  distanceIO.disconnect();
}, { threshold: 0.3 });
distanceIO.observe(distanceMsg);

// ---------- open when ----------
const owGrid = document.getElementById("ow-grid");
const owModal = document.getElementById("ow-modal");
CONFIG.openWhen.forEach((ow) => {
  const env = document.createElement("button");
  env.className = "ow-env reveal";
  env.innerHTML = `<span class="ic">${ow.icon}</span><small>open when</small><b>${ow.title}</b>`;
  env.addEventListener("click", () => {
    document.getElementById("ow-title").textContent = `Open when ${ow.title} ${ow.icon}`;
    document.getElementById("ow-text").textContent = ow.message;
    owModal.classList.add("show");
    env.classList.add("read");
  });
  owGrid.appendChild(env);
});
owModal.addEventListener("click", (e) => {
  if (e.target === owModal || e.target.id === "ow-close") owModal.classList.remove("show");
});
document.addEventListener("keydown", (e) => e.key === "Escape" && owModal.classList.remove("show"));

// ---------- hug (press and hold) ----------
const hugHeart = document.getElementById("hug-heart");
const hugFill = document.getElementById("hug-fill");
let hugLevel = 0, hugTimer = null, hugDone = false;
function setHug(level) {
  hugLevel = Math.max(0, Math.min(1, level));
  hugFill.setAttribute("y", 29 - 29 * hugLevel);
}
function startHug(e) {
  e.preventDefault();
  if (hugDone) return;
  hugHeart.classList.add("holding");
  clearInterval(hugTimer);
  hugTimer = setInterval(() => {
    setHug(hugLevel + 0.02);
    if (hugLevel >= 1) {
      hugDone = true;
      clearInterval(hugTimer);
      hugHeart.classList.remove("holding");
      document.getElementById("hug-heart").classList.add("gone");
      const scene = document.getElementById("hug-scene");
      scene.classList.add("show");
      setTimeout(() => scene.classList.add("hugging"), 400);
      setTimeout(() => document.getElementById("hug-msg").classList.add("show"), 1900);
      burstHearts(40);
      if (navigator.vibrate) navigator.vibrate([80, 60, 80]);
    }
  }, 40);
}
function stopHug() {
  if (hugDone) return;
  hugHeart.classList.remove("holding");
  clearInterval(hugTimer);
  hugTimer = setInterval(() => {
    setHug(hugLevel - 0.03);
    if (hugLevel <= 0) clearInterval(hugTimer);
  }, 40);
}
hugHeart.addEventListener("pointerdown", startHug);
["pointerup", "pointerleave", "pointercancel"].forEach((ev) => hugHeart.addEventListener(ev, stopHug));
hugHeart.addEventListener("contextmenu", (e) => e.preventDefault());

// ---------- night sky ----------
const starField = document.getElementById("star-field");
for (let i = 0; i < 70; i++) {
  const s = document.createElement("span");
  s.className = "star";
  s.style.left = Math.random() * 100 + "%";
  s.style.top = Math.random() * 100 + "%";
  s.style.animationDelay = Math.random() * 3 + "s";
  starField.appendChild(s);
}
// wish stars sit around the moon, away from the text
const starSpots = [[8, 30], [20, 52], [85, 28], [72, 50], [14, 72], [88, 70], [35, 64], [62, 68]];
const starMsg = document.getElementById("star-msg");
CONFIG.stars.forEach((text, i) => {
  const b = document.createElement("button");
  b.className = "wish-star";
  b.textContent = "⭐";
  b.setAttribute("aria-label", "Reveal a wish");
  const [x, y] = starSpots[i % starSpots.length];
  b.style.left = x + "%";
  b.style.top = y + "%";
  b.style.animationDelay = i * 0.3 + "s";
  b.addEventListener("click", () => {
    starMsg.style.opacity = 0;
    setTimeout(() => {
      starMsg.textContent = text;
      starMsg.style.opacity = 1;
    }, 300);
    b.classList.add("seen");
  });
  starField.appendChild(b);
});

// ---------- forever question ----------
const noBtn = document.getElementById("no-btn");
const noLines = ["No", "Are you sure? 🥺", "Think again 😤", "Not an option 😌", "Nice try 😂"];
let noCount = 0;
function dodge() {
  noCount++;
  noBtn.textContent = noLines[Math.min(noCount, noLines.length - 1)];
  const x = (Math.random() - 0.5) * Math.min(300, innerWidth - 120);
  const y = (Math.random() - 0.5) * 120;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}
noBtn.addEventListener("pointerenter", dodge);
noBtn.addEventListener("click", dodge);
document.getElementById("yes-btn").addEventListener("click", () => {
  document.getElementById("forever-msg").classList.add("show");
  noBtn.style.display = "none";
  confetti(300);
  burstHearts(40);
});

// ---------- music ----------
const music = document.getElementById("music");
const musicBtn = document.getElementById("music-btn");
if (CONFIG.music) {
  music.src = CONFIG.music;
  music.addEventListener("canplay", () => musicBtn.classList.remove("hidden"), { once: true });
}
function toggleMusic(forcePlay) {
  if (musicBtn.classList.contains("hidden")) return;
  if (forcePlay || music.paused) {
    music.play().then(() => musicBtn.classList.add("playing")).catch(() => {});
  } else {
    music.pause();
    musicBtn.classList.remove("playing");
  }
}
musicBtn.addEventListener("click", () => toggleMusic());
gift.addEventListener("click", () => toggleMusic(true));

// ---------- surprise video (unlocked by blowing out the candles) ----------
function revealSurprise() {
  const box = document.getElementById("surprise");
  if (box.dataset.shown) return;
  box.dataset.shown = "1";
  const src = CONFIG.surpriseVideo || "";
  const driveId = (src.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/) || [])[1];
  if (driveId) {
    box.innerHTML = `<iframe src="https://drive.google.com/file/d/${driveId}/preview" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  } else {
    box.innerHTML = `<video src="${src}" controls playsinline preload="auto"></video>`;
    const video = box.querySelector("video");
    video.onerror = () => (box.innerHTML = `<div class="surprise-missing">🎬 video coming soon</div>`);
    // the candle tap counts as a user gesture, so it can autoplay with sound
    video.play().catch(() => {});
    if (!music.paused) {
      music.pause();
      musicBtn.classList.remove("playing");
    }
  }
  box.classList.add("show");
  setTimeout(() => box.scrollIntoView({ behavior: "smooth", block: "center" }), 600);
}

// ---------- "where we started" — the first picture, developing like an instant photo ----------
const firstModal = document.getElementById("first-modal");
// the reveal stays hidden (even if styles fail to load) until the button is pressed
function closeFirst() {
  firstModal.classList.remove("show");
  setTimeout(() => (firstModal.hidden = true), 800);
}
document.getElementById("start-btn").addEventListener("click", () => {
  firstModal.hidden = false;
  setTimeout(() => firstModal.classList.add("show"), 30);
  setTimeout(() => burstHearts(30), 4000);
});
firstModal.addEventListener("click", (e) => {
  if (e.target === firstModal || e.target.id === "first-close") closeFirst();
});
document.addEventListener("keydown", (e) => e.key === "Escape" && !firstModal.hidden && closeFirst());
