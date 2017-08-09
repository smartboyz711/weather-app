const request = require('request');

request({
    url : 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia',
    json : true
},(error, response, body) => {
    console.log('address : '+body.results[0].formatted_address);
    console.log('lat : '+body.results[0].geometry.location.lat);
    console.log('lng : '+body.results[0].geometry.location.lng);
})