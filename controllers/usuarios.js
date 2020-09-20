const { response } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res) => {
    try{
        const from = Number(req.query.from) || 0;
        const usuarios = await Usuario
            .find({ _id: { $ne: req.uuid } })
            .sort('-online')
            .skip(from)
            .limit(10)
        return res.json({
            ok: true,
            usuarios,
            from
        });
    }catch{
        return res.status(500).json({
            ok: false,
            message: 'Ocurrio un error'
        })
    }
}

module.exports = {
    getUsuarios
}
