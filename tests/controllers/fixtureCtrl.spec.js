let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;

const fixtureController = require('../../controllers/fixture.controller');
const Fixture = require('../../models/fixture.model');
const User = require('../../models/user.model');
let server = require('../../app');
const cfg = require('../../config/app.config');

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
    let token;

    const userCredentials = {
      "firstname": "mock",
      "lastname": "mock",
      "username": "mock",
      "email": "mock@gmail.com",
      "password": "password",
      "role": "admin"
    }

    before(async () => {
      const registerResp = await chai.request(server)
        .post('/api/v1/auth/register')
        .send(userCredentials);
      
      if (registerResp.statusCode === 201) {
        const signinResp = await chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'mock@gmail.com',
          password: 'password'
        });

        token = signinResp.body.token;
      }
    });

    after((done) => {
      User.deleteOne({ email: userCredentials.email }, () => { done(); });
    });

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
      describe('GET /api/v1/fixtures', () => {
        it('should get all fixtures', (done) => {
          chai.request(server)
            .get('/api/v1/fixtures')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
            });
        });
      });

      describe('POST /api/v1/fixtures', () => {
        it('should create a new fixture', (done) => {
          chai.request(server)
            .post('/api/v1/fixtures')
            .set('Authorization', `Bearer ${token}`)
            .send({
              "home_team": "5c139966917e6f34f8501603",
                "away_team": "5c13a08668d39235087724a2",
                "competition": "La Liga",
                "kickoff": "2018-12-14 16:30:00.000",
                "venue": "5c139a216e691c0f34954df3"
            })
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(201);
              done();
            });
        });
      });

      describe('/api/v1/fixtures/fixture_id', () => {
        let fixtureId;

        before(async () => {
          const fixture = new Fixture({
            "home_team": "5c139966917e6f34f8501603",
              "away_team": "5c13a08668d39235087724a2",
              "competition": "La Liga",
              "kickoff": "2018-12-14 16:30:00.000",
              "venue": "5c139a216e691c0f34954df3"
          });
          const createdFixture = await fixture.save()
          fixtureId = createdFixture._id;
        });

        it('should get a fixture', (done) => {
          chai.request(server)
            .get(`/api/v1/fixtures/${fixtureId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
            });
        });

        it('should update a fixture', (done) => {
          chai.request(server)
            .put(`/api/v1/fixtures/${fixtureId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              "home_team": "5c139966917e6f34f8501603",
                "away_team": "5c13a08668d39235087724a2",
                "competition": "La Liga",
                "kickoff": "2018-12-14 16:30:00.000",
                "venue": "5c139a216e691c0f34954df3"
            })
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
            });
        });

        it('should delete a fixture', (done) => {
          chai.request(server)
            .delete(`/api/v1/fixtures/${fixtureId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
            });
        });
      });
    });
  });
});