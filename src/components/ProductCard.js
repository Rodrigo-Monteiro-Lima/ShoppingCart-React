import { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  render() {
    const { productName, productImage, productPrice } = this.props;
    return (
      <div data-testid="product">
        <h3>{productName}</h3>
        <img src={ productImage } alt={ productName } />
        <span>{productPrice}</span>
      </div>
    );
  }
}
ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
};
export default ProductCard;
