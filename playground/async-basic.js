console.log('Starting app')

setTimeout(() => {
     console.log('Inside of callback')
 },2000);

setTimeout(() => {
    console.log('Second of callback')
},0);


console.log('Finish up')