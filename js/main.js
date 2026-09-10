/* ===========================================================================
   The Cove Social Club, main.js
   ---------------------------------------------------------------------------
   Everything here is progressive enhancement. The calendar, the membership
   pricing, the address and the phone number are all written into the HTML at
   build time, so with JavaScript switched off the site is still complete and
   readable. This file only adds the sticky header, the mobile menu, the
   "tonight at The Cove" highlight, the marquee and the reveal on top of it.

   Reads js/data.js for EVENTS, TICKER and CLUB. Loaded after it, and
   every entry point checks that what it needs exists before touching the DOM.
   =========================================================================== */
(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var reduced = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  /* ================================================================ HEADER
     Adds .is-stuck once the page has moved, which shrinks the bar and drops a
     blurred ground behind it. rAF-throttled so a fast scroll cannot queue up
     hundreds of style writes. */
  (function header() {
    var head = $('#siteHead');
    if (!head) { return; }
    var ticking = false;

    function apply() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      head.classList.toggle('is-stuck', y > 24);
      ticking = false;
    }
    apply();
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(apply); }
    }, { passive: true });
  }());

  /* ============================================================ MOBILE NAV
     A slide-in sheet. Closes on Escape, on a click outside, and whenever a
     link inside it is followed, and it locks the page behind it. */
  (function mobileNav() {
    var burger = $('#burger');
    var nav = $('#nav');
    if (!burger || !nav) { return; }

    var scrim = document.createElement('div');
    scrim.className = 'nav-scrim';
    document.body.appendChild(scrim);

    function setOpen(open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
      scrim.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      if (open) {
        var first = $('a', nav);
        if (first) { first.focus(); }
      }
    }

    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });
    scrim.addEventListener('click', function () { setOpen(false); });
    $$('a', nav).forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        burger.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) { setOpen(false); }
    });
  }());

  /* ====================================================== TONIGHT'S EVENT
     Lights the card whose data-day matches the visitor's own weekday. Latin
     Night is monthly, so it is only lit on the LAST Friday of the month;
     lighting it every Friday would tell people something untrue.

     Times were not supplied by the club, so nothing here claims one. */
  function isLastOfMonthWeekday(date) {
    var d = new Date(date.getTime());
    d.setDate(d.getDate() + 7);
    return d.getMonth() !== date.getMonth();
  }

  (function tonight() {
    var cards = $$('[data-day]');
    if (!cards.length) { return; }

    function paint() {
      var now = new Date();
      var today = DAYS[now.getDay()];
      cards.forEach(function (c) {
        var match = c.getAttribute('data-day') === today;
        if (match && c.hasAttribute('data-monthly')) {
          match = isLastOfMonthWeekday(now);
        }
        c.classList.toggle('is-today', match);
      });
    }
    paint();
    /* A page left open across midnight should not keep lighting yesterday. */
    window.setInterval(paint, 60000);
  }());

  /* ================================================================ TICKER
     Two identical sets side by side: the animation slides exactly one set
     width, so the seam is invisible and the loop never jumps. Decorative, so
     it is hidden from assistive tech. */
  (function ticker() {
    var host = $('#ticker');
    if (!host || typeof TICKER === 'undefined') { return; }

    var set = document.createElement('div');
    set.className = 'ticker__set';
    TICKER.forEach(function (word) {
      var s = document.createElement('span');
      s.textContent = word;
      set.appendChild(s);
    });

    var track = document.createElement('div');
    track.className = 'ticker__track';
    track.appendChild(set);
    track.appendChild(set.cloneNode(true));

    host.setAttribute('aria-hidden', 'true');
    host.innerHTML = '';
    host.appendChild(track);
  }());

  /* =============================================================== INQUIRE
     The site is static, so there is no server to post a form to. Rather than
     ship a button that silently does nothing, the form hands the message to
     the visitor's own mail client, pre-addressed and pre-filled. README.md
     explains how to swap this for a real form service once hosted. */
  (function inquiry() {
    var form = $('#inquiryForm');
    if (!form) { return; }

    var note = $('#formNote');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var get = function (n) {
        var el = form.elements[n];
        return el && el.value ? el.value.trim() : '';
      };

      var to = (typeof CLUB !== 'undefined' && CLUB.email) ? CLUB.email : 'info@covesocial.com';
      var name = (get('firstName') + ' ' + get('lastName')).trim();
      var subject = get('subject') || 'Enquiry from the website';

      /* The detail lines are filtered and joined FIRST, then the message is
         appended after a blank line. Filtering the whole array at once would
         strip that blank separator too, and the message would run straight on
         from the enquiry type. */
      var details = [
        'Name: ' + name,
        'Email: ' + get('email'),
        get('topic') ? 'Enquiry type: ' + get('topic') : ''
      ].filter(Boolean).join('\n');

      var body = details + '\n\n' + get('message');

      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      if (note) {
        note.hidden = false;
      }
    });
  }());

  /* ================================================================ REVEAL
     Fades sections in as they arrive. If IntersectionObserver is missing,
     everything is simply shown, never left invisible. */
  (function reveal() {
    var nodes = $$('[data-in]');
    if (!nodes.length) { return; }

    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });

    function fold() { return window.innerHeight || document.documentElement.clientHeight; }

    /* Anything already on screen is shown straight away rather than waiting on
       the observer. These pages hide most of their content at opacity 0 until
       it is revealed, so an observer that fails to fire would not cost an
       animation, it would cost the page. */
    var pending = [];
    nodes.forEach(function (n) {
      if (n.getBoundingClientRect().top < fold() * .95) {
        n.classList.add('is-in');
      } else {
        pending.push(n);
        io.observe(n);
      }
    });

    var ticking = false;
    function sweep() {
      ticking = false;
      var limit = fold() * .95;
      var still = [];
      for (var i = 0; i < pending.length; i++) {
        var n = pending[i];
        if (n.classList.contains('is-in')) { continue; }
        if (n.getBoundingClientRect().top < limit) {
          n.classList.add('is-in');
          io.unobserve(n);
        } else {
          still.push(n);
        }
      }
      pending = still;
      if (!pending.length) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    }
    function onScroll() {
      if (!ticking) { ticking = true; window.requestAnimationFrame(sweep); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }());

  /* ================================================================== MISC */
  (function year() {
    $$('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });
  }());

}());
