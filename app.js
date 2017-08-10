const yargs = require('yargs');
var _ = require('lodash');
const geocode = require('./geocode/geocode')

const argv = yargs
    .options({
        a:{
            demand : true,
            alias : 'address',
            describe : 'Address to fetch weather for',
            string : true
        }
    })
    .help()
    .alias('help','h')
    .argv;


var results = geocode.geocodeAddress(argv.a)
if(results){
    console.log('address : '+results.formatted_address);
    console.log('lat : '+results.geometry.location.lat);
    console.log('lng : '+results.geometry.location.lng);
}