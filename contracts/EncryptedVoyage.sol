// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract EncryptedVoyage is SepoliaConfig {
    using FHE for *;
    
    struct Voyage {
        euint32 voyageId;
        euint32 vesselId;
        euint32 cargoWeight;
        euint32 cargoValue;
        euint32 departurePort;
        euint32 arrivalPort;
        euint32 departureTime;
        euint32 arrivalTime;
        euint32 status; // 0: planned, 1: in-transit, 2: completed, 3: delayed
        bool isActive;
        string vesselName;
        string cargoDescription;
        address owner;
        uint256 createdAt;
    }
    
    struct Cargo {
        euint32 cargoId;
        euint32 weight;
        euint32 value;
        euint32 temperature;
        euint32 humidity;
        euint32 securityLevel;
        bool isHazardous;
        bool isFragile;
        string description;
        address shipper;
        uint256 timestamp;
    }
    
    struct TrackingData {
        euint32 trackingId;
        euint32 latitude;
        euint32 longitude;
        euint32 speed;
        euint32 heading;
        euint32 fuelLevel;
        euint32 temperature;
        euint32 timestamp;
        address reporter;
    }
    
    struct InsuranceClaim {
        euint32 claimId;
        euint32 voyageId;
        euint32 claimAmount;
        euint32 damageAssessment;
        bool isApproved;
        string claimReason;
        address claimant;
        uint256 timestamp;
    }
    
    mapping(uint256 => Voyage) public voyages;
    mapping(uint256 => Cargo) public cargo;
    mapping(uint256 => TrackingData) public trackingData;
    mapping(uint256 => InsuranceClaim) public insuranceClaims;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public vesselReputation;
    
    uint256 public voyageCounter;
    uint256 public cargoCounter;
    uint256 public trackingCounter;
    uint256 public claimCounter;
    
    address public owner;
    address public verifier;
    
    event VoyageCreated(uint256 indexed voyageId, address indexed owner, string vesselName);
    event CargoAdded(uint256 indexed cargoId, uint256 indexed voyageId, address indexed shipper);
    event TrackingUpdated(uint256 indexed trackingId, uint256 indexed voyageId, address indexed reporter);
    event InsuranceClaimed(uint256 indexed claimId, uint256 indexed voyageId, address indexed claimant);
    event VoyageStatusUpdated(uint256 indexed voyageId, uint32 status);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createVoyage(
        string memory _vesselName,
        string memory _cargoDescription,
        uint256 _departurePort,
        uint256 _arrivalPort,
        uint256 _departureTime,
        uint256 _arrivalTime
    ) public returns (uint256) {
        require(bytes(_vesselName).length > 0, "Vessel name cannot be empty");
        require(_departureTime < _arrivalTime, "Invalid time range");
        
        uint256 voyageId = voyageCounter++;
        
        voyages[voyageId] = Voyage({
            voyageId: FHE.asEuint32(0), // Will be set properly later
            vesselId: FHE.asEuint32(0), // Will be set properly later
            cargoWeight: FHE.asEuint32(0),
            cargoValue: FHE.asEuint32(0),
            departurePort: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            arrivalPort: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            departureTime: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            arrivalTime: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            status: FHE.asEuint32(0), // Planned
            isActive: true,
            vesselName: _vesselName,
            cargoDescription: _cargoDescription,
            owner: msg.sender,
            createdAt: block.timestamp
        });
        
        emit VoyageCreated(voyageId, msg.sender, _vesselName);
        return voyageId;
    }
    
    function addCargo(
        uint256 voyageId,
        externalEuint32 weight,
        externalEuint32 value,
        externalEuint32 temperature,
        externalEuint32 humidity,
        externalEuint32 securityLevel,
        bool isHazardous,
        bool isFragile,
        string memory description,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(voyages[voyageId].owner != address(0), "Voyage does not exist");
        require(voyages[voyageId].isActive, "Voyage is not active");
        
        uint256 cargoId = cargoCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalWeight = FHE.fromExternal(weight, inputProof);
        euint32 internalValue = FHE.fromExternal(value, inputProof);
        euint32 internalTemperature = FHE.fromExternal(temperature, inputProof);
        euint32 internalHumidity = FHE.fromExternal(humidity, inputProof);
        euint32 internalSecurityLevel = FHE.fromExternal(securityLevel, inputProof);
        
        cargo[cargoId] = Cargo({
            cargoId: FHE.asEuint32(0), // Will be set properly later
            weight: internalWeight,
            value: internalValue,
            temperature: internalTemperature,
            humidity: internalHumidity,
            securityLevel: internalSecurityLevel,
            isHazardous: isHazardous,
            isFragile: isFragile,
            description: description,
            shipper: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update voyage cargo totals
        voyages[voyageId].cargoWeight = FHE.add(voyages[voyageId].cargoWeight, internalWeight);
        voyages[voyageId].cargoValue = FHE.add(voyages[voyageId].cargoValue, internalValue);
        
        emit CargoAdded(cargoId, voyageId, msg.sender);
        return cargoId;
    }
    
    function updateTracking(
        uint256 voyageId,
        externalEuint32 latitude,
        externalEuint32 longitude,
        externalEuint32 speed,
        externalEuint32 heading,
        externalEuint32 fuelLevel,
        externalEuint32 temperature,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(voyages[voyageId].owner != address(0), "Voyage does not exist");
        require(voyages[voyageId].isActive, "Voyage is not active");
        
        uint256 trackingId = trackingCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalLatitude = FHE.fromExternal(latitude, inputProof);
        euint32 internalLongitude = FHE.fromExternal(longitude, inputProof);
        euint32 internalSpeed = FHE.fromExternal(speed, inputProof);
        euint32 internalHeading = FHE.fromExternal(heading, inputProof);
        euint32 internalFuelLevel = FHE.fromExternal(fuelLevel, inputProof);
        euint32 internalTemperature = FHE.fromExternal(temperature, inputProof);
        
        trackingData[trackingId] = TrackingData({
            trackingId: FHE.asEuint32(0), // Will be set properly later
            latitude: internalLatitude,
            longitude: internalLongitude,
            speed: internalSpeed,
            heading: internalHeading,
            fuelLevel: internalFuelLevel,
            temperature: internalTemperature,
            timestamp: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            reporter: msg.sender
        });
        
        emit TrackingUpdated(trackingId, voyageId, msg.sender);
        return trackingId;
    }
    
    function submitInsuranceClaim(
        uint256 voyageId,
        euint32 claimAmount,
        euint32 damageAssessment,
        string memory claimReason
    ) public returns (uint256) {
        require(voyages[voyageId].owner != address(0), "Voyage does not exist");
        require(voyages[voyageId].owner == msg.sender, "Only voyage owner can claim");
        
        uint256 claimId = claimCounter++;
        
        insuranceClaims[claimId] = InsuranceClaim({
            claimId: FHE.asEuint32(0), // Will be set properly later
            voyageId: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            claimAmount: claimAmount,
            damageAssessment: damageAssessment,
            isApproved: false,
            claimReason: claimReason,
            claimant: msg.sender,
            timestamp: block.timestamp
        });
        
        emit InsuranceClaimed(claimId, voyageId, msg.sender);
        return claimId;
    }
    
    function updateVoyageStatus(uint256 voyageId, euint32 status) public {
        require(voyages[voyageId].owner == msg.sender, "Only voyage owner can update status");
        require(voyages[voyageId].isActive, "Voyage is not active");
        
        voyages[voyageId].status = status;
        emit VoyageStatusUpdated(voyageId, 0); // FHE.decrypt(status) - will be decrypted off-chain
    }
    
    function approveInsuranceClaim(uint256 claimId, bool isApproved) public {
        require(msg.sender == verifier, "Only verifier can approve claims");
        require(insuranceClaims[claimId].claimant != address(0), "Claim does not exist");
        
        insuranceClaims[claimId].isApproved = isApproved;
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = reputation;
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function updateVesselReputation(address vessel, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update vessel reputation");
        require(vessel != address(0), "Invalid vessel address");
        
        vesselReputation[vessel] = reputation;
        emit ReputationUpdated(vessel, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getVoyageInfo(uint256 voyageId) public view returns (
        string memory vesselName,
        string memory cargoDescription,
        uint8 cargoWeight,
        uint8 cargoValue,
        uint8 status,
        bool isActive,
        address owner,
        uint256 createdAt
    ) {
        Voyage storage voyage = voyages[voyageId];
        return (
            voyage.vesselName,
            voyage.cargoDescription,
            0, // FHE.decrypt(voyage.cargoWeight) - will be decrypted off-chain
            0, // FHE.decrypt(voyage.cargoValue) - will be decrypted off-chain
            0, // FHE.decrypt(voyage.status) - will be decrypted off-chain
            voyage.isActive,
            voyage.owner,
            voyage.createdAt
        );
    }
    
    function getCargoInfo(uint256 cargoId) public view returns (
        uint8 weight,
        uint8 value,
        uint8 temperature,
        uint8 humidity,
        uint8 securityLevel,
        bool isHazardous,
        bool isFragile,
        string memory description,
        address shipper,
        uint256 timestamp
    ) {
        Cargo storage cargoItem = cargo[cargoId];
        return (
            0, // FHE.decrypt(cargoItem.weight) - will be decrypted off-chain
            0, // FHE.decrypt(cargoItem.value) - will be decrypted off-chain
            0, // FHE.decrypt(cargoItem.temperature) - will be decrypted off-chain
            0, // FHE.decrypt(cargoItem.humidity) - will be decrypted off-chain
            0, // FHE.decrypt(cargoItem.securityLevel) - will be decrypted off-chain
            cargoItem.isHazardous,
            cargoItem.isFragile,
            cargoItem.description,
            cargoItem.shipper,
            cargoItem.timestamp
        );
    }
    
    function getTrackingInfo(uint256 trackingId) public view returns (
        uint8 latitude,
        uint8 longitude,
        uint8 speed,
        uint8 heading,
        uint8 fuelLevel,
        uint8 temperature,
        address reporter
    ) {
        TrackingData storage tracking = trackingData[trackingId];
        return (
            0, // FHE.decrypt(tracking.latitude) - will be decrypted off-chain
            0, // FHE.decrypt(tracking.longitude) - will be decrypted off-chain
            0, // FHE.decrypt(tracking.speed) - will be decrypted off-chain
            0, // FHE.decrypt(tracking.heading) - will be decrypted off-chain
            0, // FHE.decrypt(tracking.fuelLevel) - will be decrypted off-chain
            0, // FHE.decrypt(tracking.temperature) - will be decrypted off-chain
            tracking.reporter
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function getVesselReputation(address vessel) public view returns (uint8) {
        return 0; // FHE.decrypt(vesselReputation[vessel]) - will be decrypted off-chain
    }
    
    function completeVoyage(uint256 voyageId) public {
        require(voyages[voyageId].owner == msg.sender, "Only voyage owner can complete voyage");
        require(voyages[voyageId].isActive, "Voyage is not active");
        
        voyages[voyageId].isActive = false;
        voyages[voyageId].status = FHE.asEuint32(2); // Completed
        emit VoyageStatusUpdated(voyageId, 2);
    }
}
