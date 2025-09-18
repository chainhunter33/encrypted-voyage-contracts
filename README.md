# Encrypted Voyage Contracts

A decentralized application for secure maritime tracking and logistics management using Fully Homomorphic Encryption (FHE).

## Project Overview

This project provides a comprehensive solution for maritime logistics with privacy-preserving features through FHE encryption. It enables secure tracking of cargo, vessels, and logistics data while maintaining confidentiality of sensitive information.

## Features

- **Secure Maritime Tracking**: Real-time vessel and cargo tracking with encrypted data
- **FHE Encryption**: Fully homomorphic encryption for sensitive logistics data
- **Decentralized Architecture**: Built on blockchain for transparency and security
- **Privacy-Preserving Analytics**: Analyze logistics data without exposing sensitive information
- **Multi-Chain Support**: Compatible with various blockchain networks

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Solidity, FHEVM
- **Encryption**: Fully Homomorphic Encryption (FHE)
- **State Management**: React Query, React Hooks

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chainhunter33/encrypted-voyage-contracts.git
cd encrypted-voyage-contracts
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

## Environment Configuration

Create a `.env` file with the following variables:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

## Smart Contracts

The project includes FHE-enabled smart contracts for:
- Vessel registration and tracking
- Cargo management with encrypted data
- Logistics coordination
- Privacy-preserving analytics

## Development

### Building the Project

```bash
npm run build
```

### Running Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

## Deployment

The application can be deployed to various platforms:

1. **Vercel**: Connect your GitHub repository to Vercel for automatic deployments
2. **Netlify**: Use the build command `npm run build` and publish directory `dist`
3. **Self-hosted**: Deploy the built files to any web server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.