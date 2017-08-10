const request = require('request');
var keyDarkSky = '4927e482f8e7046dd921ba7553fff9eb'

var geocodeAddress = (address,callback) =>  {
    var addressEncode = encodeURIComponent(address);
    console.log('AddressEncode : '+addressEncode);
    request({
        url : 'https://maps.googleapis.com/maps/api/geocode/json?address='+addressEncode,
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

var geocodeTemp = (results,callback) => {
    var url = 'https://api.darksky.net/forecast/'+keyDarkSky+'/'+results.latitude+','+results.longitude;
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
                    temperature : body.currently.temperature
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