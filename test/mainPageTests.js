//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');

let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

const jsdom = require("jsdom");
const { JSDOM } = jsdom;


/*
  * Test the main page
  */
describe('The main page', () => {
    it('is welcoming', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                const dom = new JSDOM(res.text);
                const greeting = dom.window.document.querySelector("#welcome").textContent;
                greeting.should.be.a('string').that.matches(/^Welcome to/);
                done();
            });
    });
});




