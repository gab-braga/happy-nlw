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
    iconAnchor: [29, 68]
})

let marker

// create and add maker
map.on('click', (event) => {
    const lat = event.latlng.lat
    const lng = event.latlng.lng

    document.querySelector('[name=lat]').value = lat
    document.querySelector('[name=lng]').value = lng

    marker && map.removeLayer(marker)
    
    marker = L.marker([lat, lng], {icon})
    .addTo(map)
})

// select photos
function addPhotoField() {
    const container = document.querySelector('#images')
    const fieldsContainerImage = document.querySelectorAll('.field-container-image')
    console.log(fieldsContainerImage)
    const clonedFieldLastContainerImage = fieldsContainerImage[fieldsContainerImage.length-1].cloneNode(true)
    const field = clonedFieldLastContainerImage.children[0]
    if(!(field.value === "")) {
        field.value = ""
        container.appendChild(clonedFieldLastContainerImage)
    }
}


function deleteFieldPhoto(event) {
    const button = event.currentTarget
    const fieldsContainerImage = document.querySelectorAll('.field-container-image')
    const lengthFieldsImage = fieldsContainerImage.length
    const fieldRemove = button.parentNode
    if(lengthFieldsImage > 1) {
        document.querySelector('#images').removeChild(fieldRemove)
    }
    else {
        fieldRemove.children[0].value = ""
    }
}

function toggleSelect(event) {
    const buttons = document.querySelectorAll('.button-select button')
    const button = event.currentTarget
    const input = document.querySelector('#open-on-weekends')
    if(button === buttons[0]) {
        input.value = button.dataset.value
        buttons[0].classList.add('active')
        buttons[1].classList.remove('active')
    }
    else if(button === buttons[1]) {
        input.value = button.dataset.value
        buttons[1].classList.add('active')
        buttons[0].classList.remove('active')
    }
}