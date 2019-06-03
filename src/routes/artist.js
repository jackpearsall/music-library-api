const express = require('express');
const artistController = require('../controllers/artist');


const router = express.Router();

router.post('/', artistController.addArtist);
router.get('/', artistController.listAll);
router.get('/:id', artistController.listById);

module.exports = router;
