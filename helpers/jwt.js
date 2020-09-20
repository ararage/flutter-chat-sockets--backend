const jwt = require('jsonwebtoken');

const generarJWT = (uuid) => {
    return new Promise((resolve, reject) => {
        const payload = { uuid };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if(err){
                reject('Error al generar el JWT')
            }
            resolve(token);
        })
    });
}

const comprobarJWT = (token='') => {
    try{
        const { uuid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uuid]; 
    }catch(e){
        return [false, null]
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}