import React from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { FiMinus, FiPlus } from 'react-icons/fi';
import './Cart.css';

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

  save = () => {
    const { cart } = this.state;
    localStorage.setItem('items', JSON.stringify(cart));
  };

  handleRemove = (id) => {
    const { cart } = this.state;
    this.setState({ cart: cart.filter((item) => id !== item.id) }, this.save);
  };

  handleAdd = (id) => {
    const { cart } = this.state;
    const findIndex = cart.findIndex((product) => product.id === id);
    const arr = cart;
    arr[findIndex].qnt += 1;
    this.setState(() => ({ cart: arr }), this.save);
  };

  handleMinus = (id) => {
    const { cart } = this.state;
    const findIndex = cart.findIndex((product) => product.id === id);
    const arr = cart;
    arr[findIndex].qnt -= 1;
    this.setState(() => ({ cart: arr }), this.save);
  };

  render() {
    const { cart } = this.state;
    return (
      <div className="cart-container">
        <Link to="/">Home</Link>
        {cart.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : (
            cart.map(({ id, title, qnt, price, thumbnail }) => (
              <div key={ id } className="cartItem-container">
                <button
                  type="button"
                  data-testid="remove-product"
                  className="removebtn"
                  onClick={ () => this.handleRemove(id) }
                >
                  <MdDeleteForever />
                </button>
                <img src={ thumbnail } alt={ title } />
                <h3 data-testid="shopping-cart-product-name">{title}</h3>
                <button
                  type="button"
                  aria-label="subtracting"
                  disabled={ qnt === 1 }
                  onClick={ () => this.handleMinus(id) }
                  data-testid="product-decrease-quantity"
                >
                  <FiMinus />
                </button>
                <p data-testid="shopping-cart-product-quantity">
                  {qnt}
                </p>
                <button
                  type="button"
                  aria-label="adding"
                  data-testid="product-increase-quantity"
                  onClick={ () => this.handleAdd(id) }
                >
                  <FiPlus />
                </button>
                <p>
                  R$
                  {' '}
                  {(Math
                    .round((qnt * price) * 100) / 100)
                    .toLocaleString('pt-br')}

                </p>
              </div>
            ))
          )}
        {cart.length !== 0 && (
          <p>
            Preço total: R$
            {' '}
            {cart.reduce((acc, curr) => acc + (curr.price * curr.qnt), 0)
              .toLocaleString('pt-br')}
          </p>)}
      </div>
    );
  }
}

export default Cart;
