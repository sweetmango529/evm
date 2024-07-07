export const chainsConfig  : { [key: string]: any } = {
  ethereum: {
    name: "Ethereum",
    rpcUrl: "https://eth-pokt.nodies.app",
    denom: "ETH"
  },
  bsc: {
    name: "Binance Smart Chain",
    rpcUrl: "https://bsc-pokt.nodies.app",
    denom: "BNB"
  },
  polygon: {
    name: "Polygon",
    rpcUrl: "https://polygon-pokt.nodies.app",
    denom: "MATIC"
  },
  base: {
    name: "Base",
    rpcUrl: "https://base-pokt.nodies.app",
    denom: "ETH"
  },
  arbitrum: {
    name: 'Arbitrum One',
    rpcUrl: 'https://arbitrum-one-rpc.publicnode.com',
    denom: 'ETH'
  },
  scroll: {
    name: 'Scroll',
    rpcUrl: 'https://scroll.drpc.org',
    denom: 'ETH'
  },
  mantle: {
    name: 'Mantle',
    rpcUrl: 'https://mantle.drpc.org',
    denom: 'MNT'
  }
};

export const denoms = ['eth', 'bsc', 'polygon', 'base', 'arbitrum'];