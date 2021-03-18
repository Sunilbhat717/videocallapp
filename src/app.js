let express = require( 'express' );
let app = express();
let server = require( 'https' );
let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );
let fs = require('fs');

app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );

io.of( '/stream' ).on( 'connection', stream );

const privateKey = fs.readFileSync( 'key.pem' );
const certificate = fs.readFileSync( 'cert.pem' );

const credentials = {key: privateKey, cert: certificate};

const httpsServer = server.createServer(credentials, app);

httpsServer.listen( 3000 );
