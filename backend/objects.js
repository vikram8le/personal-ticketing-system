vikram = {
    name: "Vikram",
    age: 25,
    developer: true
}

module.exports = vikram;

//Functions wrapped as function(exports, require, module, __filename,__dirname)

console.log(exports, require, module, __filename,__dirname);