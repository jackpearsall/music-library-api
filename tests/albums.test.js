const mongoose = require('mongoose');
const Artist = require('../src/models/artist');
const Album = require('../src/models/album');

describe('/albums', () => {
  let artist;

  beforeEach((done) => {
    Artist.create({
      name: 'Tame Impala',
      genre: 'Rock',
    }, (error, document) => {
      artist = document;
      done();
    });
  });

  afterEach((done) => {
    mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  describe('POST /artists/:artistId/albums', () => {
    it('creates a new album for a given artist', (done) => {
      chai.request(server)
        .post(`/artists/${artist._id}/albums`)
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          expect(res.status).to.equal(201);

          Album.findById(res.body._id, (err, album) => {
            expect(err).to.equal(null);
            expect(album.name).to.equal('InnerSpeaker');
            expect(album.year).to.equal(2010);
            expect(album.artist).to.eql(artist._id);
            done();
          });
        });
    });

    it('returns a 404 and does not create an album if the artist does not exist', (done) => {
      chai.request(server)
        .post('/artists/1234/albums')
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The artist could not be found.');

          Album.find({}, (err, albums) => {
            expect(err).to.equal(null);
            expect(albums).to.have.lengthOf(0);
            done();
          });
        });
    });
  });

  describe('GET /artists/:artistId/albums', () => {
    beforeEach((done) => {
      Promise.all([
        Album.create({ name: 'InnerSpeaker', genre: 'Rock', artist: artist.id }),
        Album.create({ name: 'InnerSpeaker2', genre: 'Rock', artist: artist.id }),
        Album.create({ name: 'InnerSpeaker3', genre: 'Rock', artist: artist.id }),
      ]);
      done();
    });
    it('gets all albums for a specified artist', (done) => {
      chai.request(server)
        .get(`/artists/${artist._id}/albums`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          Album.find({ artist: artist.id }, (err2, albums) => {
            expect(err2).to.equal(null);
            expect(albums).to.have.lengthOf(3);
            done();
          });
        });
    });
  });
});
