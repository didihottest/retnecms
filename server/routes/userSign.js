const express = require('express');
const router = express.Router();

const verifySignController = require('../controller').verifySign;
const whoIsController = require('../controller').WhoIs;

router.post('/authorization', verifySignController.signin);
router.get('/whois', whoIsController.WhoIs)



module.exports = router;