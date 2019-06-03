const express = require('express');
const artistController = require('../controllers/artist');


const router = express.Router();

router.post('/', artistController.addArtist);
router.get('/', artistController.listAll);
router.get('/:id', artistController.listById);
router.patch('/:id', artistController.updateById);
// router.delete('/:id', artistController.deleteById);

module.exports = router;
