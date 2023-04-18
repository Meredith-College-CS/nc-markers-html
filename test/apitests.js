//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');

let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

/*
  * Test the /api/counties route
  */
describe('At the /api/counties endpoint', () => {
    it('a GET request should return a list of all NC counties', (done) => {
        chai.request(server)
            .get('/api/counties')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array').that.includes("Pasquotank");
                res.body.length.should.be.eql(100);
                done();
            });
    });
});




