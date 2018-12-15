let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
let sinon = require('sinon');
const jwt = require('jwt-simple');

const teamController = require('../../controllers/team.controller');
const Team = require('../../models/team.model');
const User = require('../../models/user.model');
let server = require('../../app');
const cfg = require('../../config/app.config');

chai.use(chaiHttp);

describe('controllers.team', () => {
  it('exists', () => {
    expect(teamController).to.exist;
  });

  it('has listTeams function', () => {
    expect(teamController.listTeams).to.exist;
    expect(typeof teamController.listTeams).to.be.equal('function');
  });

  it('has createTeam function', () => {
    expect(teamController.createTeam).to.exist;
    expect(typeof teamController.createTeam).to.be.equal('function');
  });

  it('has updateTeam function', () => {
    expect(teamController.updateTeam).to.exist;
    expect(typeof teamController.updateTeam).to.be.equal('function');
  });

  it('has getTeam function', () => {
    expect(teamController.getTeam).to.exist;
    expect(typeof teamController.getTeam).to.be.equal('function');
  });

  it('has deleteTeam function', () => {
    expect(teamController.deleteTeam).to.exist;
    expect(typeof teamController.deleteTeam).to.be.equal('function');
  });

  describe('controllers.team routes', () => {
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

    describe('access team routes without Authorization', () => {
      describe('GET /api/v1/teams', () => {
        it('should return unauthorized', (done) => {
          chai.request(server)
            .get('/api/v1/teams')
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });

      describe('POST /api/v1/teams', () => {
        it('should return unauthorized', (done) => {
          chai.request(server)
            .post('/api/v1/teams')
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });

      describe('GET /api/v1/teams/team_id', () => {
        it('should return unauthorized', (done) => {
          chai.request(server)
            .get('/api/v1/teams/1')
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });

      describe('PUT /api/v1/teams', () => {
        it('should return unauthorized', (done) => {
          chai.request(server)
            .put('/api/v1/teams/1')
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });

      describe('DELETE /api/v1/teams/1', () => {
        it('should return unauthorized', (done) => {
          chai.request(server)
            .delete('/api/v1/teams/1')
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
            });
        });
      });
    });

    describe('access team routes with Authorization', () => {
      describe('GET /api/v1/teams', () => {
        it('should get all teams', (done) => {
          chai.request(server)
            .get('/api/v1/teams')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
            });
        });
      });

      describe('POST /api/v1/teams', () => {
        it('should create a new team', (done) => {
          chai.request(server)
            .post('/api/v1/teams')
            .set('Authorization', `Bearer ${token}`)
            .send({
              "name": "Athletic Club Bilbao",
              "website": "http://www.athletic-club.net/",
              "founded": "1898",
              "country": "Spain",
              "home_stadium": "5c1403fcc24fd5143cfe2f1d"
            })
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(201);
              done();
            });
        });
      });

      describe('/api/v1/teams/team_id', () => {
        let teamId;

        before(async () => {
          const team = new Team({
            "name": "Athletic Club Bilbao",
            "website": "http://www.athletic-club.net/",
            "founded": "1898",
            "country": "Spain",
            "home_stadium": "5c1403fcc24fd5143cfe2f1d"
          });
          const createdTeam = await team.save()
          teamId = createdTeam._id;
        });

        it('should get a team', (done) => {
          chai.request(server)
            .get(`/api/v1/teams/${teamId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
            });
        });

        it('should update a team', (done) => {
          chai.request(server)
            .put(`/api/v1/teams/${teamId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              "name": "Athletic Club Bilbao",
              "website": "http://www.athletic-club.net/",
              "founded": "1898",
              "country": "Spain",
              "home_stadium": "5c1403fcc24fd5143cfe2f1d"
            })
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
            });
        });

        it('should delete a team', (done) => {
          chai.request(server)
            .delete(`/api/v1/teams/${teamId}`)
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