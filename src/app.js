let express = require( 'express' );
let app = express();
let fs = require('fs');
const privateKey = fs.readFileSync( 'key.pem' );
const certificate = fs.readFileSync( 'cert.pem' );

const credentials = {key: privateKey, cert: certificate};

let server = require('https').createServer(credentials, app)

let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );

app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/', ( req, res ) => {
    if(req.query.room){
        res.sendFile( __dirname + '/index.html' );
    }
    else{
        res.redirect('/create');
    }
} );
app.get( '/create', ( req, res ) => {
    res.sendFile( __dirname + '/create-room.html' );
} );


io.of( '/stream' ).on( 'connection', stream );

server.listen( 3000 );
