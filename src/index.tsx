import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { FirebaseAppProvider } from 'reactfire';

import { store } from './components/store/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  xxx
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const breakpoints = {
  xsm: '30px',
  sm:'620px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
}

const theme = extendTheme({
  breakpoints
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Router>
            <App />
          </Router>
        </ChakraProvider>
      </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
