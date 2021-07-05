const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const {interface, bytecode} = require('../compile');  // {} for object with properties

let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({from: accounts[0], gas: 1000000});
});

describe('Lottery Contract', () => {

  it('deploys contract', () => {
    assert.ok(lottery.options.address); // checks if returns deployed address validation check
  });

  it('allows one account to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: '11',  // convert eth to wei web3.utils.towei('0.02', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0] // manager calling getAccounts() function
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });

  it('allows multiple accounts to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: 11  // convert eth to wei web3.utils.towei('0.02', 'ether')
    });

    await lottery.methods.enter().send({
      from: accounts[1],
      value: 11,  // convert eth to wei web3.utils.towei('0.02', 'ether')
    });

    await lottery.methods.enter().send({
      from: accounts[2],
      value: 11,  // convert eth to wei web3.utils.towei('0.02', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
  });

  it ('requires a minimum amount of ether', async () => {
    try { // try to execute transaction with invalid amount of ether
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 7
      });
      assert(false);    // failing assertion
    } catch (err) {
      assert(err);  //  check whether error is the instance of mentioned class
    }
  });

  it ('only manager can call pickWinner', async () => {
    let executed; // create a flag to check the try & catch blocks
    try { // try to execute transaction with invalid amount of ether
      await lottery.methods.pickWinner().send({ // pickWinner() called from account[n]
        from: accounts[2],  // other than manager account
      });
      assert(false);    // failing assertion
      executed = 'success'
    } catch (err) {
      executed = 'fail'
    }
    assert.equal('fail', executed);
  });

  it('sends money to winner & resets the players array', async () => {
    await lottery.methods.enter().send({  // participate in contest & spend 2 ether
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);  // check the remaining balance
    await lottery.methods.pickWinner().send({from: accounts[0]}); // execute pickWinner() from manager account
    const finalBalance = await web3.eth.getBalance(accounts[0]);  // check the final balance
    const difference = finalBalance - initialBalance;
    console.log(difference);  // redundant
    assert (difference > web3.utils.toWei('1.8', 'ether')); // some eth spent as gas, 1.8 is approximate amount that the winner gets
  });

  it('resets the balance to zero after pickWinner is called', async () =>{
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });

    await lottery.methods.pickWinner().send({ from: accounts[0]});
    const lotteryBal = await web3.eth.getBalance(lottery.options.address);
    assert.equal(0, lotteryBal);
  });

  it('picking winner resets the players array', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],    // participate in lottery
      value: web3.utils.toWei('0.02', 'ether')
    });
    await lottery.methods.enter().send({
      from: accounts[1],    // participate in lottery
      value: web3.utils.toWei('0.02', 'ether')
    });
    await lottery.methods.enter().send({
      from: accounts[2],    // participate in lottery
      value: web3.utils.toWei('0.02', 'ether')
    });

    await lottery.methods.pickWinner().send({
      from: accounts[0]   // execute pickWinner
    });

    const players = await lottery.methods.getPlayers().call();  // returns players array (addresses)

    assert.equal(0, players.length);
  });

});
