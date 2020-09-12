const { io } = require('../index');
// Socket Messages
io.on('connection', client => {

    console.log("Cliente conectado");
    
    client.on('disconnect', () => { console.log("Cliente Desconectado") });
});