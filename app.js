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

var results = geocode.geocodeAddress(argv.a, (errorMassage,results) => {
    if(errorMassage){
        console.log(errorMassage);
    }else{
        console.log(JSON.stringify(results,undefined,2));
    }
});