# Lottery contract

This contract uses the following usecase.

A manager deploys the contract > players participate with a minimum entry fee > winner is selected using a random function based on difficulty level, time & number of players `return uint (keccak256(block.difficulty, now, players));` > send the lottery funds to the winner address > reset the players array.

**Workflow:**

![Lottery Contract Workflow](https://github.com/biplabro/Test-ETH-Contract/blob/main/lottery/images/lottery.png)
