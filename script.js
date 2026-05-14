const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let width = window.innerWidth;
let height = window.innerHeight;
let pointer = { x: width / 2, y: height / 2 };
let trails = [];
const starCount = 260;
const trailMax = 12;

function initStars() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  stars = Array.from({ length: starCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * width,
    o: Math.random() * 0.8 + 0.2,
    vx: Math.random() * 0.4 - 0.2,
    vy: Math.random() * 0.4 - 0.2,
  }));
}

function drawBackground() {
  const gradient = ctx.createRadialGradient(width * 0.2, height * 0.15, 0, width * 0.2, height * 0.15, width * 0.6);
  gradient.addColorStop(0, 'rgba(112, 0, 255, 0.16)');
  gradient.addColorStop(0.55, 'rgba(0,0,0,0.15)');
  gradient.addColorStop(1, '#000000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let y = 0; y < height; y += 90) {
    ctx.beginPath();
    ctx.moveTo(0, y + ((Date.now() * 0.03) % 90));
    ctx.lineTo(width, y + ((Date.now() * 0.03) % 90));
    ctx.stroke();
  }
}

function drawStars() {
  const speed = 0.2 + ((pointer.x - width / 2) / width) * 0.42;
  const driftX = (pointer.x - width / 2) * 0.00022;
  const driftY = (pointer.y - height / 2) * 0.00022;

  stars.forEach((star) => {
    star.z -= speed;
    star.x += star.vx + driftX;
    star.y += star.vy + driftY;
    if (star.z <= 0 || star.x < -120 || star.x > width + 120 || star.y < -120 || star.y > height + 120) {
      star.x = Math.random() * width;
      star.y = Math.random() * height;
      star.z = width;
      star.o = Math.random() * 0.8 + 0.2;
      star.vx = Math.random() * 0.4 - 0.2;
      star.vy = Math.random() * 0.4 - 0.2;
    }

    const px = (star.x - width / 2) * (width / star.z) + width / 2;
    const py = (star.y - height / 2) * (width / star.z) + height / 2;
    const radius = Math.max((1 - star.z / width) * 2.6, 0.4);

    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.o})`;
    ctx.fill();

    if (Math.random() > 0.995) {
      ctx.strokeStyle = `rgba(112, 0, 255, ${star.o * 0.5})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + (Math.random() - 0.5) * 10, py + (Math.random() - 0.5) * 10);
      ctx.stroke();
    }
  });
}

function drawTrails() {
  trails = trails.filter((trail) => trail.life > 0);
  trails.forEach((trail) => {
    trail.life -= 0.03;
    ctx.beginPath();
    ctx.arc(trail.x, trail.y, trail.size * trail.life, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(50,205,50,${trail.life * 0.45})`;
    ctx.fill();
  });
}

function drawCursorTarget() {
  ctx.beginPath();
  ctx.arc(pointer.x, pointer.y, 14, 0, Math.PI * 2);
  const gradient = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 18);
  gradient.addColorStop(0, 'rgba(50,205,50,0.45)');
  gradient.addColorStop(1, 'rgba(50,205,50,0)');
  ctx.fillStyle = gradient;
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  drawBackground();
  drawStars();
  drawTrails();
  drawCursorTarget();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', initStars);
window.addEventListener('mousemove', (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  trails.push({
    x: pointer.x,
    y: pointer.y,
    life: 1,
    size: Math.random() * 1.3 + 1.2,
  });
  if (trails.length > trailMax) trails.shift();
});

const terminalLog = document.getElementById('terminal-log');
const logs = [
  'Initializing Secure Shell...',
  'Establishing encrypted gateway...',
  'Bypassing Firewall... [OK]',
  'Analyzing Rust Memory...',
  'Accessing Mainframe...',
  'Injecting AI Flux...',
  'Scanning ports 21, 22, 80, 443...',
  'Payload crafted for custom exploit.',
  'Decrypting kernel logs...',
  'Verifying hardware integrity...',
  'Isolation sandbox activated.',
  'Recon complete. Persistence achieved.',
];
let logIndex = 0;

function pushTerminalLine() {
  const line = document.createElement('div');
  line.className = 'mb-2 text-slate-300';
  line.textContent = `> ${logs[logIndex % logs.length]}`;
  terminalLog.appendChild(line);
  terminalLog.scrollTop = terminalLog.scrollHeight;
  logIndex += 1;
  if (terminalLog.children.length > 14) {
    terminalLog.removeChild(terminalLog.children[0]);
  }
}

function initTerminal() {
  for (let i = 0; i < 7; i += 1) pushTerminalLine();
  setInterval(pushTerminalLine, 2500);
}

function initScrollReveal() {
  const sections = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach((section) => observer.observe(section));
}

window.addEventListener('DOMContentLoaded', () => {
  initStars();
  animate();
  initTerminal();
  initScrollReveal();
});
