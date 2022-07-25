import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/pages/Navbar';
import Staking from './components/pages/Staking';
import Landing from './components/pages/Landing';
import Minter from './components/pages/Minter';
import ErrorPage from './components/pages/ErrorPage';

function App() {

  const location = useLocation()

  return (
    <>
      <Navbar highlight={location.pathname} />
      <Routes location={location} key={location.pathname}>
        <Route path='*' element={<ErrorPage />} />
        <Route path='/' element={<Landing />} />
        <Route path='/staking' element={<Staking />} />
        <Route path='/mint' element={<Minter />} />
      </Routes>
    </>
  );
}

export default App;
