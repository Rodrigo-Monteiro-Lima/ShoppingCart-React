import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  render() {
    const { productName, productImage, productPrice, productId } = this.props;
    const { addCartAndLocalStorage } = this.props;
    return (
      <div data-testid="product">
        <h3>{productName}</h3>
        <img src={ productImage } alt={ productName } />
        <span>{productPrice}</span>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ addCartAndLocalStorage }
          value={ productId }
        >
          Adicionar ao carrinho
        </button>
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
  addCartAndLocalStorage: PropTypes.func.isRequired,
};
export default ProductCard;
