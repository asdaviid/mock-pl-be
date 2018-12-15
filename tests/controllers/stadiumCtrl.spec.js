let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
const sinon = require('sinon');
const request = require('request');
const stadiumController = require('../../controllers/stadium.controller');
let server = require('../../app');
const cfg = require('../../config/app.config');
const jwt = require('jwt-simple');

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

      describe('GET /api/v1/stadia', () => {
        const responseObject = {
          statusCode: 200,
          headers: {
            'content-type': 'application/json'
          }
        };

        const responseBody = [];

        it('should get all stadia', (done) => {
          this.get.yields(null, responseObject, responseBody);
          const options = {
            url: '/api/v1/stadia',
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

      describe('POST /api/v1/stadia', () => {
        const responseObject = {
          statusCode: 201,
          headers: {
            'content-type': 'application/json'
          }
        };

        const responseBody = {
          message: 'stadium added'
        };

        it('should create a new stadium', (done) => {
          const stadiumDetails = {
            "name": "Estadio de la Cerámica",
            "city": "Villarreal",
            "capacity": "24500"
          };
          this.post.yields(null, responseObject, responseBody);
          request.post({ url: '/api/v1/stadia', formData: stadiumDetails, headers: {
            'Authorization': `Bearer ${token}`
          }}, (err, res, body) => {
              expect(err).to.be.null;
              expect(res).to.have.status(201);
              done();
          });
        });
      });

      describe('GET /api/v1/stadia/stadium_id', () => {
        const responseObject = {
          statusCode: 200,
          headers: {
            'content-type': 'application/json'
          }
        };

        const responseBody = {
          "_id": "5c1568ded65e703794fc83c7",
          "name": "Estadio de la Cerámica",
          "city": "Villarreal",
          "capacity": "24500"
      };

        it('should get a stadium', (done) => {
          this.get.yields(null, responseObject, responseBody);
          request.get({ url: '/api/v1/stadia/5c1568ded65e703794fc83c7', headers: {
            'Authorization': `Bearer ${token}`
          }}, (err, res, body) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
          });
        });
      });

      describe('PUT /api/v1/stadia/stadium_id', () => {
        const responseObject = {
          statusCode: 200,
          headers: {
            'content-type': 'application/json'
          }
        };

        const responseBody = {
          message: 'stadium updated successfully'
        };

        it('should update a stadium', (done) => {
          const stadiumDetails = {
            "name": "Estadio de la Cerámica",
            "city": "Villarreal",
            "capacity": "24500"
          };
          this.put.yields(null, responseObject, responseBody);
          request.put({ url: '/api/v1/fixtures/5c1520b39610b809c466755e', formData: stadiumDetails,
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
          message: 'stadium deleted successfully'
        };

        it('should update a stadium', (done) => {
          this.delete.yields(null, responseObject, responseBody);
          request.delete({ url: '/api/v1/stadia/5c1520b39610b809c466755e',
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