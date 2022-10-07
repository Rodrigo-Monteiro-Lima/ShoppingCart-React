import React from 'react';

class ProductsList extends React.Component {
  render() {
    return (
      <header
        data-testid="home-initial-message"
      >
        <h2> Digite algum termo de pesquisa ou escolha uma categoria. </h2>
      </header>
    );
  }
}

export default ProductsList;
