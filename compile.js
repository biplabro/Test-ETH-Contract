/*require ('./contracts/Inbox.sol') //bad to execute the file directly, different than javaScript*/
const path = require('path'); // correct approach is to read the file contents first & then feed it to compiler
const fs = require('fs'); //path & fs are standard node modules
const solc =require('solc') //link 'solc' compiler to solc variable

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol') //mention the path variable, __dirname = working directory, for cross platform compatibility
const source = fs.readFileSync(inboxPath, 'utf8') //read the contents of the contract/file, mention encoding

// There are 2 snippets, either 1 can be used
/*
// snippet 1
console.log(solc.compile(source,1)) //compile 'source' using 'solc' compiler, number of contracts = 1
// wrapping compiler call inside console.log to see whats happening inside the code
// executing the code in terminal node compile.js ( at working directory)
// it returns the contracts object, inside which another object called ':Inbox' is created, it contains two main properties, 
// bytecode = to ne stored & executed on the blockchain,
// interface = the ABI of the contract
*/

// snippet 2
module.exports = solc.compile(source,1).contracts[':Inbox'] //compile & export the contract properties making it an available resource for the rest of the codebase
