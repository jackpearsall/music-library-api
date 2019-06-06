const Album = require('../models/album');
const Artist = require('../models/artist');

exports.addAlbum = (req, res) => {
  const album = new Album({
    name: req.body.name,
    year: req.body.year,
    artist: req.params.artistId,
  });

  Artist.findById(req.params.artistId, (err, artist) => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      album.save().then(() => {
        res.status(201).json(album);
      });
    }
  });
};
