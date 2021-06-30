// deploy code will go here
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(  //setting up wallet provider
  "diary baby ability side joy mule orbit quiz plug museum rapid timber", // secret API, demo account (CHANGE)
  "https://rinkeby.infura.io/v3/68b7b446f0ab45f08a464f3ef69376ad" // infura API, testnet (CHANGE), create your own @ www.infura.io
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('attempting to deploy from accounts', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({gas: '1000000', from: accounts[0]});
  console.log('Contract deployed to', result.options.address);
};
deploy();

// deployed contract:
// https://rinkeby.etherscan.io/find-similar-contracts?a=0xfFa7341CA28B2D659086B52b68823d46e25507d9
