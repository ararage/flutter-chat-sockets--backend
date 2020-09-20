const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket'); 

// Socket Messages
io.on('connection', client => {

    console.log("Cliente conectado");

    // Validate Token Provided
    const [valido, uuid] = comprobarJWT(client.handshake.headers['x-token'])
    
    // Verify Auth.
    if(!valido){ return client.disconnect(); }

    // Client Authenticated
    usuarioConectado(uuid);
    
    client.on('disconnect', () => { 
        console.log("Cliente Desconectado");
        usuarioDesconectado(uuid);
    });
});