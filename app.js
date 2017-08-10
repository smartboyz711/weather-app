const yargs = require('yargs');
var _ = require('lodash');
const geocode = require('./geocode/geocode')

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

geocode.geocodeAddress(argv.a, (errorMassage,results) => {
    if(errorMassage){
        console.log('Google Error'+errorMassage);
    }else{
        console.log(JSON.stringify(results,undefined,2));
        geocode.geocodeTemp(results.latitude,results.longitude,(errorMassage,results) => {
            if(errorMassage){
                console.log('Forecast error'+errorMassage);
            }else{
                console.log(JSON.stringify(results,undefined,2));
            }
        });
    }
});