import { Component } from 'react';
import PropTypes from 'prop-types';

class RatingCard extends Component {
  render() {
    const { personRatingEmail, personRatingMessage, personRatingNumber } = this.props;
    return (
      <div className="rating-card">
        <h4 data-testid="review-card-email">{personRatingEmail}</h4>
        <span data-testid="review-card-rating">
          {personRatingNumber}
        </span>
        <p data-testid="review-card-evaluation">{personRatingMessage}</p>
      </div>
    );
  }
}

RatingCard.propTypes = {
  personRatingEmail: PropTypes.string.isRequired,
  personRatingMessage: PropTypes.string.isRequired,
  personRatingNumber: PropTypes.string.isRequired,
};

export default RatingCard;
