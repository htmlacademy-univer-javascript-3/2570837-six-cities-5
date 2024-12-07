import ReviewItem from '@components/review-item/review-item';
import { Reviews } from '../../types/review';

type ReviewsListProps = {
  reviews: Reviews | undefined;
};

export default function ReviewList({ reviews }: ReviewsListProps): JSX.Element {
  if (!reviews) {
    return <p style={{ textAlign: 'center', fontSize: '32px' }}>Leave first review</p>;
  }

  const sortedReviews = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <ul className="reviews__list">
      {sortedReviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}
