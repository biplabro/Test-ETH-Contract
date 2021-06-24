// required libs
// npm install web3@1.3.5
// npm install --save mocha ganace-cli

const assert = require('assert')  // assurtion about tests; comparison. required module
const ganache = require('ganache-cli')  //to create local ETH test network
const Web3 = require('web3')  // constructor function, uppercase
const web3 = new Web3(ganache.provider());  // create Web3 instance

beforeEach(() => {
  // get a list of all accounts
  web3.eth.getAccounts()
    .then((fetchedAccounts) => {
      console.log(fetchedAccounts)
    });

  // use one of those accounts to deploy contract
})

describe ('Inbox', () => {
  it('deploys a contract', () => {
    
  });
});


/*                          // simple test script
class Car { //create class
  park() {  //create methods that return strings
    return 'stopped';
  }

  drive() { // this function returns 'vroom'
    return 'vroom';
  }
}


let car;  // dechare a variable that will be used in each test instance
beforeEach(() => {  // executed before every 'it' statement
  car = new Car();  // create instance of Car object
});

describe('Car Condition',() => {  // describe the tests

  it('can park', () => {  // test the park() method
    assert.equal(car.park(), 'stopped') // compare obtained & given value
  });

  it('can drive', () => { // test drive() method
    assert.equal(car.drive(), 'vroom')  // compare values
  });
});
*/
