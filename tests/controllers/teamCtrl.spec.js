let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
let sinon = require('sinon');
const request = require('request');
const teamController = require('../../controllers/team.controller');
let server = require('../../app');
const cfg = require('../../config/app.config');
const jwt = require('jwt-simple');

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

      describe('GET /api/v1/teams', () => {
        const responseObject = {
          statusCode: 200,
          headers: {
            'content-type': 'application/json'
          }
        };

        const responseBody = [];

        it('should get all teams', (done) => {
          this.get.yields(null, responseObject, responseBody);
          const options = {
            url: '/api/v1/teams',
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

      describe('POST /api/v1/teams', () => {
        const responseObject = {
          statusCode: 201,
          headers: {
            'content-type': 'application/json'
          }
        };

        const responseBody = {
          message: 'stadium added'
        };

        it('should create a new team', (done) => {
          const teamDetails = {
            "name": "Athletic Club Bilbao",
            "website": "http://www.athletic-club.net/",
            "founded": "1898",
            "country": "Spain",
            "home_stadium": "5c1403fcc24fd5143cfe2f1d"
          };

          this.post.yields(null, responseObject, responseBody);
          request.post({ url: '/api/v1/teams', formData: teamDetails, headers: {
            'Authorization': `Bearer ${token}`
          }}, (err, res, body) => {
              expect(err).to.be.null;
              expect(res).to.have.status(201);
              done();
          });
        });
      });

      describe('GET /api/v1/teams/team_id', () => {
        const responseObject = {
          statusCode: 200,
          headers: {
            'content-type': 'application/json'
          }
        };

        const responseBody = {
          "_id": "5c1568ded65e703794fc83c7",
          "name": "Athletic Club Bilbao",
          "website": "http://www.athletic-club.net/",
          "founded": "1898",
          "country": "Spain",
          "home_stadium": "5c1403fcc24fd5143cfe2f1d"
      };

        it('should get a team', (done) => {
          this.get.yields(null, responseObject, responseBody);
          request.get({ url: '/api/v1/teams/5c1568ded65e703794fc83c7', headers: {
            'Authorization': `Bearer ${token}`
          }}, (err, res, body) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
          });
        });
      });

      describe('PUT /api/v1/teams/team_id', () => {
        const responseObject = {
          statusCode: 200,
          headers: {
            'content-type': 'application/json'
          }
        };

        const responseBody = {
          message: 'team updated successfully'
        };

        it('should update a team', (done) => {
          const teamDetails = {
            "name": "Athletic Club Bilbao",
            "website": "http://www.athletic-club.net/",
            "founded": "1898",
            "country": "Spain",
            "home_stadium": "5c1403fcc24fd5143cfe2f1d"
          };
          this.put.yields(null, responseObject, responseBody);
          request.put({ url: '/api/v1/teams/5c1520b39610b809c466755e', formData: teamDetails,
          headers: {
            'Authorization': `Bearer ${token}`
          }}, (err, res, body) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
          });
        });
      });

      describe('DELETE /api/v1/stadia/stadium_id', () => {
        const responseObject = {
          statusCode: 200,
          headers: {
            'content-type': 'application/json'
          }
        };

        const responseBody = {
          message: 'team deleted successfully'
        };

        it('should delete a team', (done) => {
          this.delete.yields(null, responseObject, responseBody);
          request.delete({ url: '/api/v1/teams/5c1520b39610b809c466755e',
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