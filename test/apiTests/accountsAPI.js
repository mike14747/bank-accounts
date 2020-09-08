const server = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const requester = chai.request(server).keepOpen();

describe('Account API', function () {
    describe('GET /api/accounts', function () {
        it('should get all accounts', function (done) {
            requester.get('/api/accounts')
                .then(response => {
                    response.should.have.status(200);
                    response.body.should.be.a('array').and.have.lengthOf.at.least(1);
                    response.body.forEach(function (element) {
                        element.should.be.an('object').and.have.all.keys('_id', 'user_id', 'account_name', 'account_number', 'institution', 'account_type', 'opening_balance', 'payees', 'transactions');
                        element._id.should.be.a('string').and.have.lengthOf(24);
                        element.user_id.should.be.a('string').and.have.lengthOf(24);
                        element.account_name.should.be.a('string').and.have.lengthOf.at.least(1);
                        element.account_number.should.be.a('string').and.have.lengthOf.at.least(1);
                        element.institution.should.be.a('string').and.have.lengthOf.at.least(1);
                        element.account_type.should.be.a('string').and.have.lengthOf.at.least(1);
                        element.opening_balance.should.be.a('number');
                        element.payees.should.be.an('array');
                        element.transactions.should.be.an('array');
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