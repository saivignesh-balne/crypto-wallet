import { ethers } from 'ethers';

const ERC20_ABI = [{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"}];

export default async function handler(req, res) {
  const { address, token } = req.query;
  const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_URL);
  
  if (token) {
    const contract = new ethers.Contract(token, ERC20_ABI, provider);
    const balance = await contract.balanceOf(address);
    res.status(200).json({ balance: ethers.utils.formatEther(balance) });
  } else {
    const balance = await provider.getBalance(address);
    res.status(200).json({ balance: ethers.utils.formatEther(balance) });
  }
}