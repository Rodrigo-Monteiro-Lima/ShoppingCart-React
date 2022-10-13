import React from 'react';
import {
  getProductsFromCategoryAndQuery,
  getCategoriesFromId,
} from '../services/api';
import ProductCard from '../components/ProductCard';
import ButtonCart from '../components/ButtonCart';
import SideBar from '../components/SideBar/SideBar';
import Product from '../components/pooModel';
import './ProductList.css';

class ProductsList extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      productList: '',
      notFound: true,
      cart: [],
      cartCount: 0,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('items') === null) {
      localStorage.setItem('items', JSON.stringify([]));
    }
    const cartList = JSON.parse(localStorage.getItem('items'));
    const count = cartList.reduce((acc, curr) => acc + curr.qnt, 0);
    this.setState({ cart: cartList, cartCount: count });
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
    const cartList = JSON.parse(localStorage.getItem('items'));
    const count = cartList.reduce((acc, curr) => acc + curr.qnt, 0);
    this.setState({ cartCount: count });
  };

  addCartAndLocalStorage = ({ target }) => {
    const { productList, cart } = this.state;
    const id = target.value;
    const arr = cart;
    const product = productList.find((item) => item.id === id);

    const findProduct = cart.find((item) => item.id === id);
    const findIndex = cart.findIndex((item) => item.id === id);
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
  };

  handleClick = async (id) => {
    const productsList = await getCategoriesFromId(id);
    this.setState({ productList: productsList.results, notFound: false });
  };

  handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      const { searchInput } = this.state;
      const productsList = await getProductsFromCategoryAndQuery('', searchInput);
      if (productsList.results.length > 0) {
        this.setState({ productList: productsList.results, notFound: false });
      } else {
        this.setState({ notFound: true });
      }
    }
  };

  render() {
    const { notFound, productList, cartCount } = this.state;
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
                onKeyPress={ this.handleKeyPress }
              />
              <button
                type="button"
                data-testid="query-button"
                onClick={ this.clickSearchButton }
              >
                Search
              </button>
            </div>
            <ButtonCart cartCount={ cartCount } />
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
