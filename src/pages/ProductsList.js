import React from 'react';
import {
  // getProductById,
  getProductsFromCategoryAndQuery,
  // getCategories
} from '../services/api';
import ProductCard from '../components/ProductCard';
import ButtonCart from '../components/ButtonCart';
import SideBar from '../components/SideBar/SideBar';
import '../components/SideBar/style.css';

class ProductsList extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      productList: '',
      notFound: true,
    };
  }

  changedInputValue = ({ target }) => {
    const { value } = target;
    this.setState({ searchInput: value });
  };

  clickSearchButton = async () => {
    const { searchInput } = this.state;
    const productsList = await getProductsFromCategoryAndQuery('', searchInput);
    console.log(productsList.results);
    if (productsList.results.length > 0) {
      this.setState({ productList: productsList.results, notFound: false });
    } else {
      this.setState({ notFound: true });
    }
  };

  render() {
    const { notFound, productList } = this.state;
    const initialTitleMessage = (
      <h2 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h2>
    );
    return (
      <>
        <header>
          <input
            type="text"
            data-testid="query-input"
            onChange={ this.changedInputValue }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.clickSearchButton }
          >
            Search
          </button>

          {notFound && initialTitleMessage}
          {
            notFound ? (
              'Nenhum produto foi encontrado'
            ) : (
              productList.map((product) => (
                <ProductCard
                  key={ product.id }
                  productName={ product.title }
                  productImage={ product.thumbnail }
                  productPrice={ product.price }
                />
              ))
            )
          }
          <ButtonCart />
        </header>
        <SideBar />
      </>
    );
  }
}

export default ProductsList;
