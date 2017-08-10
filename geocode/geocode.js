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
        }else if(body.status == 'ZERO_RESULTS'){
            console.log('Unable to find your addresss');
        }else if(body.status == 'OK'){
            return body.results[0];
        }else{
            console.log('UnKnown Status from Google Api');
        }
    });
};

module.exports = {
    geocodeAddress
}