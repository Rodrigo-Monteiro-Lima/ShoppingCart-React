class Product {
  title;

  thumbnail;

  qnt;

  price;

  id;

  warranty;

  add() {
    return this.qnt + 1;
  }

  remove() {
    return this.qnt - 1;
  }
}

export default Product;
