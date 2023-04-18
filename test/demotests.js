
//Require the dev-dependencies
let chai = require('chai');

// use should-style assertions
let should = chai.should();

describe('Simple chai test', () => {
    it('exercise should-style assertions', () => {
       let b = [ 1, 2 , 3];
       b.length.should.be.eql(3);
       let weather = 'Today is sunny'
       weather.should.contain.oneOf(['sunny', 'cloudy'])
    });
});
