import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/pages/Navbar';
import Home from './components/pages/Home';

function App() {

  const location = useLocation()

  return (
    <>
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path='/home' element={<Home />} />
      </Routes>

    </>
  );
}

export default App;
