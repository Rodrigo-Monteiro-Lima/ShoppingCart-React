import React from 'react';
import ButtonCart from '../components/ButtonCart';
import SideBar from '../components/SideBar/SideBar';
import '../components/SideBar/style.css';

class ProductsList extends React.Component {
  render() {
    return (
      <>
        <header data-testid="home-initial-message">
          <h2> Digite algum termo de pesquisa ou escolha uma categoria. </h2>
          <ButtonCart />
        </header>
        <SideBar />
      </>
    );
  }
}

export default ProductsList;
