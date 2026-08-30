/* ============================================================
   Jenni Pho site behaviour
   Vanilla JS, no dependencies, no build step.
   ============================================================ */
(function () {
  "use strict";

  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const money = (n) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  /* ----------------------------------------------------------
     Media: try a real photo first, fall back to the built-in
     illustration. Drop JPGs in assets/photos/ to upgrade the
     site without touching any markup.
     ---------------------------------------------------------- */
  function photoFor(slot) {
    return (typeof PHOTOS === "object" && PHOTOS && slot && PHOTOS[slot]) || null;
  }

  function media(art, slot, alt, cls) {
    const art_src = `assets/img/${art}.svg`;
    const photo = photoFor(slot);
    const src = photo ? `assets/photos/${photo}` : art_src;
    // The illustrations are a couple of KB each. Lazy-loading them only
    // buys pop-in. Real photographs are worth deferring.
    return (
      `<img src="${src}" alt="${esc(alt || "")}" decoding="async"` +
      (photo ? ` loading="lazy"` : "") +
      (cls ? ` class="${cls}"` : "") +
      (photo ? ` data-fallback="${art_src}" onerror="this.onerror=null;this.src=this.dataset.fallback"` : "") +
      `>`
    );
  }

  /* Upgrade hand-written <img data-slot="..."> tags when a photo is listed. */
  function upgradeSlots() {
    $$("img[data-slot]").forEach((img) => {
      const photo = photoFor(img.dataset.slot);
      if (!photo) return;
      img.dataset.fallback = img.getAttribute("src");
      img.onerror = function () { this.onerror = null; this.src = this.dataset.fallback; };
      img.src = `assets/photos/${photo}`;
    });
  }

  const STAR =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="m12 2 2.9 6.26 6.85.72-5.11 4.6 1.44 6.72L12 16.9l-6.08 3.4 1.44-6.72-5.11-4.6 6.85-.72z"/></svg>';

  const ARROW =
    '<svg class="arw" width="15" height="15" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
    'stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------------- Hours / open-now ---------------- */
  const DAY_KEYS  = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function fmtTime(mins) {
    let h = Math.floor(mins / 60);
    const m = mins % 60;
    const ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${String(m).padStart(2, "0")} ${ap}`;
  }

  /* Read the clock in Las Vegas (America/Los_Angeles) regardless of
     where the visitor is, so "Open now" is true for the restaurant. */
  function vegasNow() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
    }).formatToParts(new Date());
    const get = (t) => (parts.find((p) => p.type === t) || {}).value;
    const wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[get("weekday")];
    const hour = parseInt(get("hour"), 10) % 24;
    return { day: wd == null ? new Date().getDay() : wd, mins: hour * 60 + parseInt(get("minute"), 10) };
  }

  function openState() {
    const { day, mins } = vegasNow();
    const today = BUSINESS.hours[DAY_KEYS[day]];
    if (!today) return { open: false, text: "Closed today" };

    const [o, c] = today;
    if (mins < o) return { open: false, text: `Opens at ${fmtTime(o)}` };
    if (mins >= c) {
      const t = BUSINESS.hours[DAY_KEYS[(day + 1) % 7]];
      return { open: false, text: t ? `Opens tomorrow at ${fmtTime(t[0])}` : "Closed" };
    }
    const left = c - mins;
    if (left <= 60) return { open: true, text: `Open · last orders in ${left} min` };
    return { open: true, text: `Open now until ${fmtTime(c)}` };
  }

  function renderStatus() {
    const el = $("[data-status]");
    if (!el) return;
    const s = openState();
    el.classList.toggle("is-open", s.open);
    $("[data-status-text]", el).textContent = s.text;
  }

  function renderHours() {
    const tb = $("[data-hours]");
    if (!tb) return;
    const todayIdx = vegasNow().day;
    tb.innerHTML = DAY_KEYS.map((k, i) => {
      const h = BUSINESS.hours[k];
      return (
        `<tr class="${i === todayIdx ? "is-today" : ""}">` +
        `<th scope="row">${DAY_NAMES[i]}</th>` +
        `<td>${h ? `${fmtTime(h[0])} – ${fmtTime(h[1])}` : "Closed"}</td></tr>`
      );
    }).join("");
  }

  /* ---------------- Header ---------------- */
  function initHeader() {
    const header = $(".header");
    if (!header) return;
    const hero = $(".hero");

    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle("is-solid", y > 12);
      if (hero) {
        const past = y > hero.offsetHeight - 90;
        header.classList.toggle("hero-scope", !past && !document.body.classList.contains("nav-open"));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = $(".nav-toggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const open = document.body.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", String(open));
        onScroll();
      });
      $$(".nav a").forEach((a) =>
        a.addEventListener("click", () => {
          document.body.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
          onScroll();
        })
      );
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
        onScroll();
      }
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    const els = $$(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((e) => e.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((e) => io.observe(e));
  }

  /* ---------------- Shared renders ---------------- */
  function renderOrdering() {
    const host = $("[data-partners]");
    if (!host) return;
    host.innerHTML = ORDERING.map(
      (p) =>
        `<a class="partner" href="${p.url}" target="_blank" rel="noopener noreferrer" ` +
        `style="--accent:${p.accent}">` +
        `<span class="partner__dot"></span>` +
        `<span class="partner__text"><span class="partner__name">${esc(p.name)}</span>` +
        `<span class="partner__note">${esc(p.note)}</span></span>` +
        `<svg class="partner__arw" width="15" height="15" viewBox="0 0 24 24" fill="none" ` +
        `stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ` +
        `aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>`
    ).join("");
  }

  function renderReviews() {
    const host = $("[data-reviews]");
    if (!host) return;

    host.innerHTML = REVIEWS.map((r) => {
      const initial = (r.author || "?").trim().charAt(0).toUpperCase();

      const starRow = r.rating
        ? `<div class="review__stars" role="img" aria-label="${r.rating} out of 5 stars">` +
          STAR.repeat(r.rating) + `</div>`
        : "";

      const meta = [r.date, r.context].filter(Boolean).map(esc).join(" &middot; ");

      const src = r.url
        ? `<a href="${r.url}" target="_blank" rel="noopener noreferrer">${esc(r.source)} review</a>`
        : `<span>${esc(r.source)} review</span>`;

      return (
        `<article class="review">` +
          `<div class="review__head">` +
            `<span class="review__avatar" aria-hidden="true">${esc(initial)}</span>` +
            `<span class="review__who">` +
              `<span class="review__name">${esc(r.author)}</span>` +
              (r.credential
                ? `<span class="review__cred">${esc(r.credential)}</span>`
                : "") +
            `</span>` +
          `</div>` +
          starRow +
          `<h3 class="review__title">&ldquo;${esc(r.headline)}&rdquo;</h3>` +
          `<blockquote class="review__quote">${esc(r.quote)}</blockquote>` +
          `<footer class="review__foot">` +
            src + (meta ? `<span class="review__meta">${meta}</span>` : "") +
          `</footer>` +
        `</article>`
      );
    }).join("");
  }

  function renderGallery() {
    const host = $("[data-gallery]");
    if (!host) return;
    host.innerHTML = GALLERY.map((g) => {
      const cls = "gal" + (g.span === "wide" ? " gal--wide" : g.span === "tall" ? " gal--tall" : "");
      return `<figure class="${cls}">${media(g.art, g.slot, g.caption)}` +
             `<figcaption>${esc(g.caption)}</figcaption></figure>`;
    }).join("");
  }

  function renderSignatures() {
    const host = $("[data-signatures]");
    if (!host) return;

    const picks = [];
    MENU.forEach((cat) =>
      cat.items.forEach((it) => {
        if (it.tags && it.tags.includes("top")) picks.push({ ...it, art: cat.art, cat: cat.name });
      })
    );

    const wanted = ["P13", "P14", "S1", "BM1", "R3", "A7"];
    const order = (c) => (wanted.indexOf(c) === -1 ? 99 : wanted.indexOf(c));
    picks.sort((a, b) => order(a.code) - order(b.code));

    host.innerHTML = picks.slice(0, 4).map((it, i) =>
      `<article class="sig-card reveal d${i % 4}">` +
      `<div class="sig-card__media">${media(it.art, it.art, it.name)}</div>` +
      `<div class="sig-card__body">` +
      `<div class="sig-card__top"><h3>${esc(it.name)}</h3>` +
      `<span class="sig-card__price">${it.price != null ? money(it.price) : ""}</span></div>` +
      `<p>${esc(it.desc)}</p></div></article>`
    ).join("");
  }

  function renderMarquee() {
    const host = $("[data-marquee]");
    if (!host) return;
    const words = [
      "Phở since 2008", "Oxtail broth, simmered overnight", "Bánh mì under $10",
      "Bún bò Huế", "Charbroiled cơm tấm", "Fresh watermelon smoothies",
      "Open every day", "South Rainbow Blvd",
    ];
    const group =
      `<div class="marquee__group" aria-hidden="false">` +
      words.map((w) => `<span class="marquee__item">${esc(w)}</span>`).join("") +
      `</div>`;
    const clone = group.replace('aria-hidden="false"', 'aria-hidden="true"');
    host.innerHTML = group + clone;
  }

  /* ---------------- Menu page ---------------- */
  const MenuPage = {
    state: { q: "", filters: new Set() },

    init() {
      this.host = $("[data-menu]");
      if (!this.host) return;

      this.rail  = $("[data-cat-rail]");
      this.input = $("[data-menu-search]");
      this.count = $("[data-menu-count]");

      this.renderRail();
      this.render();
      this.bind();
      this.spy();
    },

    renderRail() {
      if (!this.rail) return;
      this.rail.innerHTML = MENU.map(
        (c) => `<a href="#cat-${c.id}" data-cat="${c.id}">${esc(c.name)}</a>`
      ).join("");
    },

    matches(item) {
      const q = this.state.q.trim().toLowerCase();
      const f = this.state.filters;
      if (f.size) {
        const tags = item.tags || [];
        for (const t of f) if (!tags.includes(t)) return false;
      }
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        (item.desc || "").toLowerCase().includes(q) ||
        (item.code || "").toLowerCase().includes(q)
      );
    },

    highlight(text) {
      const q = this.state.q.trim();
      if (!q) return esc(text);
      const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return esc(text).replace(new RegExp(safe, "ig"), (m) => `<mark class="hl">${m}</mark>`);
    },

    tagChips(tags) {
      if (!tags) return "";
      const labels = { veg: "Veg", spicy: "Spicy", gf: "Rice noodle", top: "Signature" };
      return tags
        .filter((t) => labels[t])
        .map((t) => `<span class="tag tag--${t}">${labels[t]}</span>`)
        .join("");
    },

    render() {
      let shown = 0;
      const html = MENU.map((cat) => {
        const items = cat.items.filter((i) => this.matches(i));
        if (!items.length) return "";
        shown += items.length;

        return (
          `<section class="menu-cat reveal" id="cat-${cat.id}" data-cat-section="${cat.id}">` +
          `<div class="menu-cat__head">` +
          `<div><div class="menu-cat__title"><h2>${esc(cat.name)}</h2>` +
          `<span class="menu-cat__vi">${esc(cat.vi)}</span></div>` +
          `<p>${esc(cat.blurb)}</p></div>` +
          `<div class="menu-cat__art">${media(cat.art, cat.art, cat.name)}</div>` +
          `</div>` +
          `<ul class="menu-list">` +
          items.map((it) =>
            `<li class="menu-row">` +
            `<span class="menu-row__code">${esc(it.code || "")}</span>` +
            `<div class="menu-row__main">` +
            `<div class="menu-row__top">` +
            `<span class="menu-row__name">${this.highlight(it.name)}` +
            this.tagChips(it.tags) + `</span>` +
            `<span class="menu-row__lead" aria-hidden="true"></span>` +
            (it.price != null
              ? `<span class="menu-row__price">${money(it.price)}</span>`
              : `<span class="menu-row__price is-note">${esc(it.priceNote || "Market")}</span>`) +
            `</div>` +
            (it.desc ? `<p class="menu-row__desc">${this.highlight(it.desc)}</p>` : "") +
            `</div></li>`
          ).join("") +
          `</ul></section>`
        );
      }).join("");

      this.host.innerHTML =
        html ||
        `<div class="menu-empty"><h3>Nothing matched that.</h3>` +
        `<p>Try “pho”, “banh mi” or “vegetarian”, or clear the filters.</p></div>`;

      if (this.count) {
        const total = MENU.reduce((n, c) => n + c.items.length, 0);
        this.count.textContent =
          shown === total ? `${total} dishes` : `${shown} of ${total} dishes`;
      }
      initReveal();
    },

    bind() {
      if (this.input) {
        const wrap = this.input.closest(".menu-search");
        let t;
        this.input.addEventListener("input", () => {
          wrap.classList.toggle("has-value", this.input.value !== "");
          clearTimeout(t);
          t = setTimeout(() => {
            this.state.q = this.input.value;
            this.render();
          }, 130);
        });
        const clear = $(".menu-search__clear", wrap);
        if (clear) {
          clear.addEventListener("click", () => {
            this.input.value = "";
            wrap.classList.remove("has-value");
            this.state.q = "";
            this.render();
            this.input.focus();
          });
        }
      }

      $$("[data-filter]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const tag = btn.dataset.filter;
          const on = this.state.filters.has(tag);
          if (on) this.state.filters.delete(tag);
          else this.state.filters.add(tag);
          btn.setAttribute("aria-pressed", String(!on));
          this.render();
        });
      });
    },

    spy() {
      if (!this.rail || !("IntersectionObserver" in window)) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const id = en.target.dataset.catSection;
            $$("a", this.rail).forEach((a) => a.classList.toggle("is-active", a.dataset.cat === id));
            const active = $(`a[data-cat="${id}"]`, this.rail);
            if (active && this.rail.scrollWidth > this.rail.clientWidth) {
              this.rail.scrollTo({
                left: active.offsetLeft - this.rail.clientWidth / 2 + active.offsetWidth / 2,
                behavior: "smooth",
              });
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      const watch = () => $$("[data-cat-section]").forEach((s) => io.observe(s));
      watch();
      new MutationObserver(watch).observe(this.host, { childList: true });
    },
  };

  /* ---------------- Fill business details ---------------- */
  function fillBusiness() {
    $$("[data-biz]").forEach((el) => {
      const key = el.dataset.biz;
      const val = BUSINESS[key];
      if (val == null) return;
      if (el.tagName === "A" && key === "phone") el.href = BUSINESS.phoneHref;
      el.textContent = val;
    });
    $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

    /* Years in business, computed so it never goes stale. */
    const years = new Date().getFullYear() - BUSINESS.founded;
    const WORDS = ["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen",
                   "Sixteen","Seventeen","Eighteen","Nineteen","Twenty"];
    $$("[data-years]").forEach((el) => (el.textContent = years));
    $$("[data-years-word]").forEach(
      (el) => (el.textContent = WORDS[years - 10] || String(years))
    );
  }

  /* ---------------- Steam ----------------
     Particles rising off the bowl. The markup keeps a three-path SVG
     wisp as the no-JS fallback; this hides it and takes over only once
     the canvas is actually running, so the bowl is never left bare.
     Skipped entirely when the visitor asks for reduced motion, and
     paused whenever the hero is scrolled out of view. */
  function initSteam() {
    const cv = $("[data-steam]");
    if (!cv || !cv.getContext) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (calm.matches) return;

    const ctx = cv.getContext("2d");
    if (!ctx) return;

    document.body.classList.add("has-canvas-steam");

    let w = 0, h = 0, dpr = 1, raf = 0, running = false;

    function size() {
      const r = cv.getBoundingClientRect();
      if (!r.width || !r.height) return false;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width  = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    }

    const COUNT = 26;
    const puffs = [];

    function seed(p, initial) {
      p.x = w * (0.5 + (Math.random() - 0.5) * 0.46);
      p.y = h * (0.96 + Math.random() * 0.06);
      p.r = h * (0.035 + Math.random() * 0.042);
      p.span = 3.6 + Math.random() * 3.0;          // seconds
      // Stagger the first cycle across the whole span, otherwise every
      // puff pulses in unison and the bowl looks like it is breathing.
      p.life = initial ? Math.random() * p.span : 0;
      p.drift = (Math.random() - 0.5) * 0.5;
      p.wobble = 0.7 + Math.random() * 1.5;
      p.phase = Math.random() * Math.PI * 2;
      p.peak = 0.10 + Math.random() * 0.08;        // max alpha
    }

    for (let i = 0; i < COUNT; i++) { puffs.push({}); seed(puffs[i], true); }

    let last = 0;
    function frame(t) {
      if (!running) return;
      const dt = Math.min((t - last) / 1000 || 0, 0.05);
      last = t;

      ctx.clearRect(0, 0, w, h);

      for (const p of puffs) {
        p.life += dt;
        const k = p.life / p.span;
        if (k >= 1) { seed(p, false); continue; }

        // Rise, widen and fade. The travel is kept under the canvas
        // height so puffs never spend their brightest moment offscreen.
        const y = p.y - k * h * 0.78;
        const x = p.x + Math.sin(p.phase + p.life * p.wobble) * h * 0.05
                      + p.drift * k * h * 0.3;
        const r = p.r * (1 + k * 1.7);
        const a = p.peak * Math.sin(Math.min(k, 1) * Math.PI);
        if (a <= 0.002) continue;

        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0,    "rgba(255, 250, 242, " + a.toFixed(4) + ")");
        g.addColorStop(0.45, "rgba(252, 242, 224, " + (a * 0.62).toFixed(4) + ")");
        g.addColorStop(1,    "rgba(250, 238, 216, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || !size()) return;
      running = true; last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (es) => { es[0] && es[0].isIntersecting ? start() : stop(); },
        { threshold: 0 }
      ).observe(cv);
    } else {
      start();
    }

    let rt;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(() => { if (running) size(); }, 180);
    });

    document.addEventListener("visibilitychange", () => {
      document.hidden ? stop() : start();
    });

    // Honour a mid-session change to the motion preference.
    const onCalm = (e) => {
      if (!e.matches) return;
      stop();
      ctx.clearRect(0, 0, w, h);
      document.body.classList.remove("has-canvas-steam");
    };
    calm.addEventListener ? calm.addEventListener("change", onCalm)
                          : calm.addListener(onCalm);
  }

  /* ---------------- Count-up ----------------
     The years-on-Rainbow badge ticks up the first time it is seen. */
  function initCountUp() {
    const el = $("[data-years]");
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = parseInt(el.textContent, 10);
    if (!target) return;

    const io = new IntersectionObserver((entries) => {
      if (!entries[0] || !entries[0].isIntersecting) return;
      io.disconnect();

      const dur = 1100;
      const t0 = performance.now();
      el.textContent = "0";
      (function tick(now) {
        const k = Math.min((now - t0) / dur, 1);
        // ease-out cubic
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      })(t0);
    }, { threshold: 0.5 });

    io.observe(el);
  }

  /* ---------------- Boot ---------------- */
  function boot() {
    fillBusiness();
    upgradeSlots();
    initHeader();
    renderStatus();
    renderHours();
    renderMarquee();
    renderSignatures();
    renderReviews();
    renderGallery();
    renderOrdering();
    MenuPage.init();
    initReveal();
    initSteam();
    initCountUp();
    setInterval(renderStatus, 60000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
