const express = require("express");
const router = express.Router();
const controller = require('./controller');

router.post("/api/save-call-id", controller.saveCallId);    // it will save call Id to redis
router.get("/api/get-call-id/:id", controller.getCallId);   // we  pass the id we are getting from front-end to controller model

module.exports = router;