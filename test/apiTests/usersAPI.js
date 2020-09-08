const server = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const requester = chai.request(server).keepOpen();

describe('Users API', function () {
    describe('GET /api/users', function () {
        it('should get all users', function (done) {
            requester.get('/api/users')
                .then(response => {
                    response.should.have.status(200);
                    response.body.should.be.a('array').and.have.lengthOf.at.least(1);
                    response.body.forEach(function (element) {
                        element.should.be.an('object').and.have.all.keys('_id', 'username', 'password', 'email', 'name');
                        element._id.should.be.a('string');
                        element.username.should.be.a('string');
                        element.password.should.be.a('string');
                        element.email.should.be.a('string');
                        element.name.should.be.an('object').and.have.all.keys('first', 'last');
                        element.name.first.should.be.a('string');
                        element.name.last.should.be.a('string');
                    });
                    done();
                })
                .catch(error => done(error));
        });
    });

    after(function (done) {
        requester.close();
        done();
    });
});