// required libs
// npm install web3@1.3.5
// npm install --save mocha ganace-cli

const assert = require('assert')  // assurtion about tests; comparison. required module
const ganache = require('ganache-cli')  //to create local ETH test network
const Web3 = require('web3')  // constructor function, uppercase
const web3 = new Web3(ganache.provider());  // create Web3 instance


class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom';
  }
}

describe('Car Condition',() => {

  it('can park', () => {
    const car = new Car();
    assert.equal(car.park(), 'stopped')
  });

  it('can drive', () => {
    const car = new Car();
    assert.equal(car.drive(), 'vroom')
  });
});
