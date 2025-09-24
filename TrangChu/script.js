// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Scroll Animation for Gallery
const galleryItems = document.querySelectorAll(".gallery-item");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

galleryItems.forEach((item) => observer.observe(item));

// First Birthday Countdown
const birthday = new Date("2025-11-13T00:00:00");
const countdownTimer = document.getElementById("countdown-timer");
const celebrationMessage = document.getElementById("celebration-message");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date();
  const diff = birthday - now;

  if (diff <= 0) {
    countdownTimer.style.display = "none";
    celebrationMessage.style.display = "block";
    startFireworks();
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysElement.textContent = days.toString().padStart(2, "0");
    hoursElement.textContent = hours.toString().padStart(2, "0");
    minutesElement.textContent = minutes.toString().padStart(2, "0");
    secondsElement.textContent = seconds.toString().padStart(2, "0");
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Second Countdown (e.g., for an anniversary or another special date)
const specialDate = new Date("2026-01-02T00:00:00");
const countdownTimer2 = document.getElementById("countdown-timer2");
const celebrationMessage2 = document.getElementById("celebration-message2");
const daysElement2 = document.getElementById("days2");
const hoursElement2 = document.getElementById("hours2");
const minutesElement2 = document.getElementById("minutes2");
const secondsElement2 = document.getElementById("seconds2");

function updateCountdown2() {
  const now = new Date();
  const diff = specialDate - now;

  if (diff <= 0) {
    countdownTimer2.style.display = "none";
    celebrationMessage2.style.display = "block";
    startFireworks();
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysElement2.textContent = days.toString().padStart(2, "0");
    hoursElement2.textContent = hours.toString().padStart(2, "0");
    minutesElement2.textContent = minutes.toString().padStart(2, "0");
    secondsElement2.textContent = seconds.toString().padStart(2, "0");
  }
}

updateCountdown2();
setInterval(updateCountdown2, 1000);

// Canvas Background and Fireworks
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
let shootingStars = [];
let fireworks = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create Stars
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1 + 0.5,
    speed: 200 + Math.random() * 800,
  });
}

// Create Shooting Star
function createShootingStar() {
  const startX = (Math.random() * canvas.width) / 2;
  const startY = (Math.random() * canvas.height) / 2;
  const endX = startX + 400 + Math.random() * 300;
  const endY = startY + 400 + Math.random() * 300;
  const duration = 800 + Math.random() * 800;
  const startTime = Date.now();
  shootingStars.push({ startX, startY, endX, endY, duration, startTime });
}

setInterval(() => {
  if (Math.random() > 0.5) createShootingStar();
}, 3000);

// Fireworks
function createFirework() {
  const x = Math.random() * canvas.width;
  const y = (Math.random() * canvas.height) / 2;
  const particles = [];
  const colors = ["#ff6f91", "#ff9a8b", "#ffecd2", "#ffffff"];
  for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 2;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 100 + Math.random() * 50,
    });
  }
  fireworks.push({ particles, age: 0 });
}

function startFireworks() {
  setInterval(() => {
    if (
      celebrationMessage.style.display === "block" ||
      celebrationMessage2.style.display === "block"
    ) {
      createFirework();
    }
  }, 1000);
}

// Animation Loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Stars
  stars.forEach((star) => {
    const alpha = 0.5 + 0.5 * Math.sin(Date.now() / star.speed);
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
  });

  // Draw Shooting Stars
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const ss = shootingStars[i];
    const progress = (Date.now() - ss.startTime) / ss.duration;
    if (progress > 1) {
      shootingStars.splice(i, 1);
      continue;
    }
    for (let j = 0; j < 15; j++) {
      const p = progress - j * 0.03;
      if (p < 0) break;
      const px = ss.startX + (ss.endX - ss.startX) * p;
      const py = ss.startY + (ss.endY - ss.startY) * p;
      ctx.beginPath();
      ctx.arc(px, py, 2 - j * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${1 - j / 15})`;
      ctx.fill();
    }
  }

  // Draw Fireworks
  for (let i = fireworks.length - 1; i >= 0; i--) {
    const fw = fireworks[i];
    fw.age++;
    if (fw.age > 100) {
      fireworks.splice(i, 1);
      continue;
    }
    fw.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02; // Gravity
      p.life--;
      if (p.life <= 0) return;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life / 100;
      ctx.fill();
    });
  }
  ctx.globalAlpha = 1;

  requestAnimationFrame(animate);
}

animate();
