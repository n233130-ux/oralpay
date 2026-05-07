/* ─── CURSOR ─── */
const cur = document.getElementById('cursor');
let mx = -40, my = -40;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function loop() {
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a, button, .ctx, .ben-item, .mq-item').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('big'));
  el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});

/* ─── CHART BARS ─── */
const barsEl = document.getElementById('bars');
[28, 40, 35, 55, 50, 72, 88, 95, 78, 65, 50, 42].forEach((h, i) => {
  const b = document.createElement('div');
  b.className = 'br';
  b.style.height = h + '%';
  b.style.background = i === 7
    ? 'var(--sky)'
    : `rgba(46,184,230,${0.1 + h / 100 * 0.38})`;
  barsEl.appendChild(b);
});

/* ─── SCROLL REVEAL ─── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.prob-item, .ben-item, .ctx, .al-item, .reveal').forEach(el => {
  io.observe(el);
});

/* ─── HERO PARALLAX ─── */
window.addEventListener('scroll', () => {
  const el = document.querySelector('.hero-h1');
  if (el) el.style.transform = `translateY(${window.scrollY * 0.16}px)`;
}, { passive: true });

/* ─── ACTIVE NAV LINK ON SCROLL ─── */
const sections = ['problem', 'solution', 'console-section', 'for-who', 'analytics'];
const navLinks = document.querySelectorAll('.nav-link[data-section]');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(id => {
  const el = document.getElementById(id);
  if (el) navObserver.observe(el);
});

/* ─── NAV CTA — "Copied" FEEDBACK ─── */
const ctaBtn = document.getElementById('nav-cta-btn');
ctaBtn.addEventListener('click', function () {
  if (this.classList.contains('copied')) return;

  navigator.clipboard && navigator.clipboard.writeText('demo@orlaypay.com').catch(() => {});
  this.classList.add('copied');

  const def = this.querySelector('.cta-default');
  def.textContent = 'Copiato!';

  setTimeout(() => {
    this.classList.remove('copied');
    def.textContent = 'Demo →';
  }, 2000);
});

/* ─── NAV HIDE / SHOW ON SCROLL DIRECTION ─── */
let lastY = 0;
const nav = document.getElementById('main-nav');
nav.style.transition = 'transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s';

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 80) {
    nav.style.transform = y > lastY
      ? 'translateX(-50%) translateY(-90px)'  /* scrolling down — hide */
      : 'translateX(-50%) translateY(0)';      /* scrolling up  — show */
  } else {
    nav.style.transform = 'translateX(-50%) translateY(0)';
  }
  lastY = y;
}, { passive: true });
