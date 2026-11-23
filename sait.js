(() => {
  'use strict';
  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let heroThrust = 0;
  const WIKI = 'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/';
  const ARMORS = [
    {
      mark: 'I', name: 'Mark I', nick: 'The cave suit', film: 'Iron Man', year: 2008,
      power: 'Mark I arc reactor', tone: '170, 110, 64',
      img: 'f/fb/Iron_Man_Armor_-_Mark_I.png/revision/latest?cb=20181116150929',
      desc: 'Forged from scrap and Stark missile parts in a Ten Rings cave, the Mark I was built to do one thing: get Tony Stark out alive. It is slow, heavy and barely holds together — and it works.',
      features: ['Twin forearm flamethrowers', 'Single-shot rocket on the left arm', 'Short-burst rocket boots for one escape flight', 'Thick riveted iron plating that shrugs off small-arms fire']
    },
    {
      mark: 'II', name: 'Mark II', nick: 'The prototype', film: 'Iron Man · Iron Man 2', year: 2008,
      power: 'Mark II arc reactor', tone: '170, 182, 196',
      img: '0/0d/Iron_Man_Armor_-_Mark_II.png/revision/latest?cb=20170728191151',
      desc: 'The unpainted chrome test bed built in the Malibu workshop. It proved controlled flight was possible — then iced up at high altitude. In Iron Man 2 it becomes War Machine.',
      features: ['First suit with a full holographic HUD', 'Palm repulsors used as flight stabilisers', 'Deployable flaps for steering', 'Weakness: icing above 16,000 metres']
    },
    {
      mark: 'III', name: 'Mark III', nick: 'The first Iron Man', film: 'Iron Man', year: 2008,
      power: 'Mark II arc reactor', tone: '196, 22, 28', wide: true,
      img: '4/47/Iron_Man_Armor_-_Mark_III.png/revision/latest?cb=20170424185316',
      desc: 'Hot-rod red and gold, with a gold-titanium alloy that solved the icing problem. The Mark III is the suit the world first sees in Gulmira, and the one that takes on Iron Monger.',
      features: ['Gold-titanium alloy skin', 'Palm repulsors and chest unibeam', 'Shoulder-mounted micro-missiles', 'Forearm anti-tank rounds and flare countermeasures']
    },
    {
      mark: 'IV', name: 'Mark IV', nick: 'The showman', film: 'Iron Man 2', year: 2010,
      power: 'Palladium arc reactor', tone: '196, 22, 28',
      img: '6/6a/Iron_Man_Armor_-_Mark_IV.png/revision/latest?cb=20180330035146',
      desc: 'A refined Mark III built for life as a public hero. Tony flies it onto the Stark Expo stage — and wears it, badly, to his own birthday party.',
      features: ['Slimmer, streamlined plating', 'Faster suit-up on the workshop gantry', 'Upgraded repulsors and unibeam', 'Improved flight control surfaces']
    },
    {
      mark: 'V', name: 'Mark V', nick: 'The suitcase suit', film: 'Iron Man 2', year: 2010,
      power: 'Palladium arc reactor', tone: '196, 46, 52',
      img: 'b/b3/Iron_Man_Armor_-_Mark_V.png/revision/latest?cb=20170424185355',
      desc: 'Lightweight emergency armor that folds into a briefcase. Happy Hogan delivers it in the middle of the Monaco Grand Prix and it assembles itself around Tony in seconds.',
      features: ['Collapses into a carry case', 'Self-assembles around the wearer', 'Red and silver lightweight plating', 'Palm repulsors and chest unibeam']
    },
    {
      mark: 'VI', name: 'Mark VI', nick: 'The new element', film: 'Iron Man 2', year: 2010,
      power: 'New-element arc reactor', tone: '196, 22, 28',
      img: '4/4c/Hot_Toys_IM_MK_6_Transparent.png/revision/latest?cb=20170802024240',
      desc: 'Built around the triangular reactor that ends Tony’s palladium poisoning. With War Machine beside it, the Mark VI tears through Hammer’s drones at the Stark Expo.',
      features: ['Triangular chest reactor running a new element', 'Single-use forearm laser', 'Shoulder micro-missile launchers', 'Reinforced armor for close combat']
    },
    {
      mark: 'VII', name: 'Mark VII', nick: 'The Avenger', film: 'The Avengers', year: 2012,
      power: 'New-element arc reactor', tone: '210, 40, 40',
      img: '7/71/Iron_Man_Armor_-_Mark_VII.png/revision/latest?cb=20181207085104',
      desc: 'Launched from Stark Tower as Tony falls, the Mark VII locks onto bracelets on his wrists and wraps around him mid-air. It fights the Chitauri over Manhattan.',
      features: ['Rapid-deployment pod launch', 'Homing bracelets guide assembly', 'Expanded missile and laser arsenal', 'Extended flight time']
    },
    {
      mark: 'XLII', name: 'Mark XLII', nick: 'Prodigal Son', film: 'Iron Man 3', year: 2013,
      power: 'Arc reactor (chest)', tone: '215, 168, 74',
      img: '3/3b/Iron_Man_Armor_-_Mark_XLII.png/revision/latest?cb=20170424190250',
      desc: 'An experimental, mostly gold armor whose pieces fly to Tony one by one on command — or work on their own. Brilliant, unreliable and very hard to keep together.',
      features: ['Prehensile pieces summoned individually', 'Responds to implants in Tony’s arm', 'Can be piloted remotely', 'Can wrap itself around someone else']
    },
    {
      mark: 'XLIII', name: 'Mark XLIII', nick: 'The front line', film: 'Avengers: Age of Ultron', year: 2015,
      power: 'Arc reactor', tone: '196, 22, 28',
      img: '3/3e/Iron_Man_Armor_-_Mark_XLIII.png/revision/latest?cb=20170424190318',
      desc: 'The suit Tony wears to raid HYDRA’s Sokovia base alongside the Avengers. It also serves as the core frame inside the Hulkbuster.',
      features: ['Red-and-gold scheme refined from the XLII', 'Works with the Iron Legion drones', 'Docks inside the Hulkbuster frame', 'Upgraded repulsor arsenal']
    },
    {
      mark: 'XLIV', name: 'Mark XLIV', nick: 'Hulkbuster', film: 'Avengers: Age of Ultron', year: 2015,
      power: 'Worn over the Mark XLIII', tone: '205, 70, 34', wide: true,
      img: '0/0b/Iron_Man_Armor_-_Mark_XLIV.png/revision/latest?cb=20181207092727',
      desc: 'A modular giant designed with Bruce Banner for the worst day imaginable. Dropped from the orbital platform Veronica, it goes toe to toe with the Hulk in Johannesburg.',
      features: ['Delivered from orbit by Veronica', 'Damaged parts replaced mid-fight', 'Hydraulic strength rated against the Hulk', 'Worn over the Mark XLIII']
    },
    {
      mark: 'XLV', name: 'Mark XLV', nick: 'The F.R.I.D.A.Y. suit', film: 'Avengers: Age of Ultron', year: 2015,
      power: 'Arc reactor', tone: '196, 22, 28',
      img: 'c/c2/Iron_Man_Armor_-_Mark_XLV.png/revision/latest?cb=20170425073037',
      desc: 'A leaner, sharper armor and the first run by F.R.I.D.A.Y. after J.A.R.V.I.S. becomes part of the Vision. Tony wears it for the battle of Sokovia.',
      features: ['First armor managed by F.R.I.D.A.Y.', 'Redesigned, more angular faceplate', 'Improved thrusters and repulsors', 'Fights Ultron’s army in Sokovia']
    },
    {
      mark: 'L', name: 'Mark L', nick: 'Bleeding Edge', film: 'Avengers: Infinity War', year: 2018,
      power: 'Nanotech housing unit', tone: '205, 30, 40',
      img: 'a/a0/Iron_Man_Armor_-_Mark_L.png/revision/latest?cb=20180318221316',
      desc: 'Nanotechnology stored in a housing on Tony’s chest. The armor flows over his body in seconds and reshapes itself into whatever the fight on Titan needs.',
      features: ['Nanite armor that forms on command', 'Shapes blades, shields and cannons', 'Thrusters and boosters on demand', 'Self-repairs by moving nanites']
    },
    {
      mark: 'LXXXV', name: 'Mark LXXXV', nick: 'The last suit', film: 'Avengers: Endgame', year: 2019,
      power: 'Nanotech arc reactor', tone: '215, 150, 60', wide: true,
      img: 'f/f2/Iron_Man_Armor_-_Mark_LXXXV.png/revision/latest?cb=20190401222437',
      desc: 'Tony’s final and most advanced armor, with heavier red-and-gold styling. In the final battle its nanotech takes the Infinity Stones for one last snap.',
      features: ['Advanced nanotech construction', 'Energy shields and a deployable cannon', 'Nanites can absorb the Infinity Stones', 'Heavier, classic red-and-gold armor']
    }
  ];
  const armorSrc = (a) => WIKI + a.img;
  const MODELS = {
    I:     { uid: '57b18282c1a84c5899fcc7f67762a386', title: 'Iron Man - Mark 1', author: 'Nathang30' },
    II:    { uid: 'f14ceb54e3ef4fff9b50b4da4bfc5d96', title: 'Iron Man Mark 2 (Iron Man 2 - PS3)', author: 'uzzi47' },
    III:   { uid: 'f5e68486b6394c9cb6b7a5fcf8e3b718', title: 'Ironman Mark 3', author: 'unBlakeable' },
    IV:    { uid: '4f3a3db6afbc4cbe8f015f83aba265b4', title: 'Iron Man Mark 4 (Iron Man 2 - PS3)', author: 'uzzi47' },
    V:     { uid: '280b89cbb9104d0db511f581f12eb88a', title: 'Iron Man Mark 5 (Iron Man 2 - PS3)', author: 'uzzi47' },
    VI:    { uid: '37d5d4392924425c8d05b1835f61f813', title: 'Iron Man Mark 6 (Iron Man 2 - PS3)', author: 'uzzi47' },
    VII:   { uid: 'a13c067e70814dc7b2ebc3f0ace10961', title: 'Iron Man Mark-7', author: 'benjamin.borromeo' },
    XLII:  { uid: 'e5a42b02704347c2b1cdb5be2c9b3561', title: 'Iron Man Mark 42', author: 'abhishekverma' },
    XLIII: { uid: '1c95424b2d684aeea94e70a1ddbe5ced', title: 'Iron Man Mark XLIII battle-damaged bust', author: 'el_robotto', kind: 'bust' },
    XLIV:  { uid: '9ed9c898bf824cae897afd1b6fdd5b1c', title: 'Iron Man Hulkbuster', author: 'Ganesh.Thapaliya' },
    XLV:   { uid: '539bf68268e94ccfb9d21c68caa7f64c', title: 'Ironman Mark 45 Age of Ultron', author: 'JavierVC00', kind: 'helmet' },
    L:     { uid: '1401309a36af4d01a02ec6b4eb878139', title: 'Iron Man Mark 50 suit', author: 'arnavkajjewad2008' },
    LXXXV: { uid: 'dde1085c464d4f8da259fe6669ae4dd2', title: 'Iron-Man Mark 85 | Rigged', author: 'Nihar-9Afilms' }
  };
  ARMORS.forEach((a) => { a.model = MODELS[a.mark] || null; });
  function initBoot() {
    const hero = $('.hero');
    const heroImgs = $$('.hero img');
    const waits = heroImgs.map((img) => (img.complete ? Promise.resolve() : new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); })));
    if (document.fonts && document.fonts.ready) waits.push(document.fonts.ready);
    const timeout = new Promise((r) => setTimeout(r, 1800));
    const minimum = new Promise((r) => setTimeout(r, reduceMotion ? 0 : 900));
    Promise.all([Promise.race([Promise.all(waits), timeout]), minimum]).then(() => {
      root.classList.remove('is-booting');
      setTimeout(() => hero && hero.classList.add('is-ready'), reduceMotion ? 0 : 180);
    });
  }
  function initNav() {
    const nav = $('#nav');
    const links = $$('.nav__links a', nav);
    const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => {
          const active = a.getAttribute('href') === '#' + entry.target.id;
          a.classList.toggle('is-active', active);
          if (active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
    const hero = $('.hero');
    new IntersectionObserver(([e]) => { if (e.isIntersecting) links.forEach((a) => { a.classList.remove('is-active'); a.removeAttribute('aria-current'); }); }, { rootMargin: '-45% 0px -50% 0px' }).observe(hero);
    let lastY = window.scrollY;
    return function update(y) {
      nav.classList.toggle('is-scrolled', y > 40);
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      if (!nav.classList.contains('is-open')) {
        if (goingDown && y > window.innerHeight * .9) nav.classList.add('is-hidden');
        else if (goingUp || y < 200) nav.classList.remove('is-hidden');
      }
      if (Math.abs(y - lastY) > 4) lastY = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      nav.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    };
  }
  function initReveal() {
    $$('[data-reveal-group]').forEach((group) => {
      $$('[data-reveal]', group).forEach((el, i) => el.style.setProperty('--d', (i * 0.1).toFixed(2) + 's'));
    });
    const els = $$('[data-reveal]');
    if (!('IntersectionObserver' in window) || reduceMotion) { els.forEach((el) => el.classList.add('is-in')); return; }
    const targets = new Map();
    els.forEach((el) => {
      const watched = el.dataset.reveal === 'wipe' ? el.parentElement : el;
      if (!targets.has(watched)) targets.set(watched, []);
      targets.get(watched).push(el);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        targets.get(entry.target).forEach((el) => el.classList.add('is-in'));
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((_, watched) => io.observe(watched));
  }
  function initCounters() {
    const els = $$('[data-count]');
    const render = (el, v) => { el.textContent = (el.dataset.prefix || '') + Math.round(v) + (el.dataset.suffix || ''); };
    const run = (el) => {
      const target = Number(el.dataset.count);
      if (reduceMotion || target < 3) { render(el, target); return; }
      const start = performance.now();
      const dur = 1700;
      const step = (now) => {
        const t = clamp((now - start) / dur, 0, 1);
        render(el, target * (1 - Math.pow(1 - t, 4)));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    els.forEach((el) => { render(el, 0); io.observe(el); });
  }
  function initNotes() {
    const notes = $$('.note');
    notes.forEach((note) => {
      const btn = $('button', note);
      btn.addEventListener('click', () => {
        const open = !note.classList.contains('is-open');
        notes.forEach((n) => { n.classList.remove('is-open'); $('button', n).setAttribute('aria-expanded', 'false'); });
        note.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  }
  function initHero() {
    const hero = $('.hero');
    const pin = $('.hero__pin', hero);
    const suit = $('.hero__suit', hero);
    const ground = $('.hero__ground', hero);
    const reactor = $('.hero__reactor', hero);
    const words = $$('.hero__word', hero);
    const cast = $('.hero__cast', hero);
    const year = $('.hero__year', hero);
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let running = false;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      hero.style.setProperty('--mx', pos.x.toFixed(3));
      hero.style.setProperty('--my', pos.y.toFixed(3));
      if (Math.abs(target.x - pos.x) > 0.001 || Math.abs(target.y - pos.y) > 0.001) requestAnimationFrame(tick);
      else running = false;
    };
    if (canHover && !reduceMotion) {
      pin.addEventListener('pointermove', (e) => {
        const r = pin.getBoundingClientRect();
        target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
        if (!running) { running = true; requestAnimationFrame(tick); }
      });
      pin.addEventListener('pointerleave', () => { target.x = 0; target.y = 0; if (!running) { running = true; requestAnimationFrame(tick); } });
    }
    const phase = (p, a, b) => { const t = clamp((p - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
    return function update(y) {
      if (reduceMotion) return;
      const vh = window.innerHeight;
      const travel = hero.offsetHeight - pin.offsetHeight;
      if (y > travel + vh) return;
      const p = travel > 0 ? clamp(y / travel, 0, 1) : 0;
      const ignite = phase(p, 0.04, 0.28);
      const rise = phase(p, 0.2, 0.95);
      const lift = Math.pow(rise, 2.2);
      const split = phase(p, 0.15, 0.75);
      const crouch = ignite * (1 - rise) * 16;
      const suitY = crouch - lift * vh * 1.3;
      suit.style.transform = `translate3d(0, ${suitY.toFixed(1)}px, 0) scale(${(1 + lift * 0.2).toFixed(3)}) rotate(${(-lift * 4).toFixed(2)}deg)`;
      suit.style.setProperty('--flame', (ignite * (0.65 + rise * 0.7)).toFixed(3));
      ground.style.setProperty('--ground', (ignite * (1 - rise * 0.9)).toFixed(3));
      ground.style.transform = `scale(${(0.7 + ignite * 0.5).toFixed(3)})`;
      const spread = split * 34;
      words[0].style.transform = `translate3d(${-spread}vw, 0, 0)`;
      words[1].style.transform = `translate3d(${spread}vw, 0, 0)`;
      words.forEach((w) => { w.style.opacity = (1 - phase(p, 0.35, 0.8)).toFixed(3); });
      const early = (1 - phase(p, 0.02, 0.18)).toFixed(3);
      cast.style.opacity = early;
      year.style.opacity = early;
      hero.style.setProperty('--title-o', early);
      reactor.style.transform = `scale(${(1 + ignite * 0.15 + lift * 0.9).toFixed(3)})`;
      reactor.style.opacity = (0.5 + ignite * 0.35 - lift * 0.6).toFixed(3);
      const shake = 6 * ignite * (1 - rise);
      pin.style.transform = shake > 0.2
        ? `translate3d(${((Math.random() - 0.5) * shake).toFixed(1)}px, ${((Math.random() - 0.5) * shake).toFixed(1)}px, 0)`
        : '';
      heroThrust = ignite + rise;
    };
  }
  function initTimeline() {
    const timeline = $('#timeline');
    const fill = $('.timeline__fill', timeline);
    const chapters = $$('.chapter', timeline);
    return function update() {
      const vh = window.innerHeight;
      const r = timeline.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      const line = vh * 0.6;
      fill.style.setProperty('--fill', clamp((line - r.top) / r.height, 0, 1).toFixed(4));
      chapters.forEach((ch) => {
        const node = $('.chapter__node', ch).getBoundingClientRect();
        ch.classList.toggle('is-lit', node.top < line);
      });
    };
  }
  function initArmory() {
    const hall = $('#hall');
    const prev = $('#hall-prev');
    const next = $('#hall-next');
    const current = $('#hall-current');
    const bar = $('#hall-bar');
    $('#hall-total').textContent = String(ARMORS.length).padStart(2, '0');
    hall.innerHTML = ARMORS.map((a, i) => `
      <button type="button" class="suit${a.wide ? ' suit--wide' : ''}" style="--tone:${a.tone}" data-index="${i}"
              aria-label="${a.name}${a.nick ? ', ' + a.nick : ''} — open armor file">
        <span class="suit__numeral" aria-hidden="true">${a.mark}</span>
        <img class="suit__img" src="${armorSrc(a)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" draggable="false">
        <span class="suit__glare" aria-hidden="true"></span>
        <span class="suit__open" aria-hidden="true">3D</span>
        <span class="suit__mark">${String(i + 1).padStart(2, '0')} · ${a.nick}</span>
        <span class="suit__name">${a.name}</span>
        <span class="suit__film">${a.film} · ${a.year}</span>
      </button>`).join('');
    const suits = $$('.suit', hall);
    const update = () => {
      const max = hall.scrollWidth - hall.clientWidth;
      const p = max > 0 ? hall.scrollLeft / max : 0;
      bar.style.setProperty('--hp', (0.08 + p * 0.92).toFixed(4));
      prev.disabled = hall.scrollLeft < 4;
      next.disabled = hall.scrollLeft > max - 4;
      const padLeft = parseFloat(getComputedStyle(hall).paddingLeft);
      const left = hall.getBoundingClientRect().left + padLeft;
      const riding = $('#armory').classList.contains('is-riding');
      const mid = window.innerWidth / 2;
      let best = 0, bestDist = Infinity;
      suits.forEach((s, i) => {
        const b = s.getBoundingClientRect();
        const d = riding ? Math.abs(b.left + b.width / 2 - mid) : Math.abs(b.left - left);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      if (!riding && p > 0.995) best = suits.length - 1;
      current.textContent = String(best + 1).padStart(2, '0');
    };
    hall.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    window.addEventListener('resize', update);
    update();
    const page = (dir) => hall.scrollBy({ left: dir * hall.clientWidth * 0.75, behavior: reduceMotion ? 'auto' : 'smooth' });
    prev.addEventListener('click', () => page(-1));
    next.addEventListener('click', () => page(1));
    let drag = null;
    let suppressClick = false;
    hall.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0 || $('#armory').classList.contains('is-riding')) return;
      drag = { x: e.clientX, left: hall.scrollLeft, moved: false };
    });
    window.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 6) { drag.moved = true; hall.classList.add('is-dragging'); }
      if (drag.moved) hall.scrollLeft = drag.left - dx;
    });
    window.addEventListener('pointerup', () => {
      if (!drag) return;
      if (drag.moved) {
        suppressClick = true;
        setTimeout(() => { suppressClick = false; }, 0);
        hall.classList.remove('is-dragging');
        const target = suits[Number(current.textContent) - 1];
        if (target) hall.scrollTo({ left: target.offsetLeft - parseFloat(getComputedStyle(hall).paddingLeft), behavior: 'smooth' });
      }
      drag = null;
    });
    hall.addEventListener('click', (e) => { if (suppressClick) { e.preventDefault(); e.stopPropagation(); } }, true);
    hall.addEventListener('wheel', (e) => {
      if ($('#armory').classList.contains('is-riding')) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const max = hall.scrollWidth - hall.clientWidth;
      const atStart = hall.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = hall.scrollLeft >= max - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      hall.scrollLeft += e.deltaY;
    }, { passive: false });
    const dialog = $('#dossier');
    const el = {
      img: $('#dossier-img'), numeral: $('#dossier-numeral'), count: $('#dossier-count'),
      name: $('#dossier-name'), nick: $('#dossier-nick'), film: $('#dossier-film'), year: $('#dossier-year'),
      power: $('#dossier-power'), desc: $('#dossier-desc'), features: $('#dossier-features')
    };
    let index = 0;
    let opener = null;
    const viewer3d = initViewer(dialog);
    const fill = (i) => {
      index = (i + ARMORS.length) % ARMORS.length;
      const a = ARMORS[index];
      dialog.style.setProperty('--tone', a.tone);
      el.img.alt = `The ${a.name} armor`;
      viewer3d.load(a);
      el.numeral.textContent = a.mark;
      el.count.textContent = `Suit file ${String(index + 1).padStart(2, '0')} / ${ARMORS.length}`;
      el.name.textContent = a.name;
      el.nick.textContent = a.nick;
      el.film.textContent = a.film;
      el.year.textContent = a.year;
      el.power.textContent = a.power;
      el.desc.textContent = a.desc;
      el.features.innerHTML = a.features.map((f) => `<li>${f}</li>`).join('');
      $('.dossier__body', dialog).scrollTop = 0;
    };
    const open = (i, trigger) => {
      opener = trigger || null;
      if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
      fill(i);
      root.classList.add('is-locked');
      $('#dossier-close').focus();
    };
    const close = () => { if (dialog.open) dialog.close(); };
    hall.addEventListener('click', (e) => {
      const card = e.target.closest('.suit');
      if (card) open(Number(card.dataset.index), card);
    });
    $('#dossier-close').addEventListener('click', close);
    $('#dossier-prev').addEventListener('click', () => fill(index - 1));
    $('#dossier-next').addEventListener('click', () => fill(index + 1));
    dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
    dialog.addEventListener('keydown', (e) => {
      if (e.target.matches('input')) return;
      if (e.key === 'ArrowRight') fill(index + 1);
      if (e.key === 'ArrowLeft') fill(index - 1);
    });
    dialog.addEventListener('close', () => {
      viewer3d.stop();
      root.classList.remove('is-locked');
      if (opener) opener.focus({ preventScroll: true });
    });
  }
  function initViewer(dialog) {
    const viewer = $('#viewer');
    const frame = $('#viewer-frame');
    const photo = $('#dossier-img');
    const btn3d = $('#mode-3d');
    const btnPhoto = $('#mode-photo');
    const label3d = $('#mode-3d-label');
    const credit = $('#viewer-credit');
    const options = {
      autostart: 1, transparent: 1, autospin: reduceMotion ? 0 : 0.2,
      ui_theme: 'dark', ui_infos: 0, ui_controls: 0, ui_stop: 0, ui_inspector: 0,
      ui_hint: 0, ui_help: 0, ui_settings: 0, ui_vr: 0, ui_ar: 0, ui_annotations: 0,
      ui_watermark: 0, ui_watermark_link: 0, dnt: 1
    };
    let model = null;
    let mode = '3d';
    let loadToken = 0;
    const showLoaded = (token) => { if (token === loadToken) viewer.classList.add('is-loaded'); };
    const loadModel = (uid) => {
      const token = ++loadToken;
      viewer.classList.remove('is-loaded');
      frame.dataset.uid = uid;
      if (typeof window.Sketchfab !== 'function') {
        frame.onload = () => showLoaded(token);
        frame.src = `https://sketchfab.com/models/${uid}/embed?${new URLSearchParams(options)}`;
        return;
      }
      frame.onload = null;
      const client = new window.Sketchfab('1.12.1', frame);
      client.init(uid, {
        ...options,
        success(api) {
          setTimeout(() => showLoaded(token), 9000);
          api.addEventListener('viewerready', () => {
            if (token !== loadToken) return;
            const frameIt = typeof api.focusOnVisibleGeometries === 'function'
              ? (cb) => api.focusOnVisibleGeometries(cb)
              : (cb) => api.recenterCamera(cb);
            frameIt(() => {
              const closer = 0.8;
              api.getCameraLookAt((err, cam) => {
                if (!err && cam) {
                  const pos = cam.position.map((p, i) => cam.target[i] + (p - cam.target[i]) * closer);
                  api.setCameraLookAt(pos, cam.target, 0.8);
                }
                setTimeout(() => showLoaded(token), 300);
              });
            });
            setTimeout(() => showLoaded(token), 2500);
          });
        },
        error() { showLoaded(token); }
      });
    };
    const setMode = (next) => {
      mode = model ? next : 'photo';
      viewer.classList.toggle('is-3d', mode === '3d');
      viewer.classList.toggle('is-photo', mode === 'photo');
      btn3d.setAttribute('aria-pressed', String(mode === '3d'));
      btnPhoto.setAttribute('aria-pressed', String(mode === 'photo'));
      if (mode === '3d' && model && frame.dataset.uid !== model.uid) loadModel(model.uid);
    };
    btn3d.addEventListener('click', () => setMode('3d'));
    btnPhoto.addEventListener('click', () => setMode('photo'));
    return {
      load(armor) {
        model = armor.model || null;
        photo.src = armorSrc(armor);
        btn3d.hidden = !model;
        label3d.textContent = model && model.kind ? `3D ${model.kind}` : '3D model';
        frame.title = model ? `3D model: ${model.title}` : '';
        credit.innerHTML = model
          ? `3D ${model.kind || 'model'} “<a href="https://sketchfab.com/3d-models/${model.uid}" target="_blank" rel="noopener">${model.title}</a>” by ${model.author} · Sketchfab`
          : '';
        setMode(model ? '3d' : 'photo');
      },
      stop() {
        loadToken++;
        frame.onload = null;
        frame.removeAttribute('src');
        delete frame.dataset.uid;
        viewer.classList.remove('is-loaded');
      }
    };
  }
  function initCast() {
    const players = $$('.player');
    const activate = (p) => players.forEach((x) => x.classList.toggle('is-active', x === p));
    players.forEach((p) => {
      if (canHover) p.addEventListener('pointerenter', () => activate(p));
      p.addEventListener('click', () => activate(p));
      p.addEventListener('focus', () => activate(p));
      p.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(p); } });
    });
  }
  function initTabs(tablist, onChange) {
    const tabs = $$('[role="tab"]', tablist);
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) { panel.hidden = !on; panel.classList.toggle('is-active', on); }
      });
      if (focus) tab.focus();
      if (onChange) onChange(tab);
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (e) => {
        const horizontal = tablist.getAttribute('aria-orientation') !== 'vertical';
        const nextKeys = ['ArrowRight', 'ArrowDown'];
        const prevKeys = ['ArrowLeft', 'ArrowUp'];
        let n = null;
        if (nextKeys.includes(e.key)) n = tabs[(i + 1) % tabs.length];
        if (prevKeys.includes(e.key)) n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') n = tabs[0];
        if (e.key === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); if (horizontal) n.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
      });
    });
  }
  function preloadNear(section, images) {
    new IntersectionObserver(([e], obs) => {
      if (e.isIntersecting) { images.forEach((img) => { img.loading = 'eager'; }); obs.disconnect(); }
    }, { rootMargin: '900px 0px' }).observe(section);
  }
  function initVillains() {
    const images = $$('.rogues__media img');
    const list = $('.rogues__index');
    list.setAttribute('aria-orientation', 'vertical');
    initTabs(list, (tab) => {
      images.forEach((img) => img.classList.toggle('is-active', img.dataset.rogue === tab.dataset.rogue));
    });
    preloadNear($('#villains'), images);
  }
  function initTilt() {
    if (!canHover || reduceMotion) return;
    $$('[data-tilt]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', ((x - 0.5) * 12).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((0.5 - y) * 10).toFixed(2) + 'deg');
        card.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
      });
      card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
    });
  }
  function initToTop() {
    const btn = $('.totop');
    return (y) => btn.classList.toggle('is-visible', y > window.innerHeight * 1.2);
  }
  function initScrollLoop(updaters) {
    let ticking = false;
    const run = () => {
      const y = window.scrollY;
      updaters.forEach((fn) => fn && fn(y));
      ticking = false;
    };
    const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    run();
  }
  const fancyPointer = canHover && !reduceMotion;
  function initCursor() {
    if (!fancyPointer) return;
    const ring = document.createElement('div');
    ring.className = 'cursor';
    ring.setAttribute('aria-hidden', 'true');
    ring.innerHTML = '<span class="cursor__dot"></span>';
    document.body.appendChild(ring);
    const dot = ring.firstElementChild;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let scale = 1, scaleTarget = 1;
    const interactive = 'a, button, input, label, [role="tab"], .suit, .player, .movie__poster';
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      target.x = e.clientX; target.y = e.clientY;
      ring.classList.add('is-visible');
      ring.classList.toggle('is-hover', !!e.target.closest(interactive));
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => ring.classList.remove('is-visible'));
    window.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      scaleTarget = 0.7;
      const shock = document.createElement('span');
      shock.className = 'shock';
      shock.style.left = e.clientX + 'px';
      shock.style.top = e.clientY + 'px';
      document.body.appendChild(shock);
      shock.addEventListener('animationend', () => shock.remove(), { once: true });
    });
    window.addEventListener('pointerup', () => { scaleTarget = 1; });
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      scale += (scaleTarget - scale) * 0.25;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale.toFixed(3)})`;
      dot.style.transform = `translate3d(${(target.x - pos.x).toFixed(1)}px, ${(target.y - pos.y).toFixed(1)}px, 0)`;
      ring.classList.toggle('is-off', !!document.querySelector('dialog[open]'));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  function initEmbers() {
    const canvas = $('.hero__embers');
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext('2d');
    const hero = $('.hero');
    let w = 0, h = 0, dpr = 1, sparks = [], visible = true, raf = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth; h = hero.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(clamp(w / 22, 24, 70));
      sparks = Array.from({ length: count }, () => spawn(true));
    };
    const spawn = (anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: 0.6 + Math.random() * 1.8,
      vy: -(0.25 + Math.random() * 0.9),
      vx: (Math.random() - 0.5) * 0.3,
      sway: Math.random() * Math.PI * 2,
      hue: 18 + Math.random() * 30,
      life: 0.4 + Math.random() * 0.6
    });
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (const s of sparks) {
        s.sway += 0.02;
        const boost = 1 + heroThrust * 1.6;
        s.x += s.vx * boost + Math.sin(s.sway) * 0.25;
        s.y += s.vy * boost;
        const fade = clamp(s.y / h, 0, 1) * s.life * Math.min(1.6, 1 + heroThrust * 0.4);
        if (s.y < -10 || fade <= 0.02) Object.assign(s, spawn(false));
        ctx.fillStyle = `hsla(${s.hue}, 100%, 60%, ${fade * 0.18})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 3.2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `hsla(${s.hue + 10}, 100%, 75%, ${fade * 0.9})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = visible ? requestAnimationFrame(draw) : 0;
    };
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(draw);
    }).observe(hero);
    window.addEventListener('resize', resize);
    resize();
  }
  function initScramble() {
    if (reduceMotion) return;
    const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*/<>';
    const targets = $$('.eyebrow, .chapter__place, .movie__part, .file__meta span:first-child, .film__studio');
    const run = (el) => {
      const nodes = [];
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) if (walker.currentNode.nodeValue.trim()) nodes.push(walker.currentNode);
      const items = nodes.map((n) => ({ n, text: n.nodeValue, reveal: [...n.nodeValue].map(() => Math.random() * 0.75) }));
      const start = performance.now();
      const dur = 900;
      const step = (now) => {
        const t = (now - start) / dur;
        items.forEach((it) => {
          it.n.nodeValue = [...it.text].map((ch, i) => (
            ch === ' ' || t >= it.reveal[i] + 0.25 ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
          )).join('');
        });
        if (t < 1) requestAnimationFrame(step);
        else items.forEach((it) => { it.n.nodeValue = it.text; });
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    targets.forEach((el) => io.observe(el));
  }
  function initSuitTilt() {
    if (!fancyPointer) return;
    const hall = $('#hall');
    let current = null;
    const reset = (card) => { if (card) { card.style.removeProperty('--rx'); card.style.removeProperty('--ry'); } };
    hall.addEventListener('pointermove', (e) => {
      const card = e.target.closest('.suit');
      if (card !== current) { reset(current); current = card; }
      if (!card || hall.classList.contains('is-dragging')) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--ry', ((x - 0.5) * 14).toFixed(2) + 'deg');
      card.style.setProperty('--rx', ((0.5 - y) * 10).toFixed(2) + 'deg');
      card.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
      card.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
    });
    hall.addEventListener('pointerleave', () => { reset(current); current = null; });
  }
  function initMagnetic() {
    if (!fancyPointer) return;
    $$('.btn, .round-btn, .explore__ring, .totop, .nav__cta').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.28;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
        el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      });
      el.addEventListener('pointerleave', () => { el.style.translate = ''; });
    });
  }
  function initTickerSpeed() {
    const ticker = $('.ticker');
    const track = $('.ticker__track');
    if (reduceMotion || !track.getAnimations) return () => {};
    let lastY = window.scrollY, vel = 0, raf = 0;
    const settle = () => {
      vel *= 0.92;
      const anim = track.getAnimations()[0];
      if (anim) anim.playbackRate = clamp(1 + vel * 0.12, -4, 6);
      ticker.style.setProperty('--skew', clamp(-vel * 0.25, -10, 10).toFixed(2) + 'deg');
      raf = Math.abs(vel) > 0.05 ? requestAnimationFrame(settle) : 0;
      if (!raf && anim) { anim.playbackRate = 1; ticker.style.setProperty('--skew', '0deg'); }
    };
    return (y) => {
      vel = vel * 0.6 + (y - lastY) * 0.4;
      lastY = y;
      if (!raf) raf = requestAnimationFrame(settle);
    };
  }
  const phase = (p, a, b) => { const t = clamp((p - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const pinProgress = (section, pin) => {
    const travel = section.offsetHeight - pin.offsetHeight;
    return travel > 0 ? clamp(-section.getBoundingClientRect().top / travel, 0, 1) : 0;
  };
  function initArmoryRide() {
    const section = $('#armory');
    const hall = $('#hall');
    if (reduceMotion || !canHover) return () => {};
    const pin = document.createElement('div');
    pin.className = 'armory__pin';
    while (section.firstChild) pin.appendChild(section.firstChild);
    section.appendChild(pin);
    const suits = () => $$('.suit', hall);
    section.classList.add('is-riding');
    const layout = () => {
      section.style.height = '';
      section.style.height = (pin.offsetHeight + hall.scrollWidth - hall.clientWidth) + 'px';
    };
    window.addEventListener('resize', layout);
    layout();
    const step = (dir) => {
      const extra = hall.scrollWidth - hall.clientWidth;
      const card = suits()[0];
      const cardW = card ? card.getBoundingClientRect().width + 14 : 300;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const target = clamp(hall.scrollLeft + dir * cardW * 2, 0, extra);
      window.scrollTo({ top: top + target, behavior: 'smooth' });
    };
    ['#hall-prev', '#hall-next'].forEach((sel, i) => {
      $(sel).addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        step(i ? 1 : -1);
      }, true);
    });
    return function update() {
      const r = section.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      const extra = hall.scrollWidth - hall.clientWidth;
      const p = pinProgress(section, pin);
      hall.scrollLeft = p * extra;
      const mid = window.innerWidth / 2;
      suits().forEach((s) => {
        const b = s.getBoundingClientRect();
        const d = clamp((b.left + b.width / 2 - mid) / (window.innerWidth * 0.6), -1, 1);
        s.style.setProperty('--cf-s', (1 - Math.abs(d) * 0.14).toFixed(3));
        s.style.setProperty('--cf-r', (-d * 18).toFixed(2) + 'deg');
        s.style.setProperty('--cf-o', (1 - Math.abs(d) * 0.45).toFixed(3));
      });
    };
  }
  function initPosterDeal() {
    const posters = $$('.movie__poster');
    if (reduceMotion) return () => {};
    const from = [
      { rx: 8, ry: 55, x: -18 },
      { rx: 60, ry: 0, x: 0 },
      { rx: 8, ry: -55, x: 18 }
    ];
    return function update() {
      const vh = window.innerHeight;
      posters.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -50 || r.top > vh + 50) return;
        const t = 1 - phase(clamp((vh - r.top) / (vh * 0.75), 0, 1), 0, 1);
        const f = from[i % 3];
        el.style.setProperty('--deal-rx', (f.rx * t).toFixed(2) + 'deg');
        el.style.setProperty('--deal-ry', (f.ry * t).toFixed(2) + 'deg');
        el.style.setProperty('--deal-x', (f.x * t).toFixed(2) + 'vw');
        el.style.setProperty('--deal-o', (1 - t * 0.85).toFixed(3));
      });
    };
  }
  function initHudText() {
    if (reduceMotion) return;
    const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*/<>[]=+';
    const pick = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];
    const split = (root) => {
      const label = root.textContent.replace(/\s+/g, ' ').trim();
      const owner = root.matches('h1, h2, h3, h4, p') ? root : root.closest('h1, h2, h3, h4, p') || root;
      let copy = null;
      if (/^H\d$/.test(owner.tagName)) {
        owner.setAttribute('aria-label', owner.textContent.replace(/\s+/g, ' ').trim() || label);
      } else {
        copy = document.createElement('span');
        copy.className = 'sr-only';
        copy.textContent = label;
      }
      const nodes = [];
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((node) => {
        const frag = document.createDocumentFragment();
        node.nodeValue.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const word = document.createElement('span');
          word.className = 'hud-word';
          word.setAttribute('aria-hidden', 'true');
          [...part].forEach((ch) => {
            const c = document.createElement('span');
            c.className = 'hud-ch';
            c.textContent = ch;
            c.dataset.s = 'off';
            word.appendChild(c);
          });
          frag.appendChild(word);
        });
        node.replaceWith(frag);
      });
      if (copy) root.appendChild(copy);
      return $$('.hud-ch', root);
    };
    const decode = (root) => {
      if (root._hudRaf) cancelAnimationFrame(root._hudRaf);
      const chars = root._hudChars || (root._hudChars = split(root));
      chars.forEach((c) => { c.dataset.s = 'off'; c.removeAttribute('data-g'); });
      const STEP = Math.max(14, Math.min(34, 900 / chars.length));
      const SCRAMBLE = 280;
      const start = performance.now();
      let lastSwap = 0;
      const frame = (now) => {
        const t = now - start;
        const swap = now - lastSwap > 45;
        if (swap) lastSwap = now;
        let done = true;
        chars.forEach((c, i) => {
          const local = t - i * STEP;
          if (local < 0) { done = false; return; }
          if (local < SCRAMBLE) {
            done = false;
            if (c.dataset.s !== 'scan') c.dataset.s = 'scan';
            if (swap) c.dataset.g = pick();
          } else if (c.dataset.s !== 'lock') {
            c.dataset.s = 'lock';
            c.removeAttribute('data-g');
          }
        });
        root._hudRaf = done ? 0 : requestAnimationFrame(frame);
      };
      root._hudRaf = requestAnimationFrame(frame);
    };
    const headings = $$([
      '.section-head .display > span', '.film__line > span', '.chapter h3',
      '.movie h3', '.notes__title', '.player__name'
    ].join(', ')).filter((el) => !el.closest('.hero'));
    headings.forEach((el) => { el._hudChars = split(el); });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { decode(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    headings.forEach((el) => io.observe(el));
    const panelHeads = $$('.file h3');
    panelHeads.forEach((h) => { h._hudChars = split(h); });
    const mo = new MutationObserver((records) => {
      records.forEach((r) => {
        const panel = r.target;
        if (!panel.hidden) { const h = $('h3', panel); if (h) decode(h); }
      });
    });
    panelHeads.forEach((h) => mo.observe(h.closest('[role="tabpanel"]'), { attributes: true, attributeFilter: ['hidden'] }));
    const firstVisible = panelHeads.filter((h) => !h.closest('[role="tabpanel"]').hidden);
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { decode(e.target); io2.unobserve(e.target); } });
    }, { threshold: 0.4 });
    firstVisible.forEach((h) => io2.observe(h));
    const paras = $$([
      '.section-head__sub', '.film__lede', '.film__copy > p', '.chapter__copy > p:last-child',
      '.file > p', '.file__link p', '.movie__body > p:last-child',
      '.player__desc', '.note__body > p'
    ].join(', '));
    paras.forEach((p) => p.classList.add('hud-print'));
    const byParent = new Map();
    paras.forEach((p) => {
      const parent = p.parentElement;
      if (!byParent.has(parent)) byParent.set(parent, []);
      byParent.get(parent).push(p);
    });
    const io3 = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        byParent.get(e.target).forEach((p, i) => setTimeout(() => p.classList.add('is-printed'), i * 120));
        io3.unobserve(e.target);
      });
    }, { threshold: 0.2 });
    byParent.forEach((_, parent) => io3.observe(parent));
  }
  function initDepth() {
    if (reduceMotion) return () => {};
    const layers = [
      ...$$('.chapter__media img').map((el) => ({ el, f: 0.06, max: 18, box: el.parentElement })),
      { el: $('.rogues__media'), f: 0.08, max: 60, box: $('#villains') }
    ].filter((l) => l.el);
    return function update() {
      const vh = window.innerHeight;
      layers.forEach((l) => {
        const r = l.box.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const off = clamp((r.top + r.height / 2 - vh / 2) * -l.f, -l.max, l.max);
        l.el.style.translate = `0 ${off.toFixed(1)}px`;
      });
    };
  }
  function initNavIndicator() {
    const links = $('#nav-links');
    const items = $$('a', links);
    const bar = document.createElement('span');
    bar.className = 'nav__indicator';
    bar.setAttribute('aria-hidden', 'true');
    links.appendChild(bar);
    let hovered = null;
    const moveTo = (a) => {
      if (!a) { bar.style.opacity = '0'; return; }
      bar.style.opacity = '1';
      bar.style.transform = `translateX(${a.offsetLeft}px) scaleX(${a.offsetWidth})`;
    };
    const place = () => moveTo(hovered || items.find((a) => a.classList.contains('is-active')));
    links.classList.add('has-indicator');
    items.forEach((a) => {
      a.addEventListener('pointerenter', () => { hovered = a; place(); });
      a.addEventListener('pointerleave', () => { hovered = null; place(); });
    });
    new MutationObserver(place).observe(links, { subtree: true, attributes: true, attributeFilter: ['class'] });
    window.addEventListener('resize', place);
    if (document.fonts) document.fonts.ready.then(place);
    place();
  }
  function initFilmCover() {
    const film = $('.film');
    const story = $('#story');
    if (reduceMotion) return () => {};
    return function update() {
      const vh = window.innerHeight;
      const top = story.getBoundingClientRect().top;
      if (top > vh + 50 || top < -vh) return;
      const cover = clamp(1 - top / vh, 0, 1);
      film.style.setProperty('--cover', cover.toFixed(3));
    };
  }
  initBoot();
  initReveal();
  initCounters();
  initNotes();
  initArmory();
  initCast();
  initVillains();
  initTilt();
  initCursor();
  initEmbers();
  initScramble();
  initSuitTilt();
  initMagnetic();
  initHudText();
  initNavIndicator();
  initScrollLoop([initNav(), initHero(), initTimeline(), initToTop(), initTickerSpeed(),
    initArmoryRide(), initPosterDeal(), initDepth(), initFilmCover()]);
})();
