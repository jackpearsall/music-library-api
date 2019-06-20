const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  year: Number,
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
