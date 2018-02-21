pragma solidity ^0.4.4;

contract StoreValidate {

  struct QueryOutputRecord {
        string query;
        string output;
    }

    QueryOutputRecord[] queryOutputs;

    bytes32[] hashedValues;

    mapping (bytes32 => bytes32[]) queryOutputMapping;

    struct QueryOutputStruct {
        bytes32 finalHash;
        bytes32 queryHashed;
        bytes32 outputHashed;
    }

    QueryOutputStruct[] queryOutputStructArray;

    function storeData(string _query, string _output) public returns (bytes32) {
        queryOutputs.push(QueryOutputRecord(_query, _output));
    }

    function store(string _query, string _output) returns (bool success){
        var queryHash = keccak256(_query);
        var outputHash = keccak256(_output);

        bytes32 hashThem = keccak256(queryHash, outputHash);

        queryOutputStructArray.push(QueryOutputStruct(hashThem, queryHash, outputHash));
        return true;
    }

    function validate(string _query, string _output) returns (bool success){
        var queryHash = keccak256(_query);
        var outputHash = keccak256(_output);

        bytes32 hashThem = keccak256(queryHash, outputHash);

        for (uint i = 0; i < queryOutputStructArray.length; i++){
            if (queryOutputStructArray[i].finalHash == hashThem
            && queryOutputStructArray[i].queryHashed == queryHash
            && queryOutputStructArray[i].outputHashed == outputHash) {
                return true;
            } else {
                continue;
            }
        }
    }

    function buildHashTree(string[] _input) returns (bool success){
      return true;
    }

}
