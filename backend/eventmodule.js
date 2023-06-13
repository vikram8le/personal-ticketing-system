const EventEmitter = require( 'events' );

class MyEmitter extends EventEmitter {}   //create a custom event emitter class MyEmitter that extends EventEmitter

const myEmitter = new MyEmitter(); // you can now use myEmitter to emit events and register event listeners based on your application's requirements


myEmitter.on('PlantsDry', () => {
    console.log('Please water the plants!');
    setTimeout(() => {
        console.log('They will die if you dont water them!!!!!');
    }, 3000);
});

console.log('The script started');
myEmitter.emit('PlantsDry');
console.log('The script is still running');
