const express = require('express');

const artistRouter = require('./routes/artist');
// const artistController = require('./controllers/artist');
// const Artist = require('./models/artist');

const app = express();

app.use(express.json());

// app.get('/hello', (req, res) => {
//   res.status(200).json({ message: 'Hello World!' });
// });

app.use('/artists', artistRouter);

// app.post('/artists', (req, res) => {
//   const artist = new Artist({
//     name: req.body.name,
//     genre: req.body.genre,
//   });

//   artist.save().then(() => {
//     res.status(201).json(artist);
//   });
// });

module.exports = app;
