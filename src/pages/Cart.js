import React from 'react';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    const cartList = JSON.parse(localStorage.getItem('items'));
    this.setState({ cart: cartList });
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        <Link to="/">Home</Link>
        {cart.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : (
            cart.map(({ title, price, thumbnail, id }) => (
              <div key={ id }>
                <h3 data-testid="shopping-cart-product-name">{title}</h3>
                <img src={ thumbnail } alt={ title } />
                <p>{price}</p>
                <p data-testid="shopping-cart-product-quantity">1</p>
              </div>
            ))
          )}
      </div>
    );
  }
}

export default Cart;
