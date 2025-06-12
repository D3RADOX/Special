const canvas = document.getElementById('flames');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height,
    size: Math.random() * 6 + 2,
    speedY: Math.random() * 3 + 1,
    alpha: 1,
    color: `hsl(${Math.random() * 60 + 10}, 100%, 60%)`
  };
}

function animateFire() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (particles.length < 200) particles.push(createParticle());
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

// Explosion + Final Phrase
function sequenceTrigger() {
  setTimeout(() => {
    const explosion = document.getElementById('explosion');
    explosion.style.transition = 'all 0.8s ease-in-out';
    explosion.style.opacity = '1';
    explosion.style.width = '300px';
    explosion.style.height = '300px';
  }, 5000);

  setTimeout(() => {
    document.getElementById('explosion').style.opacity = 0;
    typeMessage("You Were Born For This");
  }, 6500);
}

// Typewriter animation
function typeMessage(text) {
  const el = document.getElementById('final-message');
  let index = 0;
  el.style.opacity = 1;
  function typeNext() {
    if (index < text.length) {
      el.textContent += text[index++];
      setTimeout(typeNext, 80);
    }
  }
  typeNext();
}

animateFire();
sequenceTrigger();