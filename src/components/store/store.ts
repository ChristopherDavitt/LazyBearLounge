import { legacy_createStore } from "redux";

const defaultState = {
    nfts: [],
    peacefulStaked: [],
    hungryStaked: [],
    frenzyStaked: [],
    approved: [],
    connected: false,
    loading: false,
    address: '0x0000000000000000000000000000000000000000'
}

const reducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case "UPDATE_NFTS_AVAIL":
            return {...state, nfts: action.payload}
        case "UPDATE_NFTS_AVAIL":
            return {...state, nfts: action.payload}
        case "UPDATE_NFTS_AVAIL":
            return {...state, nfts: action.payload}
        case "UPDATE_NFTS_AVAIL":
            return {...state, nfts: action.payload}
        case "UPDATE_APPROVALS":
            return {...state, appoved: action.payload}
        case "CONNECT_WALLET":
            return {...state, connected: true};
        case "UPDATE_ADDRESS":
            return {...state, address: action.payload};
        case "DISCONNECT_WALLET":
            return defaultState;
        case "LOADING":
            return {...state, loading: true}
        case "FINISH_LOADING":
            return {...state, loading: false}
        default:
            return state;
    }
};

export const store = legacy_createStore(reducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;