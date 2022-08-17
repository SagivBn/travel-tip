import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'


window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSearchPlace = onSearchPlace


function onInit() {
    const elInput = document.querySelector('[name=search-loc]')
    // elInput.addEventListener('input', mapService.debounce(onGetLocs, 1000))
    console.log('elInput:', elInput)
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            // document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
            marker = mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude })
            // gMarker = marker
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function onSearchPlace(elPlace) {
// console.log('elPlace:', elPlace)
const searchBox = new google.maps.places.SearchBox(elPlace)
// map.controls[google.maps.ControlPosition.TOP_LEFT].push(elPlace)
// map.addListener("bounds_changed", () => {
    // searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds)
//   })
google.maps.event.addListener(searchBox , 'place_changed' , function(){
    var places = searchBox.getPlaces();
    var bounds =  new google.maps.LatLngBounds();
    var i,place;
    for( i = 0; palce = places[i]; i++)
    {
    bounds.extend(place.geometry.location);
    marker.setPosition(place.geometry.location);
    }
    map.fitBounds(bounds);
    map.setZoom(12);
})
}