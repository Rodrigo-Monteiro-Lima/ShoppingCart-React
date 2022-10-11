import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonCart extends Component {
  render() {
    return (
      <div className="shopping-cart-button">
        <Link data-testid="shopping-cart-button" to="/shoppingcart">
          <img
            src="https://cdn-icons-png.flaticon.com/512/34/34627.png"
            alt="Cart icon."
          />
        </Link>
      </div>
    );
  }
}

export default ButtonCart;
