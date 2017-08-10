const request = require('request');

var geocodeAddress = (address) =>  {
    var addressEncode = encodeURIComponent(address);
    console.log('AddressEncode : '+addressEncode);
    request({
        url : 'https://maps.googleapis.com/maps/api/geocode/json?address='+addressEncode,
        json : true
    },(error, response, body) => {
        if(error){
            console.log('Unable to connnect to Google Servers.');
        }else if(body){
            if(body.status == 'ZERO_RESULTS'){
                console.log('Unable to find your addresss.');
            }else if(body.status == 'OK'){
                console.log('address : '+body.results[0].formatted_address);
                console.log('lat : '+body.results[0].geometry.location.lat);
                console.log('lng : '+body.results[0].geometry.location.lng);
            }
        }else{
            console.log('UnKnown Error from Google Api.');
        }
    });
};

module.exports = {
    geocodeAddress
}