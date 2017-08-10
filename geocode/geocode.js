const request = require('request');

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

module.exports = {
    geocodeAddress
}