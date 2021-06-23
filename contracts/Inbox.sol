pragma solidity ^0.4.17;        //specifies solidity compiler version, version identifier

contract Inbox {                //contract definition, similar to "class" concept
    string public message;      //message = storage variable, contains string, Public = access rights

    function Inbox(string initialMessage) public {      // Inbox = constructor
        message = initialMessage;
    }

    function setMessage(string newMessage) public {     //set the string value
        message = newMessage;
    }

    /*function getMessage() public view returns (string) {    //getMessage with no arguments, type = public view, return type string
        return message; //redundant function, returns the string value
    }*/
}
