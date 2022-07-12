import { InjectedConnector } from "@web3-react/injected-connector";

const injected = new InjectedConnector({});

export const connectors = <any> {
  injected: injected
};
