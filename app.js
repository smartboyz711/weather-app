const request = require('request');
const yargs = require('yargs');
var _ = require('lodash');

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

console.log('command : '+argv);
var AddressEncode = encodeURIComponent(argv.a);
console.log('AddressEncode : '+AddressEncode);

request({
    url : 'https://maps.googleapis.com/maps/api/geocode/json?address='+AddressEncode,
    json : true
},(error, response, body) => {
    if(body){
        console.log('address : '+body.results[0].formatted_address);
        console.log('lat : '+body.results[0].geometry.location.lat);
        console.log('lng : '+body.results[0].geometry.location.lng);
    }else{
        console.log(error);
    }
});