const products = [
  {
    id: 'velocity-nova',
    name: 'Velocity Nova',
    category: 'Runner',
    price: 128,
    rating: '4.9',
    badge: 'Best seller',
    summary: 'Lightweight speed trainer with spring foam and breathable mesh.',
    features: ['Pebax foam', 'Breathable mesh', '8.6 oz'],
    panelA: '#111b33',
    panelB: '#040814',
    panelC: '#0b1020',
    glow: '#8c67ff',
    upperA: '#f5f7ff',
    upperB: '#b3c0dc',
    soleA: '#384664',
    soleB: '#121927',
    accent: '#a88bff',
    lace: '#f6f8ff',
    shadow: '#05070f',
    glowRgb: '140, 103, 255',
  },
  {
    id: 'metro-ghost',
    name: 'Metro Ghost',
    category: 'Street',
    price: 114,
    rating: '4.8',
    badge: 'New drop',
    summary: 'Crisp monochrome sneaker with a cushioned ride and clean lines.',
    features: ['City grip', 'Soft heel', 'Easy wear'],
    panelA: '#101a31',
    panelB: '#050911',
    panelC: '#0b1020',
    glow: '#29d3ff',
    upperA: '#ffffff',
    upperB: '#c6d0e3',
    soleA: '#7f8da8',
    soleB: '#20293d',
    accent: '#63eaff',
    lace: '#f9fbff',
    shadow: '#05070d',
    glowRgb: '41, 211, 255',
  },
  {
    id: 'terrain-pulse',
    name: 'Terrain Pulse',
    category: 'Trail',
    price: 136,
    rating: '4.9',
    badge: 'Weatherproof',
    summary: 'Chunky trail runner with aggressive tread and earth-tone armor.',
    features: ['Grip outsole', 'Shielded upper', 'Mud ready'],
    panelA: '#1a2316',
    panelB: '#080b05',
    panelC: '#10140b',
    glow: '#b3f36d',
    upperA: '#c9b08a',
    upperB: '#8b6e4c',
    soleA: '#52382a',
    soleB: '#1f140e',
    accent: '#d8ff63',
    lace: '#f7f0e2',
    shadow: '#070802',
    glowRgb: '179, 243, 109',
  },
  {
    id: 'cloud-slide',
    name: 'Cloud Slide',
    category: 'Lounge',
    price: 89,
    rating: '4.7',
    badge: 'Soft touch',
    summary: 'Relaxed slip-on with a plush footbed and low-pressure fit.',
    features: ['Slip-on', 'Memory foam', 'All-day wear'],
    panelA: '#23182b',
    panelB: '#0a0710',
    panelC: '#130c18',
    glow: '#ff8a5b',
    upperA: '#f4e9dc',
    upperB: '#cbb8a3',
    soleA: '#b67955',
    soleB: '#5b3324',
    accent: '#ff8b61',
    lace: '#fff8f2',
    shadow: '#050509',
    glowRgb: '255, 138, 91',
  },
  {
    id: 'circuit-low',
    name: 'Circuit Low',
    category: 'Court',
    price: 122,
    rating: '4.8',
    badge: 'Limited',
    summary: 'Low-profile court sneaker with fast cuts and a sharp contrast finish.',
    features: ['Quick turns', 'Light support', 'Court ready'],
    panelA: '#0f1628',
    panelB: '#040710',
    panelC: '#090d18',
    glow: '#ff4fd8',
    upperA: '#f7f5ff',
    upperB: '#9a94ba',
    soleA: '#40415d',
    soleB: '#18172b',
    accent: '#ff4fd8',
    lace: '#ffffff',
    shadow: '#05060f',
    glowRgb: '255, 79, 216',
  },
  {
    id: 'summit-mid',
    name: 'Summit Mid',
    category: 'Mid',
    price: 148,
    rating: '5.0',
    badge: 'Premium',
    summary: 'Supportive mid-top with a padded collar and mountain-ready grip.',
    features: ['Ankle support', 'Cushioned collar', 'Rugged sole'],
    panelA: '#102943',
    panelB: '#050913',
    panelC: '#0b1323',
    glow: '#ffb347',
    upperA: '#e7eef8',
    upperB: '#8fa9c5',
    soleA: '#35495f',
    soleB: '#12192a',
    accent: '#ffb347',
    lace: '#fdfbf7',
    shadow: '#04070d',
    glowRgb: '255, 179, 71',
  },
];

const savedKey = 'shoespot:saved-products';
let savedIds = loadSavedIds();

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function priceLabel(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function svgDataUri(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildShoeSvg(product, variant = 'card') {
  const id = `${slugify(product.id)}-${variant}`;
  const isHero = variant === 'hero';
  const shadowOpacity = isHero ? 0.46 : 0.36;
  const glowOpacity = isHero ? 0.22 : 0.16;
  const shellScale = isHero ? 1 : 0.96;

  const shadow = `
    <ellipse cx="598" cy="656" rx="360" ry="70" fill="${product.shadow}" opacity="${shadowOpacity}" filter="url(#shadow-${id})"/>
  `;

  const halo = `
    <circle cx="220" cy="150" r="${isHero ? 180 : 140}" fill="${product.glow}" opacity="${glowOpacity}"/>
    <circle cx="975" cy="190" r="${isHero ? 130 : 108}" fill="${product.accent}" opacity="${isHero ? 0.12 : 0.08}"/>
  `;

  const grid = isHero
    ? `
      <g stroke="rgba(255,255,255,.12)" stroke-width="2" opacity=".65">
        <path d="M 120 676 H 1080"/>
        <path d="M 165 620 H 1035"/>
        <path d="M 210 566 H 990"/>
        <path d="M 260 516 H 940"/>
        <path d="M 315 470 H 885"/>
        <path d="M 372 430 H 828"/>
        <path d="M 430 397 H 770"/>
      </g>
    `
    : '';

  const upperPath = `
    M 198 507
    C 228 459 284 426 364 409
    C 451 391 544 395 624 408
    C 699 420 761 436 814 456
    C 857 472 896 490 923 509
    C 933 516 935 526 928 533
    C 916 544 893 548 853 548
    L 310 548
    C 255 548 214 535 205 520
    C 201 514 201 511 198 507 Z
  `;

  const solePath = `
    M 138 548
    C 160 498 224 461 319 447
    C 452 428 587 434 708 451
    C 800 463 879 479 942 502
    C 983 516 1020 542 1030 571
    C 1037 592 1020 610 995 618
    C 942 635 853 642 732 642
    L 270 642
    C 202 642 153 624 137 596
    C 127 578 127 563 138 548 Z
  `;

  const outsolePath = `
    M 160 559
    C 190 527 249 505 338 495
    C 468 480 596 487 711 501
    C 797 511 868 527 925 545
    C 952 553 968 563 970 576
    C 972 590 956 598 936 601
    L 275 601
    C 220 601 175 588 164 573
    C 160 568 158 563 160 559 Z
  `;

  const heelPath = `
    M 203 507
    C 206 470 220 438 243 412
    C 257 396 278 389 298 392
    C 318 395 333 406 344 421
    C 323 440 304 462 290 488
    C 275 495 257 503 243 511
    C 228 519 211 518 203 507 Z
  `;

  const panelPath = `
    M 326 445
    C 431 422 540 420 641 432
    C 711 440 767 455 816 474
    C 780 487 734 495 685 499
    C 594 506 497 502 404 491
    C 364 486 334 476 325 467
    C 317 459 317 450 326 445 Z
  `;

  const toePath = `
    M 753 454
    C 801 462 846 474 884 491
    C 904 500 915 509 916 521
    C 917 534 903 541 878 542
    C 836 543 790 542 747 538
    C 758 517 761 486 753 454 Z
  `;

  const shinePath = `
    M 248 449
    C 305 431 375 423 454 423
    C 438 443 429 465 426 488
    C 350 486 290 474 248 449 Z
  `;

  const accentStripe = `
    M 376 463 C 456 448 546 447 632 458 C 692 466 747 480 792 500
  `;

  const laceLines = [
    'M 450 406 L 523 406',
    'M 470 387 L 544 387',
    'M 490 368 L 563 368',
    'M 512 348 L 582 348',
    'M 535 331 L 598 331',
  ];

  const laceLoops = [
    'M 546 394 L 615 394',
    'M 562 375 L 631 375',
  ];

  return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 860" role="img" aria-label="${escapeHtml(product.name)} shoe illustration">
      <defs>
        <radialGradient id="glow-${id}" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stop-color="${product.glow}" stop-opacity=".45"/>
          <stop offset="50%" stop-color="${product.glow}" stop-opacity=".12"/>
          <stop offset="100%" stop-color="${product.glow}" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="sole-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${product.soleA}"/>
          <stop offset="58%" stop-color="${product.soleB}"/>
          <stop offset="100%" stop-color="#05070d"/>
        </linearGradient>
        <linearGradient id="upper-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${product.upperA}"/>
          <stop offset="62%" stop-color="${product.upperB}"/>
          <stop offset="100%" stop-color="#66728c"/>
        </linearGradient>
        <linearGradient id="shine-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity=".85"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
        <filter id="shadow-${id}" x="-40%" y="-40%" width="180%" height="220%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="18"/>
          <feOffset dx="0" dy="8" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope=".9"/>
          </feComponentTransfer>
        </filter>
      </defs>
      <rect x="0" y="0" width="1200" height="860" rx="48" fill="none"/>
      <g opacity=".9">
        ${halo}
        ${grid}
      </g>
      <ellipse cx="596" cy="654" rx="${isHero ? 372 : 340}" ry="${isHero ? 74 : 64}" fill="${product.shadow}" opacity="${shadowOpacity}" filter="url(#shadow-${id})"/>
      <g transform="translate(118 110) scale(${shellScale}) rotate(-8 480 320)">
        <path d="${solePath}" fill="url(#sole-${id})"/>
        <path d="${outsolePath}" fill="#0d1118" opacity=".88"/>
        <path d="${upperPath}" fill="url(#upper-${id})"/>
        <path d="${heelPath}" fill="url(#upper-${id})"/>
        <path d="${panelPath}" fill="${product.glow}" opacity=".28"/>
        <path d="${toePath}" fill="${product.accent}" opacity=".78"/>
        <path d="${shinePath}" fill="url(#shine-${id})" opacity=".35"/>
        <path d="${accentStripe}" fill="none" stroke="${product.accent}" stroke-width="14" stroke-linecap="round" opacity=".95"/>
        <g stroke="${product.lace}" stroke-width="10" stroke-linecap="round" opacity=".96">
          ${laceLines.map((d) => `<path d="${d}"/>`).join('')}
        </g>
        <g stroke="${product.lace}" stroke-width="8" stroke-linecap="round" opacity=".82">
          ${laceLoops.map((d) => `<path d="${d}"/>`).join('')}
        </g>
        <path d="M 380 438 C 470 423 563 421 653 432 C 683 436 709 442 733 450" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="8" stroke-linecap="round"/>
        <path d="M 284 545 C 388 537 510 539 622 547" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="6" stroke-linecap="round"/>
        <circle cx="661" cy="438" r="8" fill="${product.accent}"/>
        <circle cx="690" cy="450" r="6" fill="${product.accent}" opacity=".88"/>
        <circle cx="715" cy="465" r="5" fill="${product.accent}" opacity=".78"/>
      </g>
    </svg>
  `);
}

function loadSavedIds() {
  try {
    const raw = localStorage.getItem(savedKey);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function persistSavedIds() {
  try {
    localStorage.setItem(savedKey, JSON.stringify([...savedIds]));
  } catch {
    // Ignore storage failures in private mode or restrictive browsers.
  }
}

function updateSavedCount() {
  const count = savedIds.size;
  document.querySelectorAll('[data-saved-count], [data-brand-saved-count]').forEach((node) => {
    node.textContent = String(count);
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('toast--visible');
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.classList.remove('toast--visible');
  }, 1800);
}

function buildProductCard(product, options = {}) {
  const saved = savedIds.has(product.id);
  const size = options.compact ? 'compact' : 'default';
  const imageVariant = options.hero ? 'hero' : 'card';
  const image = buildShoeSvg(product, imageVariant);

  return `
    <article class="product-card product-card--${size}" data-id="${product.id}" data-category="${escapeHtml(product.category.toLowerCase())}" style="--panel-a:${product.panelA};--panel-b:${product.panelB};--panel-c:${product.panelC};--glow:${product.glow};--glow-rgb:${product.glowRgb};--accent:${product.accent};">
      <div class="product-media">
        <img class="product-art" src="${image}" alt="${escapeHtml(product.name)} shoe render" loading="lazy">
        <span class="product-badge">${escapeHtml(product.badge)}</span>
      </div>
      <div class="product-copy">
        <div class="product-head">
          <div>
            <p class="product-category">${escapeHtml(product.category)}</p>
            <h3>${escapeHtml(product.name)}</h3>
          </div>
          <div class="product-rating" aria-label="${product.rating} out of 5 stars">
            <span>★</span>
            <strong>${product.rating}</strong>
          </div>
        </div>
        <p class="product-summary">${escapeHtml(product.summary)}</p>
        <div class="product-features">
          ${product.features.map((feature) => `<span>${escapeHtml(feature)}</span>`).join('')}
        </div>
        <div class="product-footer">
          <div>
            <span class="product-price">${priceLabel(product.price)}</span>
            <small>Free shipping over $100</small>
          </div>
          <button class="save-btn" type="button" data-save-id="${product.id}" aria-pressed="${saved ? 'true' : 'false'}">
            ${saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderGrid(container, items, options = {}) {
  if (!container) return;
  container.innerHTML = items.map((product) => buildProductCard(product, options)).join('');
}

function getCatalogState() {
  return {
    category: 'all',
    query: '',
    sort: 'featured',
  };
}

function filterAndSortProducts(list, state) {
  const query = state.query.trim().toLowerCase();
  const category = state.category;

  let filtered = list.filter((product) => {
    const matchesCategory = category === 'all' || product.category.toLowerCase() === category;
    const haystack = [
      product.name,
      product.category,
      product.summary,
      product.badge,
      ...product.features,
    ]
      .join(' ')
      .toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesCategory && matchesQuery;
  });

  switch (state.sort) {
    case 'price-low':
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered = filtered.slice().sort((a, b) => Number(b.rating) - Number(a.rating));
      break;
    default:
      filtered = filtered.slice();
  }

  return filtered;
}

function renderHeroCube(container) {
  if (!container) return;

  const faces = [
    ['front', products[0]],
    ['right', products[1]],
    ['back', products[4]],
    ['left', products[2]],
    ['top', products[3]],
    ['bottom', products[5]],
  ];

  container.innerHTML = faces
    .map(
      ([face, product]) => `
        <figure class="cube-face cube-face--${face}" style="--panel-a:${product.panelA};--panel-b:${product.panelB};--panel-c:${product.panelC};--glow:${product.glow};--glow-rgb:${product.glowRgb};--accent:${product.accent};">
          <img class="cube-art" src="${buildShoeSvg(product, 'hero')}" alt="${escapeHtml(product.name)} 3D preview">
          <figcaption class="cube-caption">
            <span>${escapeHtml(product.category)}</span>
            <strong>${escapeHtml(product.name)}</strong>
          </figcaption>
        </figure>
      `,
    )
    .join('');
}

function initHeroTilt() {
  const shell = document.querySelector('[data-hero-shell]');
  if (!shell) return;

  const maxX = 12;
  const maxY = 18;

  const reset = () => {
    shell.style.setProperty('--rx', '0deg');
    shell.style.setProperty('--ry', '0deg');
  };

  shell.addEventListener('pointermove', (event) => {
    const rect = shell.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    shell.style.setProperty('--rx', `${((0.5 - y) * maxX).toFixed(2)}deg`);
    shell.style.setProperty('--ry', `${((x - 0.5) * maxY).toFixed(2)}deg`);
  });

  shell.addEventListener('pointerleave', reset);
  shell.addEventListener('blur', reset);
}

function initSaveButtons() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-save-id]');
    if (!button) return;

    const id = button.getAttribute('data-save-id');
    if (!id) return;

    if (savedIds.has(id)) {
      savedIds.delete(id);
      button.textContent = 'Save';
      button.setAttribute('aria-pressed', 'false');
      showToast('Removed from saved shoes');
    } else {
      savedIds.add(id);
      button.textContent = 'Saved';
      button.setAttribute('aria-pressed', 'true');
      showToast('Saved to your collection');
    }

    persistSavedIds();
    updateSavedCount();
  });
}

function initCatalogControls() {
  const catalogGrid = document.querySelector('[data-catalog-grid]');
  const catalogFilters = document.querySelector('[data-catalog-filters]');
  const catalogSearch = document.querySelector('[data-catalog-search]');
  const catalogSort = document.querySelector('[data-catalog-sort]');
  if (!catalogGrid && !catalogFilters && !catalogSearch && !catalogSort) return;

  const state = getCatalogState();

  const syncActiveFilters = () => {
    if (!catalogFilters) return;
    catalogFilters.querySelectorAll('[data-category]').forEach((button) => {
      const active = button.getAttribute('data-category') === state.category;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  };

  const syncSort = () => {
    if (catalogSort) {
      catalogSort.value = state.sort;
    }
  };

  const renderCatalog = () => {
    const filtered = filterAndSortProducts(products, state);
    renderGrid(catalogGrid, filtered);
    updateSavedCount();
    const results = document.querySelector('[data-catalog-results]');
    if (results) {
      results.textContent = `${filtered.length} shoe${filtered.length === 1 ? '' : 's'} found`;
    }
  };

  if (catalogFilters) {
    catalogFilters.addEventListener('click', (event) => {
      const button = event.target.closest('[data-category]');
      if (!button) return;
      state.category = button.getAttribute('data-category') || 'all';
      syncActiveFilters();
      renderCatalog();
    });
  }

  if (catalogSearch) {
    catalogSearch.addEventListener('input', (event) => {
      state.query = event.target.value;
      renderCatalog();
    });
  }

  if (catalogSort) {
    catalogSort.addEventListener('change', (event) => {
      state.sort = event.target.value;
      renderCatalog();
    });
  }

  syncActiveFilters();
  syncSort();
  renderCatalog();
}

function initFeaturedGrids() {
  const featuredGrid = document.querySelector('[data-featured-grid]');
  if (featuredGrid) {
    renderGrid(featuredGrid, products, { hero: false });
  }
}

function initCatalogHero() {
  const heroGrid = document.querySelector('[data-catalog-hero]');
  if (!heroGrid) return;
  heroGrid.innerHTML = products
    .slice(0, 3)
    .map((product) => {
      return `
        <div class="catalog-hero-card" style="--panel-a:${product.panelA};--panel-b:${product.panelB};--panel-c:${product.panelC};--glow:${product.glow};--glow-rgb:${product.glowRgb};">
          <img src="${buildShoeSvg(product, 'card')}" alt="${escapeHtml(product.name)}">
          <div>
            <p>${escapeHtml(product.category)} • ${escapeHtml(product.badge)}</p>
            <strong>${escapeHtml(product.name)}</strong>
          </div>
        </div>
      `;
    })
    .join('');
}

function initStats() {
  const stats = document.querySelectorAll('[data-stat]');
  stats.forEach((node) => {
    const value = node.getAttribute('data-stat');
    if (value) node.textContent = value;
  });
}

function initPageMetadata() {
  const year = document.querySelector('[data-year]');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

function initBadges() {
  document.querySelectorAll('[data-brand-saved-count]').forEach((node) => {
    node.textContent = String(savedIds.size);
  });
}

function initReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  items.forEach((item) => observer.observe(item));
}

function initAllProductSections() {
  initPageMetadata();
  initBadges();
  initStats();
  initHeroTilt();
  initSaveButtons();
  initFeaturedGrids();
  renderHeroCube(document.querySelector('[data-hero-cube]'));
  initCatalogControls();
  initCatalogHero();
  initReveal();
  updateSavedCount();
}

document.addEventListener('DOMContentLoaded', initAllProductSections);
