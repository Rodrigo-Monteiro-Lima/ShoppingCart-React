import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductFromId } from '../services/api';
import ButtonCart from '../components/ButtonCart';

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      cart: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductFromId(id);
    this.setState({ product });
  }

  save = () => {
    const { cart } = this.state;
    localStorage.setItem('items', JSON.stringify(cart));
  };

  addCartAndLocalStorage = ({ target }) => {
    const { product } = this.state;
    console.log(product);
    const id = target.value;
    const itemCart = product.id !== id;
    if (itemCart === true) {
      this.setState((prevState) => ({
        cart: [...prevState.cart, product],
      }), this.save);
    }
  };

  render() {
    const { product: { title, thumbnail, price, warranty } } = this.state;
    return (
      <div>
        <div>
          <Link to="/">Home</Link>
          <ButtonCart />
        </div>
        <h3 data-testid="product-detail-name">{title}</h3>
        <img
          src={ thumbnail }
          alt={ title }
          width="150px"
          data-testid="product-detail-image"
        />
        <h4 data-testid="product-detail-price">{price}</h4>
        <h4>{warranty}</h4>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          // value={ id }
          onClick={ this.addCartAndLocalStorage }
        >
          Compre agora!
        </button>
        <br />
        <br />
        <Link to="/shoppingcart"> Cart </Link>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default ProductDetail;
