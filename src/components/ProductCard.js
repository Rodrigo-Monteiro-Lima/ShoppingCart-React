import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  render() {
    const { productName, productImage, productPrice, productId } = this.props;
    return (
      <div data-testid="product">
        <h3>{productName}</h3>
        <img src={ productImage } alt={ productName } />
        <span>{productPrice}</span>
        <Link
          data-testid="product-detail-link"
          to={ `/item/${productId}` }
        >
          Mais detalhes
        </Link>
      </div>
    );
  }
}
ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
};
export default ProductCard;
