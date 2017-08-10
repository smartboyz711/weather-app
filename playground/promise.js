var asyncadd = (a,b) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number') {
                resolve(a+b);
            }else{
                reject('Argments must be numbers');
            }
        },2500);
    });
};

asyncadd(5,'7').then((res) => {
    console.log('Result : ', res);
    return  asyncadd(res,33);
}).then((res) => {
    console.log('Should be 45', res)
}).catch((errorMessage) => {
    console.log(errorMessage);
});

// var somePromise = new Promise((resolve,reject) => {
//     setTimeout(() => {
//         resolve('hey.it worked');
//         reject('Unable to fulfill promise');
//     },2500);
// });

// somePromise.then((message) =>{
//     console.log('Success : ',message);
// },(errorMessage) => {
//     console.log('Error', errorMessage);
// });