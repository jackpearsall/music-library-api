const Artist = require('../models/artist');

exports.addArtist = (req, res) => {
  const artist = new Artist({
    name: req.body.name,
    genre: req.body.genre,
  });

  artist.save().then(() => {
    res.status(201).json(artist);
  });
};

exports.listAll = (req, res) => {
  Artist.find({}, (error, artists) => {
    res.status(200).json(artists);
  });
};
