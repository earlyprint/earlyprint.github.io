const { Deck, OrthographicView, ScatterplotLayer, LinearInterpolator } = deck;

const PALETTE = [
  [86, 143, 204],
  [242, 118, 134],
  [45, 168, 65],
  [228, 208, 78],
  [118, 220, 245],
  [200, 65, 143],
];

let new_data = [];
let metadata_values = ['Sermons, English', 'Ballads', 'Controversial literature'];
let colorDomain = [];
let termCat = {};
let activeCategory = 'all';
let inRangePoints = [];
let activeSubjectPoints = [];
let yearRange = [null, null];
let dataYearRange = [null, null];
let yearFreqs = {};
let hoveredIndex = null;
let selectedIndex = null;
let deckInstance = null;

function rgbToHex(rgb) {
  return '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('');
}

function getPointColor(point) {
  const terms = [...point.topical, ...point.corporate, ...point.geography, ...point.personal, ...point.form_genre, ...point.event];
  for (let i = 0; i < colorDomain.length; i++) {
    if (metadata_values.includes(colorDomain[i]) && terms.includes(colorDomain[i])) {
      return [...PALETTE[i % PALETTE.length], 255];
    }
  }
  return [120, 130, 150, 100];
}

// In-range points — data changes when yearRange changes, forcing full re-evaluation
function makeInRangeLayer() {
  return new ScatterplotLayer({
    id: 'scatter-inrange',
    data: inRangePoints,
    getPosition: d => [d.x, d.y],
    getRadius: 4,
    radiusUnits: 'pixels',
    getFillColor: d => getPointColor(d),
    stroked: false,
    filled: true,
    pickable: true,
    onHover: handleHover,
    updateTriggers: {
      getFillColor: [metadata_values.join(',')],
    },
  });
}

// 1–2 point overlay layer for hover and selection highlights
function makeHighlightLayer() {
  const items = [];
  if (selectedIndex !== null) {
    items.push({ point: new_data[selectedIndex], type: 'selected' });
  }
  if (hoveredIndex !== null && hoveredIndex !== selectedIndex) {
    items.push({ point: new_data[hoveredIndex], type: 'hover' });
  }
  if (items.length === 0) return null;

  return new ScatterplotLayer({
    id: 'scatter-highlight',
    data: items,
    getPosition: d => [d.point.x, d.point.y],
    getRadius: d => d.type === 'selected' ? 10 : 7,
    radiusUnits: 'pixels',
    getFillColor: d => {
      const base = getPointColor(d.point);
      return [base[0], base[1], base[2], 255];
    },
    getLineColor: d => d.type === 'selected' ? [235, 242, 255, 235] : [210, 220, 240, 200],
    lineWidthUnits: 'pixels',
    lineWidthMinPixels: 2,
    stroked: true,
    filled: true,
    pickable: false,
  });
}

function makeSubjectLayer() {
  if (activeSubjectPoints.length === 0) return null;
  return new ScatterplotLayer({
    id: 'scatter-subject',
    data: activeSubjectPoints,
    getPosition: d => [d.x, d.y],
    getRadius: 4,
    radiusUnits: 'pixels',
    getFillColor: d => getPointColor(d),
    stroked: false,
    filled: true,
    pickable: true,
    onHover: handleHover,
    updateTriggers: {
      getFillColor: [metadata_values.join(',')],
    },
  });
}

function makeLayers() {
  return [makeInRangeLayer(), makeSubjectLayer(), makeHighlightLayer()].filter(Boolean);
}

function updateInRangePoints() {
  inRangePoints = new_data.filter(d => {
    const yr = parseInt(d.year);
    return !validYear(yr) || (yr >= yearRange[0] && yr <= yearRange[1]);
  });
}

function updateActiveSubjectPoints() {
  activeSubjectPoints = metadata_values.length === 0 ? [] : inRangePoints.filter(d => {
    const terms = [...d.topical, ...d.corporate, ...d.geography, ...d.personal, ...d.form_genre, ...d.event];
    return metadata_values.some(mv => terms.includes(mv));
  });
}

function redraw() {
  deckInstance.setProps({ layers: makeLayers() });
}

function handleHover(info) {
  const newHovered = info.object ? info.object.i : null;
  if (newHovered === hoveredIndex) return;
  hoveredIndex = newHovered;
  updatePanel();
  deckInstance.setProps({ layers: makeLayers() });
}

function updatePanel() {
  const panel = document.getElementById('pointInfo');

  if (hoveredIndex !== null && hoveredIndex !== selectedIndex) {
    panel.classList.add('visible');
    panel.classList.remove('is-selected');
    showInfo(new_data[hoveredIndex]);
  } else if (selectedIndex !== null) {
    panel.classList.add('visible', 'is-selected');
    showInfo(new_data[selectedIndex]);
  } else {
    panel.classList.remove('visible', 'is-selected');
  }
}

function showInfo(item) {
  const nearby = searchNearby(item.x, item.y, 5).filter(n => n.id !== item.id);
  let nearbyHtml = '';
  nearby.forEach(n => {
    const truncTitle = n.title.length > 65 ? n.title.slice(0, 65) + '…' : n.title;
    nearbyHtml +=
      `<div class="nearby-item">` +
      `<div class="nearby-id">${n.id}</div>` +
      `<a href="#" onclick="event.preventDefault();selectItem(new_data[${n.i}])">${truncTitle}</a>` +
      `<div class="nearby-author">${n.author}</div>` +
      `</div>`;
  });

  document.getElementById('info-body').innerHTML =
    `<span class="field-label">TCP ID</span>` +
    `<div class="info-id">${item.id}</div>` +
    `<div class="info-title">${item.title}</div>` +
    `<span class="field-label">Author(s)</span>` +
    `<div class="info-value">${item.author}</div>` +
    `<span class="field-label">Year</span>` +
    `<div class="info-value">${item.year}</div>` +
    `<span class="field-label">Subject Headings</span>` +
    `<div class="info-value info-subjects">${item.subject}</div>` +
    `<div class="info-links">` +
    `<a href="https://texts.earlyprint.org/works/${item.id}.xml" target="_blank">Read this text ↗</a>` +
    `</div>` +
    (nearby.length > 0 ? `<span class="field-label">Nearby texts</span>${nearbyHtml}` : '');
  document.getElementById('info-body').scrollTop = 0;
}

function updateUrl(id) {
  const url = id ? `${location.pathname}?id=${encodeURIComponent(id)}` : location.pathname;
  history.replaceState(null, '', url);
}

function selectItem(item) {
  selectedIndex = item.i;
  document.getElementById('hint').classList.add('hidden');
  updateUrl(item.id);
  updatePanel();
  redraw();
}

function closeInfoPanel() {
  selectedIndex = null;
  updateUrl(null);
  updatePanel();
  redraw();
}

function searchNearby(x, y, r) {
  return new_data.filter(d => Math.abs(d.x - x) < r && Math.abs(d.y - y) < r);
}

const CAT_LABELS = {
  topical: 'Topical', corporate: 'Corporate', geography: 'Geography',
  personal: 'Personal', form_genre: 'Form/Genre',
};

function addToSelected(value, colorIdx) {
  if (document.getElementById(`sel_${colorIdx}`)) return;
  const color = PALETTE[colorIdx % PALETTE.length];
  const li = document.createElement('li');
  li.id = `sel_${colorIdx}`;
  li.innerHTML =
    `<span class="swatch" style="background:${rgbToHex(color)}"></span>` +
    `<span class="selected-term">${value}</span>` +
    `<span class="selected-cat-badge">${CAT_LABELS[termCat[value]] || ''}</span>` +
    `<button class="selected-remove" aria-label="Remove">×</button>`;
  li.querySelector('.selected-remove').addEventListener('click', () => {
    const input = document.querySelector(`#checkbox-list input[data-value="${CSS.escape(value)}"]`);
    if (input) { input.checked = false; input.dispatchEvent(new Event('change')); }
  });
  document.getElementById('selected-list').appendChild(li);
  document.getElementById('selected-section').classList.add('has-items');
}

function removeFromSelected(colorIdx) {
  document.getElementById(`sel_${colorIdx}`)?.remove();
  if (!document.getElementById('selected-list').hasChildNodes())
    document.getElementById('selected-section').classList.remove('has-items');
}

function appendCheckbox(idNo, value, count, category) {
  const colorIdx = colorDomain.indexOf(value);
  const checked = metadata_values.includes(value);
  const swatchStyle = checked ? ` style="background:${rgbToHex(PALETTE[colorIdx % PALETTE.length])}"` : '';
  const li = document.createElement('li');
  li.id = `container_${idNo}`;
  li.dataset.category = category;
  li.innerHTML =
    `<label for="NA_${idNo}">` +
    `<input type="checkbox" id="NA_${idNo}" data-value="${value}" ${checked ? 'checked' : ''}>` +
    `<span class="swatch"${swatchStyle}></span>` +
    `<span>${value} <span class="subject-count">(${count})</span></span>` +
    `</label>`;
  li.querySelector('input').addEventListener('change', e => {
    handleCheckbox(e.target.checked, value, colorIdx, li);
  });
  document.getElementById('checkbox-list').appendChild(li);
}

function handleCheckbox(checked, value, colorIdx, container) {
  if (checked) {
    metadata_values.push(value);
    container.querySelector('.swatch').style.background = rgbToHex(PALETTE[colorIdx % PALETTE.length]);
    addToSelected(value, colorIdx);
  } else {
    metadata_values = metadata_values.filter(v => v !== value);
    container.querySelector('.swatch').style.background = '';
    removeFromSelected(colorIdx);
  }
  updateActiveSubjectPoints();
  redraw();
}

function addDropDowns(graph_data) {
  const catNames = ['topical', 'corporate', 'geography', 'personal', 'form_genre'];
  const catFreqs = {};
  catNames.forEach(cat => { catFreqs[cat] = {}; });

  graph_data.forEach(d => {
    catNames.forEach(cat => {
      (d[4][cat] || []).forEach(v => {
        catFreqs[cat][v] = (catFreqs[cat][v] || 0) + 1;
      });
    });
  });

  // Assign each term to exactly one category; later entries in catNames override earlier,
  // so form_genre and corporate win over topical for the ~20 overlapping terms.
  termCat = {};
  const termCount = {};
  catNames.forEach(cat => {
    Object.entries(catFreqs[cat]).forEach(([term, count]) => {
      termCat[term] = cat;
      termCount[term] = count;
    });
  });

  colorDomain = Object.entries(termCount).sort((a, b) => b[1] - a[1]).map(e => e[0]);

  Object.entries(termCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([term, count], idx) => {
      appendCheckbox(idx, term, count, termCat[term]);
    });
}

function applyFilters() {
  const textFilter = document.getElementById('subjectFilter').value.toUpperCase();
  Array.from(document.getElementById('checkbox-list').querySelectorAll('li')).forEach(li => {
    const catMatch = activeCategory === 'all' || li.dataset.category === activeCategory;
    const textMatch = !textFilter || (li.querySelector('label').textContent || '').toUpperCase().includes(textFilter);
    li.style.display = catMatch && textMatch ? '' : 'none';
  });
}

function drawHistogram() {
  const canvas = document.getElementById('date-histogram');
  const ctx = canvas.getContext('2d');
  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  canvas.width = W;
  canvas.height = H;
  ctx.clearRect(0, 0, W, H);
  const [minYr, maxYr] = dataYearRange;
  const span = maxYr - minYr;
  const maxCount = Math.max(...Object.values(yearFreqs));
  for (let yr = minYr; yr <= maxYr; yr++) {
    const count = yearFreqs[yr] || 0;
    const barH = Math.round((count / maxCount) * H);
    const x = Math.round((yr - minYr) / span * W);
    const w = Math.max(1, Math.round(W / span));
    const inRange = yr >= yearRange[0] && yr <= yearRange[1];
    ctx.fillStyle = inRange ? 'rgba(68,119,170,0.4)' : 'rgba(150,150,150,0.15)';
    ctx.fillRect(x, H - barH, w, barH);
  }
}

function updateSliderFill() {
  const [minYr, maxYr] = dataYearRange;
  const span = maxYr - minYr;
  const leftPct = (yearRange[0] - minYr) / span * 100;
  const rightPct = (maxYr - yearRange[1]) / span * 100;
  const fill = document.getElementById('range-fill');
  fill.style.left = leftPct + '%';
  fill.style.right = rightPct + '%';
}

function setYearRange(min, max) {
  yearRange = [min, max];
  document.getElementById('date-min-slider').value = min;
  document.getElementById('date-max-slider').value = max;
  document.getElementById('date-min-input').value = min;
  document.getElementById('date-max-input').value = max;
  updateSliderFill();
  drawHistogram();
  updateInRangePoints();
  updateActiveSubjectPoints();
  redraw();
}

function validYear(yr) {
  return !isNaN(yr) && yr >= 1400 && yr <= 1710;
}

function initDateFilter() {
  yearFreqs = {};
  new_data.forEach(d => {
    const yr = parseInt(d.year);
    if (validYear(yr)) yearFreqs[yr] = (yearFreqs[yr] || 0) + 1;
  });
  const years = Object.keys(yearFreqs).map(Number);
  dataYearRange = [Math.min(...years), Math.max(...years)];
  yearRange = [...dataYearRange];
  const [minYr, maxYr] = dataYearRange;
  ['date-min-slider', 'date-max-slider'].forEach(id => {
    const el = document.getElementById(id);
    el.min = minYr; el.max = maxYr;
  });
  document.getElementById('date-min-slider').value = minYr;
  document.getElementById('date-max-slider').value = maxYr;
  ['date-min-input', 'date-max-input'].forEach(id => {
    const el = document.getElementById(id);
    el.min = minYr; el.max = maxYr;
  });
  document.getElementById('date-min-input').value = minYr;
  document.getElementById('date-max-input').value = maxYr;
  requestAnimationFrame(() => {
    drawHistogram();
    updateSliderFill();
  });
}

$(document).ready(function () {
  document.getElementById('sidebar-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  });

  document.getElementById('info-close').addEventListener('click', closeInfoPanel);

  document.getElementById('about-btn').addEventListener('click', () => {
    document.getElementById('about').classList.remove('hide-about');
  });

  document.getElementById('about-close').addEventListener('click', () => {
    document.getElementById('about').classList.add('hide-about');
  });

  document.getElementById('about').addEventListener('click', function (e) {
    if (e.target === this) this.classList.add('hide-about');
  });

  document.getElementById('date-min-slider').addEventListener('input', () => {
    let min = parseInt(document.getElementById('date-min-slider').value);
    if (min >= yearRange[1]) min = yearRange[1] - 1;
    setYearRange(min, yearRange[1]);
  });

  document.getElementById('date-max-slider').addEventListener('input', () => {
    let max = parseInt(document.getElementById('date-max-slider').value);
    if (max <= yearRange[0]) max = yearRange[0] + 1;
    setYearRange(yearRange[0], max);
  });

  document.getElementById('date-min-input').addEventListener('change', () => {
    const [dataMin] = dataYearRange;
    let min = parseInt(document.getElementById('date-min-input').value);
    min = Math.max(dataMin, Math.min(min, yearRange[1] - 1));
    setYearRange(min, yearRange[1]);
  });

  document.getElementById('date-max-input').addEventListener('change', () => {
    const [, dataMax] = dataYearRange;
    let max = parseInt(document.getElementById('date-max-input').value);
    max = Math.min(dataMax, Math.max(max, yearRange[0] + 1));
    setYearRange(yearRange[0], max);
  });

  document.getElementById('subjectFilter').addEventListener('input', applyFilters);

  document.querySelectorAll('.cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.cat;
      applyFilters();
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeInfoPanel();
      document.getElementById('about').classList.add('hide-about');
    }
  });

  fetch('map_data_tfidf.js')
    .then(r => r.json())
    .then(data => {
      const graph_data = data[0];
      const W = window.innerWidth;

      let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
      graph_data.forEach(d => {
        if (d[1] < xMin) xMin = d[1];
        if (d[1] > xMax) xMax = d[1];
        if (d[2] < yMin) yMin = d[2];
        if (d[2] > yMax) yMax = d[2];
      });
      const xRange = xMax - xMin, yRange = yMax - yMin;

      new_data = graph_data.map((d, i) => ({
        i,
        id: d[0],
        x: (d[1] - xMin) / xRange * W,
        y: (d[2] - yMin) / yRange * W,
        title: d[3].title || '',
        author: d[3].author || '',
        year: d[3].year || '',
        subject: d[3].subject || '',
        topical: d[4].topical || [],
        corporate: d[4].corporate || [],
        geography: d[4].geography || [],
        personal: d[4].personal || [],
        form_genre: d[4].form_genre || [],
        event: d[4].event || [],
      }));

      initDateFilter();
      updateInRangePoints();
      addDropDowns(graph_data);
      metadata_values.forEach(v => {
        const idx = colorDomain.indexOf(v);
        if (idx >= 0) addToSelected(v, idx);
      });
      updateActiveSubjectPoints();

      const searchData = new_data.map(d => ({ i: d.i, title: d.title, author: d.author }));
      let searchInitialized = false;

      function initSearch() {
        if (searchInitialized) return;
        searchInitialized = true;

        const bloodhound = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title', 'author'),
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          identify: obj => obj.i,
          local: searchData,
        });

        $('#search .typeahead').typeahead(
          { hint: true, highlight: true, minLength: 1 },
          { name: 'searchData', source: bloodhound, display: d => `${d.title}\n${d.author}` }
        );

        $('.typeahead').bind('typeahead:select', function (ev, suggestion) {
          const item = new_data[suggestion.i];
          selectItem(item);
          deckInstance.setProps({
            initialViewState: {
              target: [item.x, item.y, 0],
              zoom: 2,
              transitionDuration: 750,
              transitionInterpolator: new LinearInterpolator(['target', 'zoom']),
            },
          });
        });
      }

      document.querySelector('#search .typeahead').addEventListener('focus', initSearch);

      deckInstance = new Deck({
        canvas: 'graph',
        width: W,
        height: W,
        views: [new OrthographicView({ id: 'ortho' })],
        controller: true,
        initialViewState: {
          target: [W / 2, W / 2, 0],
          zoom: 0,
          minZoom: -4,
          maxZoom: 15,
        },
        parameters: { clearColor: [0.118, 0.141, 0.2, 1] },
        getCursor: ({ isHovering }) => isHovering ? 'pointer' : 'default',
        onClick: info => { if (info.object) selectItem(info.object); else closeInfoPanel(); },
        layers: makeLayers(),
      });

      const idParam = new URLSearchParams(location.search).get('id');
      if (idParam) {
        const item = new_data.find(d => d.id === idParam);
        if (item) selectItem(item);
      }

      document.querySelector('.loader').classList.remove('is-active');
    });
});
