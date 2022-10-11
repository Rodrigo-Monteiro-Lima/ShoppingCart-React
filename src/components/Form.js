import { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  render() {
    const
      {
        inputChanged,
        submitButtonClicked,
        emailValue,
        textValue,
        ratingValue,
      } = this.props;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            placeholder="email"
            data-testid="product-detail-email"
            id="product-detail-email"
            name="email"
            value={ emailValue }
            onChange={ inputChanged }
            required
          />
        </label>
        nota:
        <label htmlFor="1">
          1
          <input
            type="radio"
            value={ ratingValue }
            id="1"
            data-testid="1-rating"
            name="rating"
            onChange={ inputChanged }
          />
        </label>
        <label htmlFor="2">
          2
          <input
            type="radio"
            value={ ratingValue }
            id="2"
            data-testid="2-rating"
            name="rating"
            onChange={ inputChanged }
          />
        </label>
        <label htmlFor="3">

          3
          <input
            type="radio"
            value={ ratingValue }
            id="3"
            data-testid="3-rating"
            name="rating"
            onChange={ inputChanged }
          />
        </label>

        <label htmlFor="4">
          4
          <input
            type="radio"
            value={ ratingValue }
            id="4"
            data-testid="4-rating"
            name="rating"
            onChange={ inputChanged }
          />
        </label>
        <label htmlFor="5">
          5
          <input
            type="radio"
            value={ ratingValue }
            id="5"
            data-testid="5-rating"
            name="rating"
            onChange={ inputChanged }
          />
        </label>
        <br />
        <label htmlFor="text">
          text:
          <textarea
            onChange={ inputChanged }
            value={ textValue }
            name="text"
            id="text"
            data-testid="product-detail-evaluation"
          />
        </label>
        <button
          data-testid="submit-review-btn"
          type="button"
          name="submit-button"
          onClick={ submitButtonClicked }
        >
          Submit
        </button>
      </form>
    );
  }
}
Form.propTypes = {
  inputChanged: PropTypes.string.isRequired,
  submitButtonClicked: PropTypes.func.isRequired,
  emailValue: PropTypes.string.isRequired,
  textValue: PropTypes.string.isRequired,
  ratingValue: PropTypes.number.isRequired,
};
export default Form;
