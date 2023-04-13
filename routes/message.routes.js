const express = require("express");
const router = express.Router();

//require message model
const Message = require("../models/Message.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

//READ: messages details
router.get("/my-account/:userId/messages", isLoggedIn, (req, res, next) => {

    const { userId } = req.params;

    Message.find({ sender: userId })
        .populate('receiver')
        .then(messageDetails => {
            res.json(messageDetails);
        })
        .catch(err => {
            console.log("error getting the message", err);
            res.status(500).json({
                message: "error getting the message",
                error: err
            });
        })

});


module.exports = router;