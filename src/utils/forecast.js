const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=73e8a1c1576f7e367936582910bb1d05&query='+latitude + ',' + longitude
    request( {url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, 'Its is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. ' + body.current.weather_descriptions[0] +'. There is a ' + body.current.precip + ' chance of rain.')
        }
    })
}

module.exports = forecast