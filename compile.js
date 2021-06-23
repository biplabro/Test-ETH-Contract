/*require ('./contracts/Inbox.sol') //bad to execute the file directly, different than javaScript*/
const path = require('path'); // correct approach is to read the file contents first & then feed it to compiler
const fs = require('fs'); //path & fs are standard node modules
const solc =require('solc') //link 'solc' compiler to solc variable

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol') //mention the path variable, __dirname = working directory, for cross platform compatibility
const source = fs.readFileSync(inboxPath, 'utf8') //read the contents of the contract/file, mention encoding

console.log(solc.compile(source,1)) //compile 'source' using 'solc' compiler, number of contracts = 1
