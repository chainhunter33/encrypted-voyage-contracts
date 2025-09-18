import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';

// Contract ABI - This would be generated from the compiled contract
const ENCRYPTED_VOYAGE_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_vesselName", "type": "string"},
      {"internalType": "string", "name": "_cargoDescription", "type": "string"},
      {"internalType": "uint256", "name": "_departurePort", "type": "uint256"},
      {"internalType": "uint256", "name": "_arrivalPort", "type": "uint256"},
      {"internalType": "uint256", "name": "_departureTime", "type": "uint256"},
      {"internalType": "uint256", "name": "_arrivalTime", "type": "uint256"}
    ],
    "name": "createVoyage",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "voyageId", "type": "uint256"}],
    "name": "getVoyageInfo",
    "outputs": [
      {"internalType": "string", "name": "vesselName", "type": "string"},
      {"internalType": "string", "name": "cargoDescription", "type": "string"},
      {"internalType": "uint8", "name": "cargoWeight", "type": "uint8"},
      {"internalType": "uint8", "name": "cargoValue", "type": "uint8"},
      {"internalType": "uint8", "name": "status", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "voyageId", "type": "uint256"}],
    "name": "updateVoyageStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "voyageId", "type": "uint256"}],
    "name": "completeVoyage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

export function useEncryptedVoyageContract() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const createVoyage = async (
    vesselName: string,
    cargoDescription: string,
    departurePort: number,
    arrivalPort: number,
    departureTime: number,
    arrivalTime: number
  ) => {
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: ENCRYPTED_VOYAGE_ABI,
      functionName: 'createVoyage',
      args: [vesselName, cargoDescription, departurePort, arrivalPort, departureTime, arrivalTime],
    });
  };

  const updateVoyageStatus = async (voyageId: number, status: number) => {
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: ENCRYPTED_VOYAGE_ABI,
      functionName: 'updateVoyageStatus',
      args: [voyageId, status],
    });
  };

  const completeVoyage = async (voyageId: number) => {
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: ENCRYPTED_VOYAGE_ABI,
      functionName: 'completeVoyage',
      args: [voyageId],
    });
  };

  return {
    createVoyage,
    updateVoyageStatus,
    completeVoyage,
    contractAddress: CONTRACT_ADDRESS,
  };
}

export function useVoyageInfo(voyageId: number) {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: ENCRYPTED_VOYAGE_ABI,
    functionName: 'getVoyageInfo',
    args: [voyageId],
  });

  return {
    voyageInfo: data,
    isLoading,
    error,
  };
}

export function useVoyageList() {
  // This would typically fetch from a subgraph or indexer
  // For now, we'll return a mock implementation
  return useQuery({
    queryKey: ['voyages'],
    queryFn: async () => {
      // Mock data - in production, this would fetch from a subgraph
      return [
        {
          id: 1,
          vesselName: 'MV Ocean Explorer',
          cargoDescription: 'Electronics and Machinery',
          status: 'In Transit',
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          vesselName: 'MV Cargo Star',
          cargoDescription: 'Agricultural Products',
          status: 'Planned',
          createdAt: new Date().toISOString(),
        },
      ];
    },
  });
}
