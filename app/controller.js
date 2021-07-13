//*****************************************************************//
// this controller.js has basically 2 function in it, which is to saveCallId & 
// getCallId to redis-server which we got from our front-end server
//******************************************************************// 


const { saveCallId, getCallId } = require("./model");
//const { isTransformEffect } = require("html2canvas/dist/types/render/effects")

// to save callId
exports.saveCallId = async(req, res) => {
    try {
        const { id, signalData } = req.body;
        await saveCallId(id, signalData);
        res.status(200).send(true);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
};

// to get callId
exports.getCallId = async(req, res) => {
    try {
        const { id } = req.params;
        const code = await getCallId(id);
        res.status(200).send({ code });
    } catch (ex) {
        res.status(400).send(ex.message);
    }
};