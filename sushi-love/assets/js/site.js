/* Sushi Love — behaviour. Reads everything from data.js. */
(function () {
  "use strict";

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var el = function (t, c, h) {
    var n = document.createElement(t);
    if (c) n.className = c;
    if (h != null) n.innerHTML = h;
    return n;
  };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m];
    });
  };
  var money = function (n) { return "$" + n.toFixed(2).replace(/\.00$/, ""); };

  var STAR = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>';
  var ARROW = '<svg class="arw" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function stars(n) {
    return '<span class="stars" aria-label="' + n + ' out of 5 stars">' + new Array(n + 1).join(STAR) + "</span>";
  }

  /* ---------------------------------------------------------------
     Open / closed, computed in the restaurant's own timezone
     --------------------------------------------------------------- */
  function localNow() {
    try {
      var p = new Intl.DateTimeFormat("en-US", {
        timeZone: BUSINESS.timezone, weekday: "short", hour: "numeric",
        minute: "numeric", hour12: false
      }).formatToParts(new Date());
      var get = function (t) { for (var i = 0; i < p.length; i++) if (p[i].type === t) return p[i].value; return ""; };
      var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var h = parseInt(get("hour"), 10) % 24;
      return { day: days[get("weekday")], mins: h * 60 + parseInt(get("minute"), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function fmt(mins) {
    var h = Math.floor(mins / 60), m = mins % 60;
    var ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return h + (m ? ":" + (m < 10 ? "0" : "") + m : "") + " " + ap;
  }

  function status() {
    var now = localNow();
    var today = BUSINESS.hours[now.day];
    if (today && now.mins >= today[0] && now.mins < today[1]) {
      var left = today[1] - now.mins;
      return { open: true, text: left <= 60 ? "Open — last orders soon" : "Open now until " + fmt(today[1]) };
    }
    for (var i = 0; i < 8; i++) {
      var d = (now.day + i) % 7;
      var h = BUSINESS.hours[d];
      if (!h) continue;
      if (i === 0 && now.mins >= h[0]) continue;
      var when = i === 0 ? "today" : i === 1 ? "tomorrow" : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d];
      return { open: false, text: "Closed — opens " + when + " at " + fmt(h[0]) };
    }
    return { open: false, text: BUSINESS.hoursLabel };
  }

  function paintStatus() {
    var s = status();
    $$("[data-status]").forEach(function (n) {
      n.classList.toggle("is-closed", !s.open);
      var t = $("[data-status-text]", n);
      if (t) t.textContent = s.text;
    });
  }

  /* ---------------------------------------------------------------
     Header
     --------------------------------------------------------------- */
  function header() {
    var h = $(".header");
    if (!h) return;
    var onScroll = function () { h.classList.toggle("is-stuck", window.scrollY > 12); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var t = $(".nav-toggle", h);
    if (t) {
      t.addEventListener("click", function () {
        var open = h.classList.toggle("is-open");
        t.setAttribute("aria-expanded", open ? "true" : "false");
      });
      $$(".nav a", h).forEach(function (a) {
        a.addEventListener("click", function () {
          h.classList.remove("is-open");
          t.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ---------------------------------------------------------------
     Shared data helpers
     --------------------------------------------------------------- */
  function allItems() {
    var out = [];
    MENU.forEach(function (cat) {
      cat.items.forEach(function (it) { out.push({ cat: cat, item: it }); });
    });
    return out;
  }

  function findItem(name) {
    var hit = allItems().filter(function (r) { return r.item.name === name; })[0];
    return hit ? hit.item : null;
  }

  var TAG_LABEL = { veg: "Vegetarian", spicy: "Spicy", gf: "No wheat", raw: "Raw fish", cooked: "Cooked", baked: "Baked" };

  function tagHTML(tags) {
    return (tags || []).filter(function (t) { return t !== "top"; }).map(function (t) {
      return '<span class="tag tag--' + t + '">' + esc(TAG_LABEL[t] || t) + "</span>";
    }).join("");
  }

  function priceHTML(it) {
    if (it.sizes && it.sizes.length) {
      return '<div class="row__sizes">' + it.sizes.map(function (s) {
        return '<span class="row__size"><i>' + esc(s.label) + "</i>" + money(s.price) + "</span>";
      }).join("") + "</div>";
    }
    if (it.price == null) return '<span class="row__todo">Ask us</span>';
    return '<span class="row__price">' + money(it.price) +
      (it.unit ? "<small>" + esc(it.unit) + "</small>" : "") + "</span>";
  }

  /* ---------------------------------------------------------------
     Home: signature dish cards
     --------------------------------------------------------------- */
  function signatures() {
    var host = $("[data-dishes]");
    if (!host) return;
    host.innerHTML = "";
    SIGNATURES.forEach(function (name) {
      var it = findItem(name);
      if (!it) return;
      var card = el("article", "dish");
      var price = it.sizes && it.sizes.length
        ? "from " + money(it.sizes[0].price)
        : (it.price == null ? "" : money(it.price));
      card.innerHTML =
        '<div class="dish__img"><img src="assets/img/' + esc(it.img || "nigiri") + '.svg" alt="' + esc(it.name) + '" loading="lazy" decoding="async" width="400" height="400"></div>' +
        '<div class="dish__body">' +
          '<div class="dish__top"><h3>' + esc(it.name) + "</h3>" +
          (price ? '<span class="dish__price">' + price + "</span>" : "") + "</div>" +
          (it.desc ? "<p>" + esc(it.desc) + "</p>" : '<p>Ask the sushi bar — this one is built to be seen.</p>') +
          '<div class="dish__tags">' + tagHTML(it.tags) + "</div>" +
        "</div>";
      host.appendChild(card);
    });
  }

  /* ---------------------------------------------------------------
     Home: reviews
     --------------------------------------------------------------- */
  function reviews() {
    var host = $("[data-quotes]");
    if (host) {
      host.innerHTML = "";
      REVIEWS.forEach(function (r) {
        var a = el("a", "quote");
        a.href = r.url; a.target = "_blank"; a.rel = "noopener";
        a.innerHTML =
          stars(r.stars || 5) +
          "<blockquote>&ldquo;" + esc(r.quote) + "&rdquo;</blockquote>" +
          "<figcaption>" + (r.name ? "<b>" + esc(r.name) + "</b> · " : "") +
          "Published on " + esc(r.source) + "</figcaption>";
        host.appendChild(a);
      });
    }

    var rows = $("[data-ratings]");
    if (rows) {
      rows.innerHTML = "";
      RATINGS.forEach(function (r) {
        if (r.score == null) return;
        var a = el("a", "score__row");
        a.href = r.url; a.target = "_blank"; a.rel = "noopener";
        a.innerHTML = "<span>" + esc(r.source) + (r.count ? " · " + r.count + " reviews" : "") +
          "</span><b>" + r.score.toFixed(1) + "</b>";
        rows.appendChild(a);
      });
    }
  }

  /* ---------------------------------------------------------------
     Home: ordering + booking links
     --------------------------------------------------------------- */
  function links() {
    var render = function (host, list) {
      if (!host) return;
      host.innerHTML = "";
      list.forEach(function (o) {
        var a = el("a", "app");
        a.href = o.url; a.target = "_blank"; a.rel = "noopener";
        a.innerHTML =
          '<span><span class="app__name">' + esc(o.name) + "</span>" +
          '<span class="app__note">' + esc(o.note) + "</span></span>" +
          '<span class="app__go">' + ARROW + "</span>";
        host.appendChild(a);
      });
    };
    render($("[data-ordering]"), ORDERING);
    render($("[data-booking]"), BOOKING);
  }

  /* ---------------------------------------------------------------
     Home: locations + hours strip
     --------------------------------------------------------------- */
  var PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
  var TEL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>';
  var CLOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';

  function locations() {
    var host = $("[data-locations]");
    if (host) {
      host.innerHTML = "";
      BUSINESS.locations.forEach(function (L) {
        var apps = ORDERING.filter(function (o) { return o.loc === L.id; });
        var c = el("article", "loc" + (L.flagship ? " loc--flag" : ""));
        c.innerHTML =
          (L.flagship ? '<span class="loc__flag">Flagship</span>' : '<span class="loc__flag" style="color:var(--l-faint)">Also open</span>') +
          "<h3>" + esc(L.label) + "</h3>" +
          "<address>" + esc(L.street) + "<br>" + esc(L.city) + ", " + esc(L.region) + " " + esc(L.postal) + "</address>" +
          '<p class="loc__near">' + esc(L.landmark) + "</p>" +
          '<div class="loc__rows">' +
            '<div class="loc__row">' + TEL + '<span><a href="tel:' + esc(L.tel) + '">' + esc(L.phone) + "</a><small>Call for pickup or a large party</small></span></div>" +
            '<div class="loc__row">' + CLOCK + "<span>" + esc(BUSINESS.hoursLabel) + "</span></div>" +
          "</div>" +
          '<div class="loc__btns">' +
            '<a class="btn btn--dark btn--sm" href="' + esc(L.maps) + '" target="_blank" rel="noopener">' + PIN + " Directions</a>" +
            (apps[0] ? '<a class="btn btn--ghost btn--sm" href="' + esc(apps[0].url) + '" target="_blank" rel="noopener">Order from here</a>' : "") +
          "</div>";
        host.appendChild(c);
      });
    }

    var strip = $("[data-hours]");
    if (strip) {
      var names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      var today = localNow().day;
      strip.innerHTML = "";
      names.forEach(function (n, i) {
        var h = BUSINESS.hours[i];
        var d = el("div", i === today ? "is-today" : "");
        d.innerHTML = "<dt>" + n + (i === today ? " · today" : "") + "</dt><dd>" +
          (h ? fmt(h[0]) + "<br>&ndash; " + fmt(h[1]) : "Closed") + "</dd>";
        strip.appendChild(d);
      });
    }
  }

  /* ---------------------------------------------------------------
     Phone numbers scattered through the markup
     --------------------------------------------------------------- */
  function phones() {
    var L = BUSINESS.locations[0];
    $$("[data-phone]").forEach(function (n) {
      n.textContent = L.phone;
      if (n.tagName === "A") n.href = "tel:" + L.tel;
    });
  }

  /* ---------------------------------------------------------------
     Draft ribbon
     --------------------------------------------------------------- */
  function draft() {
    if (!SITE.draft) return;
    var missing = allItems().filter(function (r) { return r.item.price == null && !(r.item.sizes || []).length; }).length;
    var bar = el("div", "draft",
      "<b>Draft preview.</b> " + missing + " dishes still need a price confirmed — " +
      "add them in <code>assets/js/data.js</code>, then set <code>SITE.draft = false</code> to publish.");
    document.body.insertBefore(bar, document.body.firstChild);
  }

  /* ---------------------------------------------------------------
     Menu page
     --------------------------------------------------------------- */
  function menuPage() {
    var host = $("[data-menu]");
    if (!host) return;

    var railHost = $("[data-rail]");
    var q = "", active = null;

    function visibleItems(cat) {
      return cat.items.filter(function (it) {
        if (!SITE.draft && it.price == null && !(it.sizes || []).length) return false;
        if (active && (it.tags || []).indexOf(active) === -1) return false;
        if (q) {
          var hay = (it.name + " " + (it.desc || "") + " " + cat.name).toLowerCase();
          if (hay.indexOf(q) === -1) return false;
        }
        return true;
      });
    }

    function render() {
      host.innerHTML = "";
      var shown = 0;

      MENU.forEach(function (cat) {
        var items = visibleItems(cat);
        if (!items.length) return;
        shown += items.length;

        var sec = el("section", "cat");
        sec.id = cat.id;
        sec.innerHTML = '<div class="cat__head"><h2>' + esc(cat.name) + "</h2>" +
          (cat.blurb ? "<p>" + esc(cat.blurb) + "</p>" : "") + "</div>";

        var rows = el("div", "rows");
        items.forEach(function (it) {
          var r = el("div", "row");
          r.innerHTML =
            "<div>" +
              '<div class="row__name"><h3>' + esc(it.name) + "</h3>" + tagHTML(it.tags) + "</div>" +
              (it.desc ? "<p>" + esc(it.desc) + "</p>" : "") +
            "</div>" +
            "<div>" + priceHTML(it) + "</div>";
          rows.appendChild(r);
        });
        sec.appendChild(rows);
        host.appendChild(sec);
      });

      if (!shown) {
        host.appendChild(el("p", "no-hits",
          "Nothing matches that. Try a different word, or " +
          '<a class="link" href="tel:' + esc(BUSINESS.locations[0].tel) + '">call us</a> and ask.'));
      }
      spy();
    }

    /* category rail */
    if (railHost) {
      var ul = el("ul");
      MENU.forEach(function (cat) {
        var li = el("li");
        li.innerHTML = '<a href="#' + esc(cat.id) + '">' + esc(cat.name) + "</a>";
        ul.appendChild(li);
      });
      railHost.appendChild(ul);
    }

    var obs = null;
    function spy() {
      if (!railHost || !("IntersectionObserver" in window)) return;
      if (obs) obs.disconnect();
      obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          $$("a", railHost).forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id);
          });
        });
      }, { rootMargin: "-170px 0px -66% 0px" });
      $$(".cat", host).forEach(function (c) { obs.observe(c); });
    }

    var input = $("[data-search]");
    if (input) {
      input.addEventListener("input", function () {
        q = input.value.trim().toLowerCase();
        render();
      });
    }

    $$("[data-filter]").forEach(function (b) {
      b.addEventListener("click", function () {
        var t = b.getAttribute("data-filter");
        active = active === t ? null : t;
        $$("[data-filter]").forEach(function (o) {
          o.setAttribute("aria-pressed", o.getAttribute("data-filter") === active ? "true" : "false");
        });
        render();
      });
    });

    render();
  }

  /* ---------------------------------------------------------------
     Boot
     --------------------------------------------------------------- */
  function init() {
    draft();
    header();
    paintStatus();
    setInterval(paintStatus, 60000);
    phones();
    signatures();
    reviews();
    links();
    locations();
    menuPage();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
