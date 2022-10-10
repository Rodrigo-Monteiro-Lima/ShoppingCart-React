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
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductFromId(id);
    this.setState({ product });
  }

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
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default ProductDetail;
