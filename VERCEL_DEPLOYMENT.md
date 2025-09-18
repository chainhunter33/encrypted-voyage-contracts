# Vercel Deployment Guide for Encrypted Voyage Contracts

This guide provides step-by-step instructions for deploying the Encrypted Voyage Contracts application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step 1: Prepare the Repository

1. Ensure all changes are committed and pushed to the main branch:
   ```bash
   git add .
   git commit -m "feat: Complete encrypted voyage contracts with FHE encryption"
   git push origin main
   ```

## Step 2: Connect to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" or "Import Project"
   - Select "Import Git Repository"
   - Choose `chainhunter33/encrypted-voyage-contracts`
   - Click "Import"

## Step 3: Configure Build Settings

1. **Framework Preset**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

2. **Root Directory**
   - Leave as default (root of repository)

## Step 4: Environment Variables

Configure the following environment variables in Vercel:

### Required Variables

```env
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
VITE_MAINNET_RPC_URL=https://1rpc.io/eth
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
VITE_ALTERNATIVE_RPC_URL=https://1rpc.io/sepolia
```

### Optional Variables

```env
VITE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
VITE_FHE_NETWORK_URL=https://api.zama.ai
VITE_FHE_APP_ID=your_fhe_app_id
```

### How to Add Environment Variables in Vercel:

1. In your project dashboard, go to "Settings"
2. Click on "Environment Variables"
3. Add each variable with its value
4. Make sure to add them for all environments (Production, Preview, Development)

## Step 5: Deploy

1. **Automatic Deployment**
   - Vercel will automatically detect the Vite configuration
   - Click "Deploy" to start the deployment process
   - Wait for the build to complete (usually 2-3 minutes)

2. **Manual Deployment**
   - If automatic deployment fails, you can trigger it manually
   - Go to "Deployments" tab and click "Redeploy"

## Step 6: Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to "Settings" → "Domains"
   - Add your custom domain
   - Configure DNS records as instructed by Vercel

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - HTTPS will be enabled by default

## Step 7: Verify Deployment

1. **Check Build Logs**
   - Ensure the build completed successfully
   - Check for any warnings or errors

2. **Test the Application**
   - Visit the deployed URL
   - Test wallet connection
   - Verify all features work correctly

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in package.json
   - Check for TypeScript errors

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match exactly (case-sensitive)
   - Verify no extra spaces in values

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URLs are accessible
   - Ensure chain ID matches your configuration

### Build Configuration

If you encounter build issues, you can add a `vercel.json` file:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install"
}
```

## Post-Deployment

1. **Monitor Performance**
   - Use Vercel Analytics to monitor performance
   - Check for any runtime errors

2. **Update Environment Variables**
   - If you need to change any variables, update them in Vercel dashboard
   - Redeploy the application

3. **Domain Configuration**
   - If using a custom domain, ensure DNS is properly configured
   - SSL certificate will be automatically provisioned

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to the repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **API Keys**
   - Keep your WalletConnect Project ID secure
   - Monitor usage and set limits if necessary

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev)
- **Rainbow Kit Documentation**: [rainbowkit.com](https://rainbowkit.com)

## Deployment URL

Once deployed, your application will be available at:
- Production: `https://encrypted-voyage-contracts.vercel.app`
- Preview: `https://encrypted-voyage-contracts-git-main-chainhunter33.vercel.app`

## Next Steps

1. **Smart Contract Deployment**
   - Deploy the EncryptedVoyage.sol contract to Sepolia testnet
   - Update the VITE_CONTRACT_ADDRESS environment variable
   - Test contract interactions

2. **FHE Integration**
   - Set up FHE network connection
   - Configure FHE app ID and network URL
   - Test encrypted operations

3. **Monitoring**
   - Set up error tracking (Sentry, etc.)
   - Monitor wallet connection success rates
   - Track user interactions with contracts
