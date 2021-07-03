# Test-ETH-Contract:
Diving into smart contracts to see how things work &amp; hopefully to make something useful out of it. Feel free to fork from or commit to this repo to encourage collaborative learning.

### Details:
Each seperate contract & the required node modules are stored in the respective folders. 

**package.json:** includes metadata & information regarding the project.
**compile.js:** source paths & compiler information.
**deploy.js:** web3 waller provider & API information used during deployment of the contract.
**/node_modules:** contains the node modules required to develop the respective project.
**/contracts:** includes the actual contract source files.
**/test:** includes the test scripts to check the functionality of the contract in local blockchain env (computer)

**Workflow:** the compile.js script takes the contract source as an input & it generates the contract object that includes
* **Bytecode:** Deployed permanently into the blockchain
* **ABI:** Can be accessed to interact with the contract, the communication layer between blockchain & javascript world
Running 'node deploy.js' inside the project directory deploys the contract. 

### Software & packages:

'npm install --save solc@0.4.17'

'npm install web3@1.3.5'

'npm install --save mocha ganace-cli'
