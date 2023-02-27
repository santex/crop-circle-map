/**
 * add move and delete marker
 */

// config map
let config = {
  minZoom: 3,
  maxZomm: 18
};
// magnification with which the map will start
const zoom = 4;
// co-ordinates
const lat = 51.2977;
const lon = -0.51178;

// calling map
const map = L.map("map", config).setView([lat, lon], zoom);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// add marker on click
map.on("click", addMarker);

function addMarker(e) {
  // Add marker to map at click location
  const markerPlace = document.querySelector(".marker-position");
  markerPlace.textContent = `new marker: ${e.latlng.lat}, ${e.latlng.lng}`;

  const marker = new L.marker(e.latlng, {
    draggable: true
  })
    .addTo(map)
    .bindPopup(buttonRemove);

  // event remove marker
  marker.on("popupopen", removeMarker);

  // event draged marker
  marker.on("dragend", dragedMaker);
}

const buttonRemove =
  '<button type="button" class="remove">delte marker 💔</button>';

// remove marker
function removeMarker() {
  const marker = this;
  const btn = document.querySelector(".remove");
  btn.addEventListener("click", function () {
    const markerPlace = document.querySelector(".marker-position");
    markerPlace.textContent = "goodbye marker 💩";
    map.removeLayer(marker);
  });
}

// draged
function dragedMaker() {
  const markerPlace = document.querySelector(".marker-position");
  markerPlace.textContent = `change position: ${this.getLatLng().lat}, ${
    this.getLatLng().lng
  }`;
}
