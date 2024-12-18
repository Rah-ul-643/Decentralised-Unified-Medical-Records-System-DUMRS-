// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HashGenerator {
    // Mapping from patient ID (as a string) to hash of medical record data
    mapping(string => bytes32) private recordHashes;

    // Event to notify when a hash is generated and stored
    event RecordHashStored(string indexed patientId, bytes32 recordHash);

    // Function to generate and store hash of medical data associated with a patient ID
    function storeRecordHash(string memory patientId, string memory medicalData) public {
        // Generate a hash of the medical data
        bytes32 recordHash = keccak256(abi.encodePacked(medicalData));
        
        // Store the hash in the mapping
        recordHashes[patientId] = recordHash;

        // Emit event to notify of stored hash
        emit RecordHashStored(patientId, recordHash);
    }

    // Function to retrieve the hash of medical record data by patient ID
    function getRecordHash(string memory patientId) public view returns (bytes32) {
        return recordHashes[patientId];
    }
}
