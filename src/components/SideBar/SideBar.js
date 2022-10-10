import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { handleClick } = this.props;
    const { categories } = this.state;
    return (
      <aside>
        <h4>Categorias</h4>
        {categories.map(({ id, name }) => (
          <button
            data-testid="category"
            type="button"
            key={ id }
            onClick={ () => handleClick(id) }
          >
            {name}
          </button>
        ))}
      </aside>
    );
  }
}

SideBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default SideBar;
