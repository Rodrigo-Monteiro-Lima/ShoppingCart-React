import React, { Component } from 'react';
import { getCategories } from '../../services/api';
import './style.css';

class SideBar extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const data = await getCategories();
    this.setState({
      categories: data,
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <aside>
        <h4>Categorias</h4>
        {categories.map(({ id, name }) => (
          <button
            data-testid="category"
            type="button"
            key={ id }
            onClick={ () => console.log(name) }
          >
            {name}
          </button>
        ))}
      </aside>
    );
  }
}

export default SideBar;
