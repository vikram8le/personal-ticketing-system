// Single thread manages multiple connections.

// Asynchronous non-blocking IO Model

//npm makes node_modules folder. It contains all dependancies. Does not need to be shared when hosted. When you want to get the node_modules in a different env, use `npm i`


// npm i -g nodemon. Global install of nodemon
//It can have some dependancies which are only used during Development. To save a package as a devDependancy, `npm install --save-dev package_name`
//nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

//package-lock file. Sometimes dependacancies are interlinked. This info is stored as a dependancy tree here.


console.log("Hello this is your node program!")

//const human = require("./objects");

//console.log(human);



//It is an event driven architecture. When an event is fired, we can listen to it and take actions if needed.

const express = require ('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

//Middleware
app.use(express.json());

//Connect to MongoDB
mongoose.connect('mongodb://localhost/PTS', {useUnifiedTopology: true} )
.then( () => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
})
.catch( (error) =>  {
    console.error('Failed to connect to MongoDB', error);
});

//Routes
app.use(taskRoutes);


