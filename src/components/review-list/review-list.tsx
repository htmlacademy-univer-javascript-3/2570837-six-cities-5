import ReviewItem from '@components/review-item/review-item';
import { Reviews } from '../../types/review';
import { useMemo, memo } from 'react';

type ReviewsListProps = {
  reviews: Reviews | undefined;
};

function ReviewList({ reviews }: ReviewsListProps): JSX.Element {
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
    <ul className="reviews__list">
      {sortedReviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

const MemoizedReviewsList = memo(ReviewList);
export default MemoizedReviewsList;
