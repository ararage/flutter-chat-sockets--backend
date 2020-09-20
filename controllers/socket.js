const Usuario = require('../models/usuario');

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

module.exports = {
    usuarioConectado,
    usuarioDesconectado
}
