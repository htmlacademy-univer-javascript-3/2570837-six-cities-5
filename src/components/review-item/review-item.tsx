import { Review } from '../../types/review';
import { memo } from 'react';

type ReviewItemProps = {
  review: Review;
}

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  return (
    <li key={review.id} className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
        {review.user.isPro && <span className="offer__user-status">Pro</span>}
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${review.starsCount * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.text}</p>
        <time className="reviews__time" dateTime={review.date}>
          {new Date(review.date).toLocaleString('default', { month: 'long', year: 'numeric' })}
        </time>
      </div>
    </li>
  );
}

const MemoizedReviewItem = memo(ReviewItem);
export default MemoizedReviewItem;
