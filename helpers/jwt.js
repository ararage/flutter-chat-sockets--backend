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

module.exports = {
    generarJWT
}