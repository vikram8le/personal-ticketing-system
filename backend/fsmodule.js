
//File System
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data)=>{   //callback is called once the file is fetched and is ready
    console.log(data);
})
console.log('Finished reading the file1');

fs.writeFile('file.txt', 'Data inserted by node fs', ()=>{
    console.log('Written to the file');
});


fs.readFile('file.txt', 'utf8', (err, data)=>{   //callback is called once the file is fetched and is ready
    console.log(data);
})
console.log('Finished reading the file1');
