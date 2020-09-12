const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt'); 

const crearUsuario = async (req, res=response) => {
    const { email, password } = req.body;
    try{
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail){
            return res.status(400).json({
                ok: false,
                message: 'Email ya registrado'
            })
        }
        const usuario = new Usuario(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        // Generar JWT
        const token = await generarJWT(usuario.id);
        return res.json({
            ok: true,
            usuario,
            token
        });
    }catch{
        return res.status(500).json({
            ok: false,
            message: 'Ocurrio un error'
        })
    }
}

const logIn = async (req, res=response) => {
    const { email, password } = req.body;
    try{
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                message: 'email no encontrado'
            })
        }
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                message: 'Contraseña invalida'
            })
        }
        // Generate JWT
        const token = await generarJWT(usuarioDB.id);
        return res.json({
            ok: true,
            usuarioDB,
            token
        });
    }catch{
        return res.status(500).json({
            ok: false,
            message: 'Ocurrio un error'
        })
    }
}

const renewToken = async (req, res=response) => {
    try{
        const { uuid } = req;
        // Find User by id
        const usuarioDB = await Usuario.findById(id=uuid);
        // Generate new JWT
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                message: 'Uuid no encontrado'
            })
        }
        const token = await generarJWT(usuarioDB.id);
        return res.json({
            ok: true,
            usuarioDB,
            token
        });
    }catch{
        return res.status(500).json({
            ok: false,
            message: 'Ocurrio un error'
        })
    }
}

module.exports = {
    renewToken,
    crearUsuario,
    logIn
}