'use strict';

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  if (backToTopBtn) backToTopBtn.classList.toggle('visible', window.scrollY > 400);
});

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

navAnchors.forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

/* ===== BACK TO TOP ===== */
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== MATRIX CANVAS ===== */
(function () {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>/\\{}[]()';
  let cols, drops;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 18);
    drops = Array(cols).fill(1);
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = 'rgba(10,14,23,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff88';
    ctx.font = '14px Share Tech Mono';
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 18, y * 18);
      if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }
  setInterval(draw, 55);
})();

/* ===== TYPEWRITER ===== */
(function () {
  const el = document.getElementById('typewriter-text');
  const phrases = [
    'Red Team Intern',
    'SIEM Engineer',
    'CTF Player',
    'Penetration Tester',
    'Digital Forensics Enthusiast',
    'Open-Source Tool Builder',
    'Threat Intelligence Analyst',
  ];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 50 : 85);
  }
  setTimeout(type, 800);
})();

/* ===== SCROLL-REVEAL (Intersection Observer) ===== */
(function () {
  const selectors = [
    '.timeline-item',
    '.project-card',
    '.skill-category',
    '.cert-card',
    '.achievement-card',
  ];
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e, idx) => {
      if (e.isIntersecting) {
        // stagger siblings for a cascade effect
        const siblings = e.target.closest('.timeline, .projects-grid, .skills-grid, .cert-grid, .achievements-row');
        if (siblings) {
          const all = siblings.querySelectorAll(e.target.tagName + ', [data-category]');
          const i = Array.from(all).indexOf(e.target);
          e.target.style.transitionDelay = `${i * 60}ms`;
        }
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => revealObserver.observe(el));
  });
})();

/* ===== PROJECT FILTER ===== */
(function () {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        if (match && !card.classList.contains('visible')) {
          card.classList.add('visible');
        }
      });
    });
  });
})();

/* ===== CONTACT FORM (mailto fallback) ===== */
(function () {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill out all fields.';
      status.className = 'form-note error';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email.';
      status.className = 'form-note error';
      return;
    }

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:231315@students.au.edu.pk?subject=${subject}&body=${body}`;

    status.textContent = 'Opening your mail client...';
    status.className = 'form-note';
    form.reset();
  });
})();

/* ===== BOOT LOADER ===== */
(function () {
  const loader   = document.getElementById('boot-loader');
  const phase1   = document.getElementById('boot-phase-1');
  const phase2   = document.getElementById('boot-phase-2');
  const linesEl  = document.getElementById('boot-lines');
  const barEl    = document.getElementById('boot-bar');
  const skipEl   = document.getElementById('boot-skip');
  const greetEl  = document.getElementById('boot-greeting');
  const titleEl  = document.getElementById('boot-title');
  const tagEl    = document.getElementById('boot-tagline');

  // Skip if already visited this session
  if (sessionStorage.getItem('booted')) {
    loader.classList.add('hidden');
    return;
  }

  let skipped = false;

  /* ---- Mini matrix canvas for boot screen ---- */
  (function () {
    const c   = document.getElementById('boot-matrix');
    const ctx = c.getContext('2d');
    const ch  = '01アイウエオカキクケコ<>/\\{}';
    let cols, drops;
    function resize() {
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
      cols  = Math.floor(c.width / 20);
      drops = Array(cols).fill(1);
    }
    resize();
    window.addEventListener('resize', resize);
    setInterval(() => {
      if (skipped) return;
      ctx.fillStyle = 'rgba(0,0,0,0.07)';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = '#00ff88';
      ctx.font = '13px Share Tech Mono';
      drops.forEach((y, i) => {
        ctx.fillText(ch[Math.floor(Math.random() * ch.length)], i * 20, y * 20);
        if (y * 20 > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 60);
  })();

  /* ---- Skip handler ---- */
  function skip() {
    if (skipped) return;
    skipped = true;
    barEl.style.width = '100%';
    setTimeout(() => {
      loader.classList.add('hidden');
      sessionStorage.setItem('booted', '1');
    }, 500);
  }
  document.addEventListener('keydown', skip, { once: true });
  loader.addEventListener('click', skip);

  /* ---- Typewriter helper ---- */
  function typeText(el, text, speed, callback) {
    let i = 0;
    el.textContent = '';
    function next() {
      if (skipped) { el.textContent = text; if (callback) callback(); return; }
      if (i <= text.length) {
        el.textContent = text.slice(0, i++);
        setTimeout(next, speed);
      } else if (callback) {
        callback();
      }
    }
    next();
  }

  /* ---- Phase 1: Welcome text ---- */
  const greeting = '// Welcome to my portfolio';
  const name     = 'HOOR UL EIN SOOMRO';
  const tagline  = 'Exploit code, not people.';

  // Step 1: type greeting
  setTimeout(() => {
    typeText(greetEl, greeting, 40, () => {
      // Step 2: type name with a beat
      setTimeout(() => {
        typeText(titleEl, name, 55, () => {
          // Step 3: type tagline
          setTimeout(() => {
            tagEl.style.borderRight = '2px solid var(--accent)';
            typeText(tagEl, tagline, 55, () => {
              tagEl.style.animation = 'caretBlink 0.8s step-end infinite';
              // hold for 1.2s then transition to phase 2
              setTimeout(transitionToPhase2, 1200);
            });
          }, 300);
        });
      }, 300);
    });
  }, 400);

  /* ---- Transition: phase 1 → phase 2 ---- */
  function transitionToPhase2() {
    if (skipped) return;
    phase1.style.opacity = '0';
    setTimeout(() => {
      if (skipped) return;
      phase1.style.display = 'none';
      phase2.classList.remove('boot-phase-hidden');
      phase2.style.opacity = '0';
      requestAnimationFrame(() => {
        phase2.style.transition = 'opacity 0.4s ease';
        phase2.style.opacity = '1';
        startLoadingPhase();
      });
    }, 500);
  }

  /* ---- Phase 2: loading lines ---- */
  const lines = [
    { text: '[  OK  ] Loading threat intelligence feeds...', cls: 'boot-ok' },
    { text: '[  OK  ] Mounting encrypted volumes...', cls: 'boot-ok' },
    { text: '[ WARN ] CVE-2024-1337 in scope — logged', cls: 'boot-warn' },
    { text: '[  OK  ] Starting SIEM daemon (wazuh)...', cls: 'boot-ok' },
    { text: '[  OK  ] Spawning recon agents...', cls: 'boot-ok' },
    { text: '[  OK  ] Decrypting portfolio payload...', cls: 'boot-ok' },
  ];

  function startLoadingPhase() {
    let idx = 0;
    function addLine() {
      if (skipped || idx >= lines.length) return;
      const span = document.createElement('span');
      span.className = `boot-line ${lines[idx].cls}`;
      span.textContent = lines[idx].text;
      linesEl.appendChild(span);
      barEl.style.width = `${Math.round(((idx + 1) / lines.length) * 100)}%`;
      idx++;
      if (idx < lines.length) {
        setTimeout(addLine, 280 + Math.random() * 160);
      } else {
        setTimeout(skip, 600);
      }
    }
    addLine();
  }
})();

/* ===== BLOG FEED (Medium RSS via rss2json) ===== */
(function () {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  const MEDIUM_RSS = 'https://medium.com/feed/@hosopunk5';
  const API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS)}&count=6`;

  function formatDate(str) {
    try {
      return new Date(str).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch { return ''; }
  }

  function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || '';
  }

  function extractImg(content) {
    const m = content.match(/<img[^>]+src=["']([^"']+)["']/);
    return m ? m[1] : null;
  }

  fetch(API)
    .then(r => r.json())
    .then(data => {
      if (!data.items || !data.items.length) throw new Error('no items');

      grid.innerHTML = '';
      data.items.slice(0, 6).forEach((item, i) => {
        const imgSrc = item.thumbnail || extractImg(item.content || '') || null;
        const desc   = stripHtml(item.description || item.content || '').slice(0, 160);

        const card = document.createElement('div');
        card.className = 'blog-card';
        card.style.transitionDelay = `${i * 80}ms`;
        card.innerHTML = `
          ${imgSrc
            ? `<img src="${imgSrc}" alt="${item.title}" class="blog-card-img" loading="lazy" onerror="this.style.display='none'" />`
            : `<div class="blog-card-img-placeholder"><i class="fas fa-pen-nib"></i></div>`}
          <div class="blog-card-body">
            <p class="blog-card-date">${formatDate(item.pubDate)}</p>
            <h3 class="blog-card-title">${item.title}</h3>
            <p class="blog-card-desc">${desc}…</p>
            <a href="${item.link}" target="_blank" rel="noopener" class="blog-card-link">
              Read article <i class="fas fa-arrow-right"></i>
            </a>
          </div>`;
        grid.appendChild(card);

        // Trigger reveal
        requestAnimationFrame(() => {
          setTimeout(() => card.classList.add('visible'), i * 80 + 50);
        });
      });
    })
    .catch(() => {
      // Fallback: show static links if fetch fails (CORS / no articles yet)
      grid.innerHTML = `
        <div class="blog-error">
          <p>Couldn't load articles automatically. <br/>
          <a href="https://medium.com/@hosopunk5" target="_blank" rel="noopener">Read them directly on Medium →</a></p>
        </div>`;
    });
})();

/* ===== CUSTOM CURSOR ===== */
(function () {
  // Skip on touch-only devices
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let rafId;

  // Dot follows cursor instantly
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Ring follows with smooth lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state on interactive elements
  const hoverTargets = 'a, button, input, textarea, select, label, [data-filter], .project-card, .cert-card, .social-btn, .skill-pills span';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // Click pulse
  document.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-click');
  });
  document.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-click');
  });

  // Hide when mouse leaves window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();

/* Dev helper — uncomment to always show boot screen during testing:
   sessionStorage.removeItem('booted');
*/
