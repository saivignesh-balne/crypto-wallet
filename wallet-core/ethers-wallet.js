import { ethers } from 'ethers';

export class EVMWallet {
  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = this.provider.getSigner();
  }

  async connect() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  }

  async getBalance(tokenAddress) {
    if (tokenAddress) {
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, this.signer);
      return await contract.balanceOf(await this.signer.getAddress());
    }
    return await this.signer.getBalance();
  }
}