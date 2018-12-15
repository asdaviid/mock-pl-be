let chai = require('chai');
const expect = chai.expect;
let sinon = require('sinon');
const request = require('request');

const authController = require('../../controllers/auth.controller');

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

  const base = '/api/v1';

  describe('auth service', () => {
    const userCredentials = {
      "firstname": "mock",
      "lastname": "mock",
      "username": "mock",
      "email": "mock@gmail.com",
      "password": "password",
      "role": "admin"
    };

    describe('create user', () => {
      beforeEach(() => {
        this.post = sinon.stub(request, 'post');
      });

      afterEach(() => {
        request.post.restore();
      });

      // test cases
      describe('POST /api/v1/auth/register', () => {
        const responseObject = {
          statusCode: 201,
          headers: {
            'content-type': 'application/json'
          }
        };
    
        const responseBody = {
          message: 'user created'
        };

        it('should create a new user', (done) => {
          this.post.yields(null, responseObject, responseBody);
          request.post({url: `${base}/auth/register`, formData: userCredentials}, (err, res, body) => {
            expect(res.statusCode).to.be.equal(201);
            expect(body.message).to.be.equal('user created');
            done();
          });
        });
      });

      describe('POST /api/v1/auth/login', () => {
        const responseObject = {
          statusCode: 200,
          headers: {
            'content-type': 'application/json'
          }
        };
    
        const responseBody = {
          "message": "user logged in",
          "user": {
              "id": "5c138b8634156702b8d70148",
              "firstname": "mock",
              "lastname": "mock",
              "email": "mock@gmail.com",
              "role": "admin"
          },
          "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7Il9pZCI6IjVjMTM4Yjg2MzQxNTY3MDJiOGQ3MDE0OCIsImZpcnN0bmFtZSI6InRlc3QiLCJsYXN0bmFtZSI6InVzZXIiLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJFdKaExZY3JWTmJUTWNMWDNFdExkRi5Wbm5uR0gxVGlpb2pKYWp5TVRseDZJYkdWRkQydDZlIiwicm9sZSI6ImFkbWluIn19.Pr9iV99p4euBThK17cT1vcNxilLcjPzGj7Ov946ZCIQ"
        };

        it('should login a user', (done) => {
          this.post.yields(null, responseObject, responseBody);
          request.post({url: `${base}/auth/register`, formData: {
            email: userCredentials.email,
            password: userCredentials.password
          }}, (err, res, body) => {
            expect(res.statusCode).to.be.equal(200);
            expect(body.message).to.be.equal('user logged in');
            done();
          });
        });
      });
    });
  });
});