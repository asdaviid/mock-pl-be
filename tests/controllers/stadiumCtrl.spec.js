let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;

const stadiumController = require('../../controllers/stadium.controller');
const Stadium = require('../../models/stadium.model');
const User = require('../../models/user.model');
let server = require('../../app');
const cfg = require('../../config/app.config');

chai.use(chaiHttp);

describe('controllers.stadium', () => {
  it('exists', () => {
    expect(stadiumController).to.exist;
  });

  it('has listStadia function', () => {
    expect(stadiumController.listStadia).to.exist;
    expect(typeof stadiumController.listStadia).to.be.equal('function');
  });

  it('has createStadium function', () => {
    expect(stadiumController.createStadium).to.exist;
    expect(typeof stadiumController.createStadium).to.be.equal('function');
  });

  it('has updateStadium function', () => {
    expect(stadiumController.updateStadium).to.exist;
    expect(typeof stadiumController.updateStadium).to.be.equal('function');
  });

  it('has getStadium function', () => {
    expect(stadiumController.getStadium).to.exist;
    expect(typeof stadiumController.getStadium).to.be.equal('function');
  });

  it('has deleteStadium function', () => {
    expect(stadiumController.deleteStadium).to.exist;
    expect(typeof stadiumController.deleteStadium).to.be.equal('function');
  });

  describe('controllers.stadium routes', () => {
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

    describe('access stadium routes without Authorization', () => {
      describe('GET /api/v1/stadia', () => {
        it('should return unauthorized', (done) => {
          chai.request(server)
            .get('/api/v1/stadia')
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });

      describe('POST /api/v1/stadia', () => {
        it('should return unauthorized', (done) => {
          chai.request(server)
            .post('/api/v1/stadia')
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });

      describe('GET /api/v1/stadia/stadium_id', () => {
        it('should return unauthorized', (done) => {
          chai.request(server)
            .get('/api/v1/stadia/1')
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });

      describe('PUT /api/v1/stadia', () => {
        it('should return unauthorized', (done) => {
          chai.request(server)
            .put('/api/v1/stadia/1')
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });

      describe('DELETE /api/v1/stadia/1', () => {
        it('should return unauthorized', (done) => {
          chai.request(server)
            .delete('/api/v1/stadia/1')
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });
    });

    describe('access stadium routes with Authorization', () => {
      describe('GET /api/v1/stadia', () => {
        it('should get all stadia', (done) => {
          chai.request(server)
            .get('/api/v1/stadia')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
            });
        });
      });

      describe('POST /api/v1/stadia', () => {
        it('should create a new stadium', (done) => {
          chai.request(server)
            .post('/api/v1/stadia')
            .set('Authorization', `Bearer ${token}`)
            .send({
              "name": "Estadio de la Cerámica",
              "city": "Villarreal",
              "capacity": '24500'
            })
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(201);
              done();
            });
        });
      });

      describe('/api/v1/stadia/stadium_id', () => {
        let stadiumId;

        before(async () => {
          const stadium = new Stadium({
            "name": "Estadio de la Cerámica",
            "city": "Villarreal",
            "capacity": '24500'
          });
          const createdStadium = await stadium.save()
          stadiumId = createdStadium._id;
        });

        it('should get a stadium', (done) => {
          chai.request(server)
            .get(`/api/v1/stadia/${stadiumId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
            });
        });

        it('should update a stadium', (done) => {
          chai.request(server)
            .put(`/api/v1/stadia/${stadiumId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              "name": "Estadio de la Cerámica",
              "city": "Villarreal",
              "capacity": '24500'
            })
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
            });
        });

        it('should delete a stadium', (done) => {
          chai.request(server)
            .delete(`/api/v1/stadia/${stadiumId}`)
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