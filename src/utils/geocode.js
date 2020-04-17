const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoib2pvZGV2IiwiYSI6ImNrOHd2OGZ6MDAwY3IzaG54Z3V3bjloZjAifQ.Qclify8gKIKUobsVNtWhuw&limit=1'
    request( {url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geomap service') // Second argument (data) is undefined
        } else if (body.features === undefined || body.features.length === 0) {
            callback('Unable to find location') // Second argument (data) is undefined
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placename: body.features[0].place_name
            })
        }
    })
} 

module.exports = geocode