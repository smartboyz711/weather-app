const request = require('request')

var geocodeAddress = (address) => {
    return new Promise((resolve,reject) => {
        var addressEncode = encodeURIComponent(address);
        console.log('AddressEncode : '+addressEncode);
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+addressEncode;
        console.log(url);
        request({
            url,
            json : true
        },(error, response, body) => {
            if(error){
                reject('Unable to connnect to Google Servers.');
            }else if(body){
                if(body.status == 'ZERO_RESULTS'){
                    reject('Unable to find your addresss.');
                }else if(body.status == 'OK'){
                    resolve({
                        address : body.results[0].formatted_address,
                        latitude : body.results[0].geometry.location.lat,
                        longitude : body.results[0].geometry.location.lng
                    });
                }
            }else{
                reject('UnKnown Error from Google Api.');
            }
        });
    });
};

geocodeAddress('19146').then((location) => {
    console.log(JSON.stringify(location,undefined,2));
},(errorMessage) => {
    console.log(errorMessage);
});
