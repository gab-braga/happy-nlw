// create map
const map = L.map('mapid').setView([-4.1635789, -40.7505288], 15)

// create and add tileLayer
L
.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map)

// create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

function addMarker({id, name, lat, lng}) {
    // create popuo overlay
    const popup = L.popup({
        closeButton: false,
        className: 'map-popup',
        minWidth: 240,
        minHeight: 240
    }).setContent(`${name}<a href="/orphanage/?id=${id}" class="choose-orphanage"><img src="/images/arrow-white.svg"></a>`)

    // create and add maker
    L
    .marker([lat, lng], {icon})
    .addTo(map)
    .bindPopup(popup)
}

const orphanages_span = document.querySelectorAll('.orphanages span')
orphanages_span.forEach(orphanage_element => {
    const orphanage = {
        id: orphanage_element.dataset.id,
        name: orphanage_element.dataset.name,
        lat: orphanage_element.dataset.lat,
        lng: orphanage_element.dataset.lng
    }
    addMarker(orphanage)
})