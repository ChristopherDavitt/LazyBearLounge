export const networkParams = <any> {
    avalanche : {
      chainId: `0x${Number(43114).toString(16)}`,
      rpcUrls: ["https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc"],
      chainName: "Avalanche Mainnet",
      nativeCurrency: { name: "AVAX", decimals: 18, symbol: "ONE" },
      blockExplorerUrls: ["https://snowtrace.io"],
    },
};
  