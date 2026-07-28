import { animate, eases } from 'animejs';

/* ─── Colorway config ─── */
const colorwayFilters = {
  terracotta: 'saturate(1.05) brightness(1.02)',
  black: 'grayscale(1) brightness(0.85) contrast(1.1)',
  cream: 'sepia(0.15) brightness(1.12) saturate(0.7)',
  olive: 'sepia(0.35) hue-rotate(35deg) saturate(0.85) brightness(0.92)',
  tan: 'sepia(0.45) saturate(0.8) brightness(1.08)',
};

const heroImg = document.querySelector('.hero__image');
const swatches = document.querySelectorAll('.swatch');
let currentColorway = 'terracotta';

/* ─── Scroll reveals ─── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const siblings = el.parentElement.querySelectorAll('.reveal');
        const index = Array.from(siblings).indexOf(el);

        try {
          animate(el, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            ease: eases.outExpo,
            delay: index >= 0 ? index * 80 : 0,
          });
        } catch (err) {
          console.error('Reveal animation failed:', err);
          el.style.opacity = '1';
          el.style.transform = 'none';
        }

        revealObserver.unobserve(el);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ─── Fallback: reveal all after timeout if animation hasn't fired ─── */
setTimeout(() => {
  document.querySelectorAll('.reveal').forEach((el) => {
    if (el.style.opacity !== '1') {
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
  });
}, 2000);

/* ─── Glass card cursor highlight ─── */
document.querySelectorAll('.glass').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

/* ─── Nav scroll state ─── */
const nav = document.getElementById('nav');
let navTicking = false;

const updateNav = () => {
  if (window.scrollY > 60) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
  navTicking = false;
};

window.addEventListener('scroll', () => {
  if (!navTicking) {
    requestAnimationFrame(updateNav);
    navTicking = true;
  }
}, { passive: true });

/* ─── Hover micro-interactions on glass cards ─── */
document.querySelectorAll('.drop-card, .collection__card, .journal__item').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    try {
      animate(card, {
        scale: [1, 1.015],
        duration: 300,
        ease: eases.outExpo,
      });
    } catch (err) {
      console.error('Hover animation failed:', err);
    }
  });

  card.addEventListener('mouseleave', () => {
    try {
      animate(card, {
        scale: [1.015, 1],
        duration: 300,
        ease: eases.outExpo,
      });
    } catch (err) {
      console.error('Hover animation failed:', err);
    }
  });
});

/* ─── Colorway switcher ─── */
function switchColorway(colorway) {
  if (colorway === currentColorway || !heroImg) return;

  try {
    animate(heroImg, {
      opacity: [1, 0],
      duration: 250,
      ease: eases.outExpo,
      onComplete: () => {
        heroImg.style.filter = colorwayFilters[colorway] || '';
        animate(heroImg, {
          opacity: [0, 1],
          duration: 250,
          ease: eases.outExpo,
        });
      },
    });
  } catch (err) {
    console.error('Colorway switch failed:', err);
    heroImg.style.filter = colorwayFilters[colorway] || '';
  }

  currentColorway = colorway;
  swatches.forEach((s) => {
    s.classList.toggle('active', s.dataset.colorway === colorway);
  });
}

swatches.forEach((swatch) => {
  swatch.addEventListener('click', () => switchColorway(swatch.dataset.colorway));
});

/* ─── Hero image scale-in on load ─── */
if (heroImg) {
  heroImg.style.opacity = '0';
  heroImg.style.transform = 'scale(0.92)';

  try {
    animate(heroImg, {
      opacity: [0, 1],
      scale: [0.92, 1],
      duration: 1000,
      ease: eases.outExpo,
      delay: 300,
    });
  } catch (err) {
    console.error('Hero scale-in failed:', err);
    heroImg.style.opacity = '1';
    heroImg.style.transform = 'none';
  }

  /* ─── Hero image subtle float ─── */
  try {
    animate(heroImg, {
      translateY: [0, -10, 0],
      duration: 5000,
      ease: 'inOutSine',
      loop: true,
    });
  } catch (err) {
    console.error('Hero float animation failed:', err);
  }
}
