const Message = require('../models/message');

const getMessages = async (req, res) => {
    try{
        const myUUID = req.uuid;
        const messagesFrom = req.params.from;

        const last30 = await Message.find({
            $or:[
                {
                    from: myUUID,
                    to: messagesFrom
                },{
                    from: messagesFrom,
                    to: myUUID
                }
            ]
        })
        .sort({createdAt: 'desc'})
        .limit(30);
        
        return res.json({
            ok: true,
            messages: last30
        });
    }catch{
        return res.status(500).json({
            ok: false,
            message: 'Ocurrio un error'
        })
    }
}

module.exports = {
    getMessages
}
