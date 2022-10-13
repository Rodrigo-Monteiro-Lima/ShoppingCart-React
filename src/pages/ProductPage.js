import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductFromId } from '../services/api';
import ButtonCart from '../components/ButtonCart';
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
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductFromId(id);
    if (localStorage.getItem(id) === null) {
      localStorage.setItem(id, JSON.stringify([]));
    }
    this.setState(
      { product, ratingObject: [...JSON.parse(localStorage.getItem(id))] },
    );
    this.regexEmail();
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
    const { product: { title, thumbnail, price, warranty }, errorLog,
      ratingObject, rating, text, email } = this.state;
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
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default ProductDetail;
