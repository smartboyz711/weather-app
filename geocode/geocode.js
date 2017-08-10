const request = require('request');
var keyDarkSky = '4927e482f8e7046dd921ba7553fff9eb'

var geocodeAddress = (address,callback) =>  {
    var addressEncode = encodeURIComponent(address);
    console.log('AddressEncode : '+addressEncode);
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+addressEncode;
    console.log(url);
    request({
        url,
        json : true
    },(error, response, body) => {
        if(error){
            callback('Unable to connnect to Google Servers.');
        }else if(body){
            if(body.status == 'ZERO_RESULTS'){
                callback('Unable to find your addresss.');
            }else if(body.status == 'OK'){
                callback(undefined,{
                    address : body.results[0].formatted_address,
                    latitude : body.results[0].geometry.location.lat,
                    longitude : body.results[0].geometry.location.lng
                })
            }
        }else{
            callback('UnKnown Error from Google Api.');
        }
    });
};

var geocodeTemp = (latitude,longitude,callback) => {
    var url = 'https://api.darksky.net/forecast/'+keyDarkSky+'/'+latitude+','+longitude;
    console.log('url : '+url);
    request({
        url,
        json : true
    },(error, response, body) => {
        if(error){
            callback('Unable to connnect to forecast Servers.');
        }else if(body){
            if(body.code == '400'){
                callback(body.error);
            }else if(body.currently){
                callback(undefined,{
                    temperature_F : body.currently.temperature,
                    temperature_C : parseFloat(((body.currently.temperature-32)*(5/9)).toFixed(2)),
                    apparentTemperature_F : body.currently.apparentTemperature,
                    apparentTemperature_C : parseFloat(((body.currently.apparentTemperature-32)*(5/9)).toFixed(2))
                })
            }
        }else{
            callback('UnKnown Error from forecast.');
        }
    });
};

module.exports = {
    geocodeAddress,
    geocodeTemp
}