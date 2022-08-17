import { utilService } from './util.service.js'
import { storageService } from './storage.service.js'
// import { mapService } from './map.service.js'


export const locService = {
    getLocs,
    createNewLoc,
    addNewLoc
}
const STORAGE_KEY = 'locsDB'

let locs = [
    { id: utilService.makeId(4), name: 'Greatplace', lat: 32.047104, lng: 34.832384, },
    { id: utilService.makeId(4), name: 'Neveragain', lat: 32.047201, lng: 34.832581, }
]

function getLocs() {
    if (!locs || locs.length === 0) {
        return new Promise(resolve => {
            locs = storageService.loadFromStorage(STORAGE_KEY)
            resolve(locs)
        })
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })

}

function createNewLoc(lat, lng, name) {
    return {
        id: utilService.makeId(4),
        name,
        lat,
        lng,
        createdAt: Date.now(),
    }
}

function addNewLoc(newLoc) {
    locs.push(newLoc)
    storageService.saveToStorage(STORAGE_KEY, locs)
    console.log('locs:', locs)
}
