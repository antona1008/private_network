var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var accounts;
var account;

var contractAddress = '0x10462d831a8ff292a3f56107b6f5f29f72f39259';

var abi = JSON.parse('[ { "constant": false, "inputs": [ { "name": "_query", "type": "string" }, { "name": "_output", "type": "string" } ], "name": "validate", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_query", "type": "string" }, { "name": "_output", "type": "string" } ], "name": "storeData", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_input", "type": "string" } ], "name": "buildHashTree", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_query", "type": "string" }, { "name": "_output", "type": "string" } ], "name": "store", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]')

baseContract = web3.eth.contract(abi);
contract = baseContract.at(contractAddress);

web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
        alert("Error searching accounts.");
        return;
    }

    if (accs.length == 0) {
        alert("No account! Check if Ethereum client is set correctly.");
        return;
    }

    accounts = accs;
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
});

function newRegister() {
    queryInput = $("#queryInput").val();
    resultInput = $("#resultInput").val();
    //alert (info);
    contract.store (queryInput, resultInput, {from:web3.eth.accounts[0], gas: 1000000});
    $("#queryInput").val('');
    $("#resultInput").val('');
}

$(document).ready(function(){
  $("#storeBttn").click(newRegister);
});
