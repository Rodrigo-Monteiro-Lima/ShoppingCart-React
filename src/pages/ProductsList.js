import React from 'react';
import {
  // getProductById,
  getProductsFromCategoryAndQuery,
  getCategoriesFromId,
} from '../services/api';
import ProductCard from '../components/ProductCard';
import ButtonCart from '../components/ButtonCart';
import SideBar from '../components/SideBar/SideBar';
import './ProductList.css';

class ProductsList extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      productList: '',
      notFound: true,
      cart: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem('items') === null) {
      localStorage.setItem('items', JSON.stringify([]));
    }
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

  save = () => {
    const { cart } = this.state;
    localStorage.setItem('items', JSON.stringify(cart));
  };

  addCartAndLocalStorage = ({ target }) => {
    const { productList } = this.state;
    const id = target.value;
    const product = productList.find((item) => item.id === id);
    this.setState((prevState) => ({
      cart: [...prevState.cart, product],
    }), this.save);
  };

  handleClick = async (id) => {
    const productsList = await getCategoriesFromId(id);
    this.setState({ productList: productsList.results, notFound: false });
  };

  render() {
    const { notFound, productList } = this.state;
    // console.log(JSON.parse(localStorage.getItem('items')));
    const initialTitleMessage = (
      <h2 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h2>
    );
    return (
      <main className="container">
        <SideBar handleClick={ this.handleClick } />
        <header>
          <div className="header-container">
            <div className="input-container">
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
            </div>
            <ButtonCart />
          </div>
          {notFound && initialTitleMessage}
          <div className="products-continer">
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
                    productId={ product.id }
                    addCartAndLocalStorage={ this.addCartAndLocalStorage }
                  />
                ))
              )
            }
          </div>
        </header>
      </main>
    );
  }
}

export default ProductsList;
