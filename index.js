const express = require('express');
const path = require('path');
require('dotenv').config();

// DB config
const { dbConnection } = require('./database/config').dbConnection();

// Express App
const app = express();

// Lectura y parseo del body
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicPath = path.resolve(__dirname, 'public');
app.use( express.static(publicPath));

// Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));


server.listen(process.env.PORT, (err)=>{
    if(err){
        throw new Error(err);
    }
    console.log(`Servidor corriendo en puerto ${process.env.PORT}!!!`);
});