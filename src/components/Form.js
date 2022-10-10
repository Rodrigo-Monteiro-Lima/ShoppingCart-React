import { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <form>
        <input type="email" placeholder="email" data-testid="product-detail-email" />
        <select name="nota" id="nota">
          <option value="1" data-testid="1-rating">1</option>
          <option value="2" data-testid="2-rating">2</option>
          <option value="3" data-testid="3-rating">3</option>
          <option value="4" data-testid="4-rating">4</option>
          <option value="5" data-testid="5-rating">5</option>
        </select>
        <button
          data-testid="submit-review-btn"
          type="button"
          name="submit-button"
        >
          Submit

        </button>
      </form>
    );
  }
}

export default Form;
