/* =========================================================
   Shadab Ansari · Portfolio scripts (no libraries needed)
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EMAIL = 'shadabahamed63@gmail.com';

  /* ---------- Loader ---------- */
  var loader = document.getElementById('loader');
  function hideLoader() { if (loader) loader.classList.add('is-hidden'); }
  window.addEventListener('load', function () { setTimeout(hideLoader, 250); });
  setTimeout(hideLoader, 2500); // safety net on slow connections

  /* ---------- Theme toggle (remembers the choice) ---------- */
  var themeBtn = document.getElementById('themeToggle');
  function currentTheme() {
    return root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  themeBtn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ---------- Mobile menu ---------- */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  function setMenu(open) {
    navMenu.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  navToggle.addEventListener('click', function () { setMenu(!navMenu.classList.contains('is-open')); });
  navMenu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', function (e) {
    if (navMenu.classList.contains('is-open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) setMenu(false);
  });

  /* ---------- Scroll: navbar, progress bar, back-to-top ---------- */
  var progress = document.getElementById('progress');
  var toTop = document.getElementById('toTop');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle('is-scrolled', y > 20);
    progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    toTop.classList.toggle('is-visible', y > 700);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Active nav link ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + entry.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------- Typing effect (edit the roles here) ---------- */
  var roles = ['Machine Learning Engineer', 'Data Scientist', 'Explainable AI Researcher', 'MLOps Enthusiast'];
  var typed = document.getElementById('typed');
  if (typed && !reduceMotion) {
    var r = 0, c = roles[0].length, deleting = true;
    setTimeout(function tick() {
      var word = roles[r];
      c += deleting ? -1 : 1;
      typed.textContent = word.slice(0, c);
      var delay = deleting ? 38 : 75;
      if (!deleting && c === word.length) { deleting = true; delay = 1900; }
      else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 300; }
      setTimeout(tick, delay);
    }, 2400);
  }

  /* ---------- More projects (data comes from assets/js/projects.js) ---------- */
  var grid = document.getElementById('projectGrid');
  var filtersEl = document.getElementById('projectFilters');
  var projects = window.PROJECTS || [];
  var catNames = window.CATEGORY_NAMES || {};

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function projectCard(p) {
    var media = p.image
      ? '<div class="project__img"><img src="' + esc(p.image) + '" alt="' + esc(p.title) + ' screenshot" loading="lazy" /></div>'
      : '<div class="project__top"><span class="project__folder"><svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M3 6.5A2.5 2.5 0 0 1 5.5 4H9l2 2.5h7.5A2.5 2.5 0 0 1 21 9v8.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/></svg></span>' +
        (p.badge ? '<span class="project__badge">' + esc(p.badge) + '</span>' : '') + '</div>';
    var tags = (p.tags || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
    var linkHtml = '';
    if (p.github) linkHtml += '<a href="' + esc(p.github) + '" target="_blank" rel="noopener"><svg><use href="#i-github"/></svg> Code</a>';
    if (p.live) linkHtml += '<a href="' + esc(p.live) + '" target="_blank" rel="noopener"><svg><use href="#i-out"/></svg> Live demo</a>';
    return '<article class="card glow project reveal" data-category="' + esc(p.category) + '">' +
      media +
      '<h4>' + esc(p.title) + '</h4>' +
      '<p>' + esc(p.description) + '</p>' +
      (tags ? '<ul class="chips chips--sm">' + tags + '</ul>' : '') +
      (linkHtml ? '<div class="project__links">' + linkHtml + '</div>' : '') +
      '</article>';
  }

  if (grid) {
    grid.innerHTML = projects.map(projectCard).join('') +
      '<article class="card project project--soon reveal" data-category="all">' +
        '<div class="project__top"><span class="project__folder"><svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 5v14M5 12h14"/></svg></span></div>' +
        '<h4>More on the way</h4>' +
        '<p>New machine learning projects and experiments land on GitHub first.</p>' +
        '<a href="https://github.com/shadabdln?tab=repositories" class="btn btn--ghost btn--sm" target="_blank" rel="noopener">See all repositories <svg><use href="#i-out"/></svg></a>' +
      '</article>';

    // Filter buttons, only shown when there is more than one category
    var cats = [];
    projects.forEach(function (p) { if (p.category && cats.indexOf(p.category) === -1) cats.push(p.category); });
    if (cats.length > 1) {
      filtersEl.innerHTML = '<button class="filter is-active" type="button" data-filter="all">All</button>' +
        cats.map(function (c) { return '<button class="filter" type="button" data-filter="' + esc(c) + '">' + esc(catNames[c] || c) + '</button>'; }).join('');
      filtersEl.addEventListener('click', function (e) {
        var btn = e.target.closest('.filter');
        if (!btn) return;
        var f = btn.getAttribute('data-filter');
        filtersEl.querySelectorAll('.filter').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        grid.querySelectorAll('.project').forEach(function (card) {
          var cat = card.getAttribute('data-category');
          card.classList.toggle('is-hidden', !(f === 'all' || cat === f || cat === 'all'));
        });
      });
    }
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) {
      var siblings = Array.prototype.filter.call(el.parentNode.children, function (n) { return n.classList.contains('reveal'); });
      el.style.transitionDelay = Math.min(siblings.indexOf(el), 5) * 80 + 'ms';
      revealObserver.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Card glow follows the mouse ---------- */
  if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('pointermove', function (e) {
      var card = e.target.closest && e.target.closest('.glow');
      if (!card) return;
      var rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
  }

  /* ---------- Figure lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  var lbCap = document.getElementById('lightboxCaption');
  document.querySelectorAll('.gallery__item').forEach(function (item) {
    item.addEventListener('click', function () {
      lbImg.src = item.getAttribute('data-full');
      lbImg.alt = item.querySelector('img').alt;
      lbCap.textContent = item.getAttribute('data-caption') || '';
      if (typeof lightbox.showModal === 'function') lightbox.showModal();
      else window.open(lbImg.src, '_blank');
    });
  });
  lightbox.querySelector('.lightbox__close').addEventListener('click', function () { lightbox.close(); });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.close(); });

  /* ---------- Contact form (Formspree) ----------
     The Formspree URL lives in index.html, in the form's action="...".
     While it still says YOUR_FORM_ID, the form opens the visitor's email app. */
  var form = document.getElementById('contactForm');
  var statusEl = document.getElementById('formStatus');
  var formBtn = document.getElementById('formBtn');
  var btnLabel = formBtn.querySelector('.btn__label');

  function setStatus(msg, type) {
    statusEl.textContent = msg;
    statusEl.className = 'form__status' + (type ? ' is-' + type : '');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var required = ['name', 'email', 'message'].map(function (id) { return form.elements[id]; });
    var valid = true;
    required.forEach(function (f) {
      var v = f.value.trim();
      var ok = v !== '' && (f.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      f.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });
    if (!valid) { setStatus('Please fill in your name, a valid email and a message.', 'error'); return; }

    var endpoint = form.getAttribute('action') || '';
    var configured = /formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint) && endpoint.indexOf('YOUR_FORM_ID') === -1;

    if (!configured) {
      var subject = form.elements.subject.value.trim() || ('Portfolio enquiry from ' + form.elements.name.value.trim());
      var body = form.elements.message.value.trim() + '\n\n' + form.elements.name.value.trim() + '\n' + form.elements.email.value.trim();
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      setStatus('Opening your email app…', 'ok');
      return;
    }

    formBtn.disabled = true;
    btnLabel.textContent = 'Sending…';
    setStatus('');
    fetch(endpoint, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) })
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed');
        form.reset();
        setStatus('Thank you! Your message has been sent. I\'ll get back to you soon.', 'ok');
      })
      .catch(function () {
        setStatus('Sorry, that didn\'t go through. Please email ' + EMAIL + ' directly.', 'error');
      })
      .then(function () {
        formBtn.disabled = false;
        btnLabel.textContent = 'Send message';
      });
  });

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
