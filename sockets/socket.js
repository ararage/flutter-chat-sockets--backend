const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, saveMessage } = require('../controllers/socket'); 

// Socket Messages
io.on('connection', client => {

    console.log("Cliente conectado");

    // Validate Token Provided
    const [valido, uuid] = comprobarJWT(client.handshake.headers['x-token'])
    
    // Verify Auth.
    if(!valido){ return client.disconnect(); }

    // Client Authenticated
    usuarioConectado(uuid);

    // Login the user to an specific chat-group
    // Global Chat-Group, client.uuid
    client.join(uuid);

    // Listen from the client the private message
    client.on('private-message', async (payload)=>{
        // TODO: Save message
        await saveMessage(payload);
        // Emit message to chanel
        io.to( payload.to ).emit('private-message', payload);
    });
    
    client.on('disconnect', () => { 
        console.log("Cliente Desconectado");
        usuarioDesconectado(uuid);
    });
});