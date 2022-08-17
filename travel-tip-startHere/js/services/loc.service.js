import { utilService } from './util.service.js'


export const locService = {
    getLocs
}


const locs = [
    { id:utilService.makeId(4), name: 'Greatplace', lat: 32.047104, lng: 34.832384,  },
    { id:utilService.makeId(4), name: 'Neveragain', lat: 32.047201, lng: 34.832581,  }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}



