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

console.log('command : '+argv.a);
var AddressEncode = encodeURIComponent(argv.a);
console.log('AddressEncode : '+AddressEncode);

request({
    url : 'https://maps.googleapis.com/maps/api/geocode/json?address='+AddressEncode,
    json : true
},(error, response, body) => {
    if(error){
        console.log('Unable to connnect to Google Servers.');
    }else if(body.status == 'ZERO_RESULTS'){
        console.log('Unable to find your addresss');
    }else if(body.status == 'OK'){
        console.log('address : '+body.results[0].formatted_address);
        console.log('lat : '+body.results[0].geometry.location.lat);
        console.log('lng : '+body.results[0].geometry.location.lng);
    }else{
        console.log('UnKnown Status from Google Api');
    }
});