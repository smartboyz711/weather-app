const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const axios = require('axios');
var keyDarkSky = '4927e482f8e7046dd921ba7553fff9eb';

const argv = yargs
    .options({
        a:{
            demand : true,
            alias : 'address',
            describe : 'Address to fetch weather info.',
            string : true
        }
    })
    .help()
    .alias('help','h')
    .argv;

var addressEncode = encodeURIComponent(argv.a);
var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+addressEncode;
console.log('geocodeUrl : '+geocodeUrl);

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    console.log('Address : '+response.data.results[0].formatted_address);
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = 'https://api.darksky.net/forecast/'+keyDarkSky+'/'+lat+','+lng;
    console.log('weatherUrl : '+weatherUrl);
    return axios.get(weatherUrl);
}).then((response) => {  
    console.log(JSON.stringify({
        temperature_F : response.data.currently.temperature,
        apparentTemperature_F : response.data.currently.apparentTemperature,
        temperature_C : geocode.changeFtoC(response.data.currently.temperature),
        apparentTemperature_C : geocode.changeFtoC(response.data.currently.apparentTemperature)
    },undefined,2));
}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers.');
    }else{
        console.log(e.message);
    }
});