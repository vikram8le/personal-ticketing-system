const http = require( 'http' );

const port = process.env.PORT || 3000; //get whichever port we are getting for this process from the environment.

const server = http.createServer((req, res) =>{
    console.log(req.url);
    res.statusCode = 200; //ok. Check documentation for other status codes
    res.setHeader('Content-type', 'text/html')
    res.end(' <h1> Hey this is your server talking to you! </h1>' );

})


server.listen(port, () =>{
    console.log(`Server is listening on port ${port}` );
});