
//Require the dev-dependencies
let chai = require('chai');

// use should-style assertions
let should = chai.should();

describe('Chai should', () => {
    it('correctly check array length and contents', () => {
       let b = [ 1, 2 , 3];
       b.length.should.be.eql(3);
       let weather = 'Today is sunny'
       weather.should.contain.oneOf(['sunny', 'cloudy'])
    });
});
