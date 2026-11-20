const paths = {
  home: 'M3 10 12 3l9 7v10H3z M9 20v-7h6v7',
  itinerary: 'M4 6h16v15H4z M8 3v5m8-5v5M4 11h16',
  compass: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M16 8l-2.5 5.5L8 16l2.5-5.5z',
  food: 'M4 3v5a2 2 0 0 0 4 0V3M6 3v18M17 3c-3 3-4 7-4 10h4v8m0-18v10',
  plane: 'm3 13 4 2 4-2L6 7l2-1 7 4 4-3c2-1 4 1 2 3l-12 9H5l-3-4z',
  group: 'M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M5 20v-2a7 7 0 0 1 14 0v2z M5 6a3 3 0 0 0 0 6m14-6a3 3 0 0 1 0 6M4 14a5 5 0 0 0-3 5m19-5a5 5 0 0 1 3 5'
};
const icon = name => '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="' + paths[name] + '"/></svg>';

const menu = [
  ['home', 'Home', 'home'], ['itinerario', 'Itinerario', 'itinerary'],
  ['esperienze', 'Esperienze', 'compass'], ['food', 'Food', 'food']
];
const cities = [
  ['kruja', 'Kruja (Croia)', 'Sab 21 nov', 'Borgo storico, castello e tradizioni albanesi.'],
  ['tirana', 'Tirana', 'Dom 22 nov', 'Alla scoperta della capitale, tra arte, storia e mercati.']
];
const attractions = [
  ['bunkart', 'Bunk’Art 2', 'Un ex bunker trasformato in museo, dedicato alla storia del regime comunista albanese.', 'BunkArt 2 Tirana'],
  ['skanderbeg', 'Piazza Skanderbeg', 'La piazza centrale di Tirana, con il monumento equestre e la Torre dell’Orologio nelle vicinanze.', 'Skanderbeg Square Tirana'],
  ['pazari', 'Pazari i Ri', 'Il mercato dove fare un giro tra banchi di frutta, spezie e locali.', 'Pazari i Ri Tirana'],
  ['piramide', 'La Piramide', 'Un edificio simbolo della città, ripensato come spazio contemporaneo.', 'Pyramid of Tirana'],
  ['moschea', 'La Grande Moschea', 'La Grande Moschea di Tirana, conosciuta anche come moschea Namazgah.', 'Namazgah Mosque Tirana'],
  ['parco', 'Grand Park', 'Una pausa nel verde lungo il lago artificiale, a sud del centro.', 'Grand Park Tirana']
];
const restaurants = [
  ['tymi', 'Tymi', 'Cucina tradizionale albanese in un’atmosfera informale.', 'Tymi Tirana'],
  ['suku', 'Gjelltore SaUku', 'Piatti semplici e casalinghi.', 'Gjelltore SaUku Tirana'],
  ['zgara', 'Zgara Supreme 2', 'Carne alla griglia e specialità locali.', 'Zgara Supreme 2 Tirana']
];
const krujaStops = [
  ['Il Castello di Kruja', 'Passeggiate lungo le mura per ammirare il panorama sulla valle.', 'Kruja Castle'],
  ['Il Bazar Storico', 'Un giro tra botteghe di artigianato, tappeti e souvenir lungo la via acciottolata.', 'Old Bazaar Kruja'],
  ['Museo Skanderbeg', 'All’interno del castello, un museo dedicato all’eroe nazionale albanese.', 'Skanderbeg Museum Kruja']
];
const imageWidths = {
  bunkart: [495, 862], food: [650, 1024], pazari: [650, 1024],
  tirana: [650, 906], tymi: [650, 1150], suku: [650, 1100], zgara: [650, 1100]
};
const img = (file, alt = '', lazy = true, thumbnail = false) => {
  const name = file === 'skanderbeg' ? 'tirana' : file;
  const small = 'img/' + name + '-small.webp?v=2';
  const large = 'img/' + name + '.webp?v=2';
  const [smallWidth, largeWidth] = imageWidths[name] ?? [650, 1280];
  const responsive = thumbnail ? '' :
    ' srcset="' + small + ' ' + smallWidth + 'w, ' + large + ' ' + largeWidth + 'w" sizes="(max-width: 680px) 90vw, 540px"';
  return '<img src="' + (thumbnail ? small : large) + '" alt="' + alt + '" decoding="async"' +
    responsive + (lazy ? ' loading="lazy"' : '') + '>';
};
const maps = query => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
const mapLink = query => '<a class="map" href="' + maps(query) + '">Apri in Google Maps</a>';
const button = (id, label) => '<a class="cta" href="#' + id + '">' + label + '</a>';
const back = (id, label) => '<a class="back" href="#' + id + '">‹ &nbsp;' + label + '</a>';
const intro = (title, copy = '') => '<div class="intro"><h1>' + title + '</h1>' + (copy ? '<p>' + copy + '</p>' : '') + '</div>';
const grid = (cards, kind = '') => '<div class="grid ' + kind + '">' + cards.join('') + '</div>';
const card = ({href, photo, title, copy, tag, action = 'Scopri la tappa'}) =>
  '<a class="card" href="' + href + '">' + img(photo, '', true, true) + '<div class="pad">' +
  (tag ? '<small>' + tag + '</small>' : '') + '<h3>' + title + '</h3>' +
  (copy ? '<p>' + copy + '</p>' : '') + '<span class="card-action">' + action + '</span></div></a>';
const dayCards = (tags = true) => grid(cities.map(([id, title, tag, copy]) =>
  card({href: '#' + id, photo: id, title, copy, tag: tags ? tag : ''})), 'days');
const fact = (symbol, title, first, second) => '<article class="fact">' + icon(symbol) + '<strong>' + title +
  '</strong><span>' + first + '</span><span>' + second + '</span></article>';
const disclose = (title, content) => '<details><summary>' + title + '</summary><div>' + content + '</div></details>';

function home() {
  return '<section class="hero"><div class="hero-copy"><p class="eyebrow">The Girls Travel Guide</p>' +
    '<h1 class="hero-title">Weekendino<br><u>Vigliacche</u></h1><p class="place">Tirana, Albania</p>' +
    '<p class="trip-date">21–22 novembre 2026</p>' + button('itinerario', 'Scopri il viaggio') +
    '</div><div class="postcard">' + img('tirana-hero', 'Veduta di Tirana', false) +
    '<span class="tape" aria-hidden="true"></span><span class="stamp" aria-hidden="true">🇦🇱</span></div></section>' +
    '<section class="facts" aria-label="Il viaggio in breve">' +
    fact('plane', 'Partenza', 'Sab 21 nov · 08:50', 'Milano Malpensa (T1)') +
    fact('plane', 'Ritorno', 'Dom 22 nov · 20:00 · TIA', 'Arrivo 22:05 · MXP (T1)') +
    fact('group', 'Le Vigliacche', 'Chupi, Elli, FDB,', 'Fedabi, Mati, Sara ♡') +
    fact('itinerary', 'Durata', '2 giorni', '1 weekend insieme') + '</section>' +
    '<section><h2 class="section-title"><span class="spark" aria-hidden="true">✦</span> Il nostro itinerario</h2>' +
    dayCards() + '</section><section class="food-feature">' + img('food', 'Cucina albanese') +
    '<div><h2>Food &amp; Tips</h2><p>I posti consigliati per provare la cucina albanese.</p>' +
    button('food', 'Dove mangiare') + '</div></section>';
}

function city(id) {
  const [, title, date] = cities.find(([key]) => key === id);
  const copy = id === 'kruja' ? 'Un borgo storico con un castello, un bazar tradizionale e un museo dedicato a Skanderbeg.' :
    'La capitale dell’Albania, dove storia e architettura contemporanea si incontrano tra piazze, mercati e parchi.';
  const top = back('esperienze', 'Torna alle esperienze') + '<div class="detail-layout"><div><span class="tag">' + date +
    '</span>' + intro(title, copy) + '</div>' + img(id, 'Veduta di ' + title, false) + '</div>';
  if (id === 'kruja') {
    return top + '<h2 class="section-title">Cosa vedere</h2>' +
      krujaStops.map(([name, description, query]) => disclose(name, '<p>' + description + '</p>' + mapLink(query))).join('') +
      '<aside class="panel"><h2>✦ Curiosità</h2><p>A Kruja, il castello e il museo raccontano la resistenza guidata da Skanderbeg contro l’Impero ottomano nel XV secolo.</p></aside>';
  }
  return top + '<h2 class="section-title">Cosa vedere</h2>' + grid(attractions.map(([id, title]) =>
    card({href: '#' + id, photo: id, title})), 'three');
}

const views = {
  home,
  crediti: () => intro('Crediti fotografici') + '<ul class="credits">' + Object.values(photoCredits).map(({label, url, credit}) => '<li><a href="' + url + '">' + label + '</a>' + (credit ? ' · ' + credit : '') + '</li>').join('') + '</ul>',
  itinerario: () => intro('Il nostro itinerario', 'Due giorni, due città. Apri una tappa per vedere cosa visitare.') + dayCards(),
  esperienze: () => intro('Esperienze', 'Castelli, bazar e passeggiate tra Kruja e Tirana.') + dayCards(false),
  kruja: () => city('kruja'),
  tirana: () => city('tirana'),
  food: () => intro('Dove mangiare', 'Tre idee per assaggiare la cucina albanese a Tirana.') +
    grid(restaurants.map(([id, title, copy]) => card({href: '#' + id, photo: id, title, copy, action: 'Vedi il locale'})), 'three')
};
for (const [group, parent, label] of [[attractions, 'tirana', 'Torna a Tirana'], [restaurants, 'food', 'Torna a dove mangiare']]) {
  for (const [id, title, description, query] of group) {
    views[id] = () => back(parent, label) + '<div class="detail-layout"><div>' + intro(title, description) +
      mapLink(query) + '</div>' + img(id, '', false) + '</div>';
  }
}

const main = document.getElementById('contenuto');
const nav = document.getElementById('menu');
nav.innerHTML = menu.map(([id, label, symbol]) => '<a class="nav-link" href="#' + id + '">' + icon(symbol) + '<span>' + label + '</span></a>').join('');

function render(moveFocus = false) {
  const hash = location.hash.slice(1);
  if (hash === 'contenuto' && main.childElementCount) {
    main.focus();
    return;
  }
  const id = Object.hasOwn(views, hash) ? hash : 'home';
  main.innerHTML = views[id]();
  const category = Object.hasOwn(Object.fromEntries(menu), id) ? id : restaurants.some(([key]) => key === id) ? 'food' : id === 'crediti' ? 'info' : 'esperienze';
  main.dataset.theme = category;
  main.dataset.page = id;
  main.insertAdjacentHTML('afterbegin', '<div class="page-art" aria-hidden="true"><i></i></div>');
  for (const link of nav.querySelectorAll('a')) {
    if (link.hash === '#' + category) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  document.title = id === 'home' ? 'Weekendino Vigliacche · Tirana, Albania' : main.querySelector('h1').textContent + ' · Weekendino Vigliacche';
  window.scrollTo(0, 0);
  if (moveFocus) main.focus({preventScroll: true});
}

render();
window.addEventListener('hashchange', () => render(true));
