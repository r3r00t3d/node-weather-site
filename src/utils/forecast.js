const request = require('request')

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(response.body.daily.data[0].summary + 
//             ' It is currently ' + response.body.currently.temperature + 
//             ' out. There is ' + response.body.currently.precipProbability + 
//             '% chance for rain.')
//     }
    
// })

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/396b60255322a7d6696a280b1596c943/' + 
    latitude + ',' + longitude + '?units=si'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 
                ' It is currently ' + body.currently.temperature + 
                ' out. There is ' + body.currently.precipProbability + 
                '% chance for rain.')
        }
    }) 
}

module.exports = forecast