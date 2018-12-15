let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
let sinon = require('sinon');
const jwt = require('jwt-simple');

const authController = require('../../controllers/auth.controller');
const User = require('../../models/user.model');
let server = require('../../app');
const cfg = require('../../config/app.config');

chai.use(chaiHttp);

describe('controllers.auth', () => {
  it('exists', () => {
    expect(authController).to.exist;
  });

  it('has login function', () => {
    expect(typeof authController.login).to.be.equal('function');
  });

  it('has register function', () => {
    expect(typeof authController.register).to.be.equal('function');
  });

  describe('controllers.auth routes', () => {
    const userCredentials = {
      "firstname": "mock",
      "lastname": "mock",
      "username": "mock",
      "email": "mock@gmail.com",
      "password": "password",
      "role": "admin"
    };

    describe('register user', () => {
      it('should create a user and return 201', (done) => {
        chai.request(server)
          .post('/api/v1/auth/register')
          .send(userCredentials)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(201);
            done();
          });
      });
    });

    describe('login user', () => {
      after((done) => {
        User.deleteOne({ email: userCredentials.email }, () => { done(); });
      });

      it('should return 200', (done) => {
        chai.request(server)
          .post('/api/v1/auth/login')
          .send({
            email: 'mock@gmail.com',
            password: 'password'
          })
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });
  });
});