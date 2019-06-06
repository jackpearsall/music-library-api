const express = require('express');

const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');


const app = express();

app.use(express.json());

// app.get('/hello', (req, res) => {
//   res.status(200).json({ message: 'Hello World!' });
// });

app.use('/artists', artistRouter);
app.use('/artists', albumRouter);


module.exports = app;
