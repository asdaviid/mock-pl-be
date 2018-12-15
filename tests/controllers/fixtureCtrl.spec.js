let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
const sinon = require('sinon');
const request = require('request');
const fixtureController = require('../../controllers/fixture.controller');
let server = require('../../app');
const cfg = require('../../config/app.config');
const jwt = require('jwt-simple');

chai.use(chaiHttp);

describe('controllers.fixture', () => {
  it('exists', () => {
    expect(fixtureController).to.exist;
  });

  it('has listFixtures function', () => {
    expect(fixtureController.listFixtures).to.exist;
    expect(typeof fixtureController.listFixtures).to.be.equal('function');
  });

  it('has createFixture function', () => {
    expect(fixtureController.createFixture).to.exist;
    expect(typeof fixtureController.createFixture).to.be.equal('function');
  });

  it('has updateFixture function', () => {
    expect(fixtureController.updateFixture).to.exist;
    expect(typeof fixtureController.updateFixture).to.be.equal('function');
  });

  it('has getFixture function', () => {
    expect(fixtureController.getFixture).to.exist;
    expect(typeof fixtureController.getFixture).to.be.equal('function');
  });

  it('has deleteFixture function', () => {
    expect(fixtureController.deleteFixture).to.exist;
    expect(typeof fixtureController.deleteFixture).to.be.equal('function');
  });

  describe('controllers.fixture routes', () => {
    describe('access fixture routes without Authorization', () => {
      describe('GET /api/v1/fixtures', () => {
        it('should return unauthorized', (done) => {
          chai.request(server)
            .get('/api/v1/fixtures')
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });

      describe('POST /api/v1/fixtures', () => {
        it('should return unauthorized', (done) => {
          chai.request(server)
            .post('/api/v1/fixtures')
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });

      describe('GET /api/v1/fixtures/fixture_id', () => {
        it('should return unauthorized', (done) => {
          chai.request(server)
            .get('/api/v1/fixtures/1')
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });

      describe('PUT /api/v1/fixtures', () => {
        it('should return unauthorized', (done) => {
          chai.request(server)
            .put('/api/v1/fixtures/1')
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });

      describe('DELETE /api/v1/fixtures/1', () => {
        it('should return unauthorized', (done) => {
          chai.request(server)
            .delete('/api/v1/fixtures/1')
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });
    });

    describe('access fixture routes with Authorization', () => {
      let token;

      beforeEach(() => {
        var user = {
          _id: 'wlkjgklfkjhd',
          username: 'username',
          password: 'password'
        };

        const payload = {
          user
        };

        token = jwt.encode(payload, cfg.jwtSecret);

        this.get = sinon.stub(request, 'get');
        this.post = sinon.stub(request, 'post');
        this.put = sinon.stub(request, 'put');
        this.delete = sinon.stub(request, 'delete');
      });

      afterEach(() => {
        request.get.restore();
        request.post.restore();
        request.put.restore();
        request.delete.restore();
      });

      describe('GET /api/v1/fixtures', () => {
        const responseObject = {
          statusCode: 200,
          headers: {
            'content-type': 'application/json'
          }
        };

        const responseBody = [];

        it('should get all fixtures', (done) => {
          this.get.yields(null, responseObject, responseBody);
          const options = {
            url: '/api/v1/fixtures',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          request.get(options, (err, res, body) => {
            expect(err).to.be.null;
            expect(res.statusCode).to.be.equal(200);
            done();
          });
        });
      });

      describe('POST /api/v1/fixtures', () => {
        const responseObject = {
          statusCode: 201,
          headers: {
            'content-type': 'application/json'
          }
        };

        const responseBody = {
          message: 'fixture added'
        };

        it('should create a new fixture', (done) => {
          const fixtureDetails = {
            "home_team": "5c139966917e6f34f8501603",
            "away_team": "5c13a08668d39235087724a2",
            "competition": "La Liga",
            "kickoff": "2018-12-14 16:30:00.000",
            "venue": "5c139a216e691c0f34954df3"
          };
          this.post.yields(null, responseObject, responseBody);
          request.post({ url: '/api/v1/fixtures', formData: fixtureDetails, headers: {
            'Authorization': `Bearer ${token}`
          }}, (err, res, body) => {
              expect(err).to.be.null;
              expect(res).to.have.status(201);
              done();
          });
        });
      });

      describe('GET /api/v1/fixtures/fixture_id', () => {
        const responseObject = {
          statusCode: 200,
          headers: {
            'content-type': 'application/json'
          }
        };

        const responseBody = {
          "home_team": "5c1520b39610b809c466755e",
          "away_team": "5c1520b39610b809c466755e",
          "competition": "La Liga",
          "kickoff": "2018-12-14T15:30:00.000Z",
          "venue": null
        };

        it('should get a fixture', (done) => {
          this.get.yields(null, responseObject, responseBody);
          request.get({ url: '/api/v1/fixtures/5c1520b39610b809c466755e', headers: {
            'Authorization': `Bearer ${token}`
          }}, (err, res, body) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
          });
        });
      });

      describe('PUT /api/v1/fixtures/fixture_id', () => {
        const responseObject = {
          statusCode: 200,
          headers: {
            'content-type': 'application/json'
          }
        };

        const responseBody = {
          message: 'fixture updated successfully'
        };

        it('should update a fixture', (done) => {
          const fixtureDetails = {
            "home_team": "5c139966917e6f34f8501603",
            "away_team": "5c13a08668d39235087724a2",
            "competition": "La Liga",
            "kickoff": "2018-12-14 16:30:00.000",
            "venue": "5c139a216e691c0f34954df3"
          };
          this.put.yields(null, responseObject, responseBody);
          request.put({ url: '/api/v1/fixtures/5c1520b39610b809c466755e', formData: fixtureDetails,
          headers: {
            'Authorization': `Bearer ${token}`
          }}, (err, res, body) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
          });
        });
      });

      describe('DELETE /api/v1/fixtures/fixture_id', () => {
        const responseObject = {
          statusCode: 200,
          headers: {
            'content-type': 'application/json'
          }
        };

        const responseBody = {
          message: 'fixture deleted successfully'
        };

        it('should update a fixture', (done) => {
          this.delete.yields(null, responseObject, responseBody);
          request.delete({ url: '/api/v1/fixtures/5c1520b39610b809c466755e',
          headers: {
            'Authorization': `Bearer ${token}`
          }}, (err, res, body) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
          });
        });
      });
    });
  });
});