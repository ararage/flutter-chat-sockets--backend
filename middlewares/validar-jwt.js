const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next ) => {
    const token = req.header('x-token');
    console.log(token);
    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'Provide a valid token'
        })
    }
    try{
        const { uuid } = jwt.verify(token, process.env.JWT_KEY);
        req.uuid = uuid;
        next();
    }catch(e){
        return res.status(401).json({
            ok:false,
            msg: 'Invalid token'
        })
    }
}

module.exports = {
    validarJWT
}