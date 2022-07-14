export const networkParams = <any> {
    avalanche : {
      chainId: `0x${Number(43114).toString(16)}`,
      rpcUrls: ["https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc"],
      chainName: "Avalanche Mainnet",
      nativeCurrency: { name: "AVAX", decimals: 18, symbol: "AVAX" },
      blockExplorerUrls: ["https://snowtrace.io"],
    },
    fuji: {
      chainId: `0x${Number(43113).toString(16)}`,
      rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
      chainName: "Avalanche FUJI C-Chain",
      nativeCurrency: { name: "AVAX", decimals: 18, symbol: "AVAX"},
      blockExplorerUrls: ["https://testnet.snowtrace.io/"],
    }
};
  