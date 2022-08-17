import { locService } from './loc.service.js'


export const mapService = {
    initMap,
    addMarker,
    panTo,
    debounce
}


// Var that is used throughout this Module (not global)
var gMap
let gMarker

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap)

            gMap.addListener('click', mapsMouseEvent => {
                const lat = mapsMouseEvent.latLng.lat()
                const lng = mapsMouseEvent.latLng.lng()
                const position = { lat, lng }
                console.log('position:', position)
                const name = prompt('Location name?')
                const newLoc = locService.createNewLoc(position.lat, position.lng, name)
                locService.addNewLoc(newLoc)
                const laLatLng = new google.maps.LatLng(position.lat, position.lng)
                gMap.panTo(laLatLng)
                addMarker(position)
            })
        })
}

function addMarker(loc) {
    // gMarker.setMap(null)
    // marker.setMap(null)
   let marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    // gMarker = marker
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCqKcNqorCJzdRv2YIRmnLVZdCHnBkWrsw'
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    // elGoogleApi.src = ` http://maps.google.com/maps/api/js?libraries=places&sensor=false?key=${API_KEY}`
   
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function debounce(func, wait) {
    let timeout;
    return (...args) => {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

