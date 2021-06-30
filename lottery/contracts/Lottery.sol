pragma solidity ^0.4.17;        //specifies solidity compiler version, version identifier

contract Lottery {                //contract definition, similar to "class" concept
    address public manager; // manager = contract creator
    address[] public players;   // create a dynamic array of participating addresses

    function Lottery () public {
        manager = msg.sender;   // sender address stored in manager variable
        }

    function enter() public payable {
        require(msg.value > 10);   //eth (wei) in wei unit

        players.push(msg.sender);   // insert participant address into the players [] array
    }

    function random() private view returns (uint) { // returns an integer
       return uint (keccak256(block.difficulty, now, players));
    }
    

    function pickWinner() public restricted {
        uint index = random() % players.length; // returns an integer within players number range
        players[index].transfer(this.balance);  // players[index] = lucky winner
        players = new address[](0);
    }


    modifier restricted() { // restricted calls must satisfy the residing logic first
        require (msg.sender == manager);    // only manager can execute this function
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

}
