import ReviewItem from '@components/review-item/review-item';
import { Reviews } from '../../types/review';
import { useMemo, memo } from 'react';
import { ReviewForm } from '@components/review-form/review-form';

type ReviewsListProps = {
  reviews: Reviews | undefined;
  offerId: string;
};

function ReviewList({ reviews, offerId }: ReviewsListProps): JSX.Element {
  const sortedReviews = useMemo(() => {
    if (!reviews) {
      return [];
    }

    return [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
  }, [reviews]);

  if (!reviews || sortedReviews.length === 0) {
    return <p style={{ textAlign: 'center', fontSize: '32px' }}>Leave first review</p>;
  }

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
      <ReviewForm offerId={offerId} />
    </section>
  );
}

const MemoizedReviewsList = memo(ReviewList);
export default MemoizedReviewsList;
