import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/pages/Header';

function App() {

  const location = useLocation()

  return (
    <>
      <Header />
      <Routes location={location} key={location.pathname}>
        <Route path='/' />
      </Routes>

    </>
  );
}

export default App;
