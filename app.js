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

geocode.geocodeAddress(argv.a, (errorMassage,results) => {
    if(errorMassage){
        console.log(errorMassage);
    }else{
        console.log(JSON.stringify(results,undefined,2));
        geocode.geo(results);
    }
});

//4927e482f8e7046dd921ba7553fff9eb
//https://api.darksky.net/forecast/[key]/[latitude],[longitude]