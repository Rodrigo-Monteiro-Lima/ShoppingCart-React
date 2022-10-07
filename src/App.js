import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductsList from './pages/ProductsList';
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ ProductsList } />
        <Route exact path="/shoppingcart" component={ Cart } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
