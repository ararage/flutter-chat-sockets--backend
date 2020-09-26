const Usuario = require('../models/usuario');
const Message = require('../models/message');

const usuarioConectado = async (uuid = '') => {
    const usuario = await Usuario.findById(uuid);
    usuario.online = true;
    await usuario.save();
    return usuario;
};

const usuarioDesconectado = async (uuid = '') => {
    const usuario = await Usuario.findById(uuid);
    usuario.online = false;
    await usuario.save();
    return usuario;
};

const saveMessage = async (payload) => {
    try{
        const message = new Message( payload );
        await message.save();
        return true;
    }catch(e){
        return false;
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    saveMessage
}
