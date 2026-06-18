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
let metadata_values = ['Sermons, English', 'Poetry', 'Civil War, 1642-1649'];
let colorDomain = [];
let hoveredIndex = null;
let selectedIndex = null;
let deckInstance = null;

function rgbToHex(rgb) {
  return '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('');
}

function getPointColor(point) {
  const subject = point.subject;
  for (let i = 0; i < colorDomain.length; i++) {
    if (metadata_values.includes(colorDomain[i]) && subject.includes(colorDomain[i])) {
      return [...PALETTE[i % PALETTE.length], 255];
    }
  }
  return [120, 130, 150, 100];
}

// 60k-point base layer — never re-evaluates colors for hover/select changes
function makeBaseLayer() {
  return new ScatterplotLayer({
    id: 'scatter',
    data: new_data,
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

function makeLayers() {
  return [makeBaseLayer(), makeHighlightLayer()].filter(Boolean);
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

function appendCheckbox(idNo, value, count) {
  const colorIdx = colorDomain.indexOf(value);
  const checked = metadata_values.includes(value);
  const swatchStyle = checked ? ` style="background:${rgbToHex(PALETTE[colorIdx % PALETTE.length])}"` : '';
  const li = document.createElement('li');
  li.id = `container_${idNo}`;
  li.innerHTML =
    `<label for="NA_${idNo}">` +
    `<input type="checkbox" id="NA_${idNo}" ${checked ? 'checked' : ''}>` +
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
  } else {
    metadata_values = metadata_values.filter(v => v !== value);
    container.querySelector('.swatch').style.background = '';
  }
  redraw();
}

function addDropDowns(map_data) {
  colorDomain = map_data[2].slice(5).map(d => d[1]);
  map_data[2].slice(5).forEach((item, idx) => {
    appendCheckbox(idx + 5, item[1], item[0]);
  });
}

function filterSubject() {
  const filter = document.getElementById('subjectFilter').value.toUpperCase();
  Array.from(document.getElementById('checkbox-list').querySelectorAll('li')).forEach(li => {
    const text = (li.querySelector('label').textContent || '').toUpperCase();
    li.style.display = text.includes(filter) ? '' : 'none';
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

  document.getElementById('subjectFilter').addEventListener('input', filterSubject);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeInfoPanel();
      document.getElementById('about').classList.add('hide-about');
    }
  });

  fetch('map_data.js')
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
      }));

      addDropDowns(data);

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
