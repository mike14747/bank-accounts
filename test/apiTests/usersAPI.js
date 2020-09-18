const app = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const requester = chai.request(app).keepOpen();

describe('Users API (/api/users)', function () {
    it('should GET all users', function (done) {
        requester.get('/api/users')
            .then(response => {
                response.should.have.status(200);
                response.body.should.be.a('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.be.an('object').and.have.all.keys('_id', 'username', 'password', 'email', 'name', 'payees');
                    element._id.should.be.a('string').and.have.lengthOf(24);
                    element.username.should.be.a('string').and.have.lengthOf.at.least(6);
                    element.password.should.be.a('string').and.have.lengthOf.at.least(8);
                    element.email.should.be.a('string').and.have.lengthOf.at.least(4);
                    element.name.should.be.an('object').and.have.all.keys('first', 'last');
                    element.name.first.should.be.a('string');
                    element.name.last.should.be.a('string');
                    element.payees.should.be.an('array');
                });
                done();
            })
            .catch(error => done(error));
    });

    after(function (done) {
        requester.close();
        done();
    });
});
