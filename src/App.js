import React from 'react'
import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';


const App = () => {
  return (

    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route exact path='/'  element={<Home />} />
          <Route exact path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App
