import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductFromId } from '../services/api';
import ButtonCart from '../components/ButtonCart';
import Product from '../components/pooModel';
import Form from '../components/Form';
import RatingCard from '../components/RatingCard';

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      validEmail: false,
      errorLog: '',
      rating: '',
      email: '',
      text: '',
      ratingObject: [],
      cart: [],
      cartCount: 0,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductFromId(id);
    if (localStorage.getItem(id) === null) {
      localStorage.setItem(id, JSON.stringify([]));
    }
    if (localStorage.getItem('items') === null) {
      localStorage.setItem('items', JSON.stringify([]));
      this.setState({ cartCount: 0 });
    }
    this.setState(
      { product, ratingObject: [...JSON.parse(localStorage.getItem(id))] },
    );
    this.regexEmail();
    this.setState({ product });
    const cartList = JSON.parse(localStorage.getItem('items'));
    const count = cartList.reduce((acc, curr) => acc + curr.qnt, 0);
    this.setState({ cart: cartList, cartCount: count });
  }

  regexEmail = () => {
    const { email } = this.state;
    const regex = /\S+@\S+\.\S+/;
    this.setState({ validEmail: regex.test(email) });
  };

  inputValidation = ({ target }) => {
    const { name, type } = target;
    const value = type === 'radio' ? target.id : target.value;
    if (name === 'email') {
      this.setState({ [name]: value }, this.regexEmail);
    } else {
      this.setState({ [name]: value });
    }
    console.log(value);
  };

  submitRating = () => {
    const { match: { params: { id } } } = this.props;
    const { validEmail, ratingObject, rating, email, text } = this.state;
    const errorMessage = (
      <span
        data-testid="error-msg"
      >
        Campos inválidos
      </span>);
    this.setState({ errorLog: validEmail && (text !== '')
    && (rating !== '') ? '' : (
        errorMessage) });
    if (validEmail && (rating !== '')) {
      const newRating = {
        email,
        text,
        rating,
      };
      const ratingUpdate = [newRating, ...ratingObject];
      this.setState({ ratingObject: ratingUpdate });
      this.setState({ email: '', text: '', rating: '', errorLog: '' });
      localStorage.setItem(id, JSON.stringify(ratingUpdate));
      console.log(JSON.parse(localStorage.getItem(id)));
    } else {
      this.setState({ errorLog: errorMessage });
    }
  };

  save = () => {
    const { cart } = this.state;
    localStorage.setItem('items', JSON.stringify(cart));
    const cartList = JSON.parse(localStorage.getItem('items'));
    const count = cartList.reduce((acc, curr) => acc + curr.qnt, 0);
    this.setState({ cartCount: count });
  };

  addCartAndLocalStorage = ({ target }) => {
    const { product, cart } = this.state;
    const id = target.value;
    const itemCart = product.id !== id;
    if (itemCart === true) {
      const findProduct = cart.find((item) => item.id === product.id);
      const findIndex = cart.findIndex((item) => item.id === product.id);
      if (findProduct && findIndex >= 0) {
        arr[findIndex].qnt += 1;
        this.setState(() => ({
          cart: arr,
        }), this.save);
      } else {
        const item = new Product();
        item.id = product.id;
        item.title = product.title;
        item.qnt = 1;
        item.thumbnail = product.thumbnail;
        item.price = product.price;
        item.warranty = product.warranty;
        this.setState((prevState) => ({
          cart: [...prevState.cart, item],
        }), this.save);
      }
    }
  };

  render() {
    const { product: { title, thumbnail, price, warranty }, errorLog,
      ratingObject, rating, text, email, cartCount } = this.state;
    return (
      <div>
        <div>
          <Link to="/">Home</Link>
          <ButtonCart cartCount={ cartCount } />
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
        <Form
          inputChanged={ this.inputValidation }
          submitButtonClicked={ this.submitRating }
          emailValue={ email }
          ratingValue={ rating }
          textValue={ text }
        />
        <div>
          {errorLog}
        </div>
        {ratingObject.map((rateObject, index) => (
          <RatingCard
            key={ `${rateObject.email} ${index}` }
            personRatingEmail={ rateObject.email }
            personRatingMessage={ rateObject.text }
            personRatingNumber={ rateObject.rating }
          />
        ))}
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
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default ProductDetail;
