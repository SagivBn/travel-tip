export const mapService = {
    initMap,
    addMarker,
    panTo
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
            // map.addListener("click", (mapsMouseEvent) => {

            //     const pos = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
            //     console.log('pos:', pos)
            // })
        })
}

function addMarker(loc) {
    // gMarker.setMap(null)
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
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

// map.addListener('click', mapsMouseEvent => {
//     const lat = mapsMouseEvent.latLng.lat();
//     const lng = mapsMouseEvent.latLng.lng();
//     const position = {lat, lng};
//     const locationName = prompt('Enter location name');
//     if (locationName) {
//         onAddPlace(position, locationName);

//         new google.maps.Marker({
//             position: position,
//             map: map,
//         });
//     }
// });
