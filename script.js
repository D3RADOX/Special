const canvas = document.getElementById('flames');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Fire particles
let particles = [];
function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height,
    size: Math.random() * 4 + 2,
    speedY: Math.random() * 2 + 1,
    alpha: 1,
    color: `hsl(${Math.random() * 40 + 10}, 100%, 60%)`
  };
}

function animateFire() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (particles.length < 150) {
    particles.push(createParticle());
  }
  particles.forEach((p, index) => {
    p.y -= p.speedY;
    p.alpha -= 0.01;
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    if (p.alpha <= 0) particles.splice(index, 1);
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateFire);
}

// Sequence
function beginSequence() {
  setTimeout(() => {
    document.getElementById('character').style.opacity = 1;
  }, 2000);

  setTimeout(() => {
    document.getElementById('sign').style.opacity = 1;
  }, 4000);

  setTimeout(() => {
    document.getElementById('sign').style.opacity = 0;
    document.getElementById('character').style.opacity = 0;
    document.getElementById('explosion').style.opacity = 1;
  }, 6000);

  setTimeout(() => {
    document.getElementById('explosion').style.opacity = 0;
    document.getElementById('final-message').style.opacity = 1;
  }, 7500);

  setTimeout(() => {
    document.getElementById('final-message').style.opacity = 0;
  }, 10000);
}

animateFire();
beginSequence();