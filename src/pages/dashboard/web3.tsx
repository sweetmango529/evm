import Web3 from 'web3';
import { chainsConfig } from '../../constants/chainsConfig';

interface ChainConfig {
  name: string;
  rpcUrl: string;
  denom: string;
}

export const getBalance = async (address: string, chain: string): Promise<{ balance: string; denom: string; }> => {
  const chainConfig: ChainConfig = chainsConfig[chain];
  if (!chainConfig) {
    throw new Error(`Unsupported chain: ${chain}`);
  }

  const web3 = new Web3(new Web3.providers.HttpProvider(chainConfig.rpcUrl));

  try {
    const balanceInWei = await web3.eth.getBalance(address);
    const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
    return { balance: balanceInEth, denom: chainConfig.denom };
  } catch (error) {
    console.error(`Error fetching balance for ${chain}:`, error);
    throw error;
  }
};