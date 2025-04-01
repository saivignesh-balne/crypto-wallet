import { ethers } from 'ethers';

export default async function handler(req, res) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_URL);
  const gasPrice = await provider.getGasPrice();
  res.status(200).json({ gasPrice: ethers.utils.formatUnits(gasPrice, 'gwei') });
}