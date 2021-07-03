// required libs
// npm install web3@1.3.5
// npm install --save mocha ganace-cli

const assert = require('assert')  // assurtion about tests; comparison. required module
const ganache = require('ganache-cli')  //to create local ETH test network
const Web3 = require('web3')  // constructor function, uppercase
const web3 = new Web3(ganache.provider());  // create Web3 instance
const {interface, bytecode} = require('../compile') // fetched from the compile.js file

let accounts;
let inbox;
const INITIAL_STRING = 'Genesis!'

beforeEach(async () => {
  // get a list of all accounts, fetchedAccounts
  accounts = await web3.eth.getAccounts();

  // use one of those accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))  // interface = js ABI, generic interface of contract
    .deploy({data: bytecode, arguments: [INITIAL_STRING]}) // bytecode = Raw compiled contract, deploy a new contract
    .send({from: accounts[0], gas: '1000000'}); // send transaction to create contract
})

describe ('Inbox', () => {
  it('deploys a contract', () => {
    //console.log(inbox);
    assert.ok(inbox.options.address); // test pass if address is created
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('message changed').send({from: accounts[0]}) ;
    const message = await inbox.methods.message().call();
    assert.equal(message, 'message changed');
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
