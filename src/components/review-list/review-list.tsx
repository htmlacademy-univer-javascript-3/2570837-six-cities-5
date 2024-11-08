import ReviewItem from '@components/review-item/review-item';
import { Reviews } from '../../types/review';

type ReviewsListProps = {
  reviews: Reviews | undefined;
};

export default function ReviewList({ reviews }: ReviewsListProps): JSX.Element {
  if (!reviews) {
    return <p style={{textAlign: 'center', fontSize: '32px'}}>Leave first review</p>;
  }

  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}
