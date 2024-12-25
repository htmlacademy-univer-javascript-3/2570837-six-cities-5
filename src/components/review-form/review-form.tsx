import React, { ChangeEvent, FormEvent, memo, useCallback, useState } from 'react';
import { useAppDispatch } from '@hooks/index';
import { postReviewAction } from '@store/api-actions';
import { toast } from 'react-toastify';

const getRatingTitle = (star: number) => {
  switch (star) {
    case 5:
      return 'perfect';
    case 4:
      return 'good';
    case 3:
      return 'not bad';
    case 2:
      return 'badly';
    default:
      return 'terribly';
  }
};

type ReviewFormProps = {
  offerId: string;
}

export default function ReviewFormComponent({ offerId }: ReviewFormProps): JSX.Element {
  const [formData, setFormData] = React.useState({
    review: '',
    rating: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  const handleFieldChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const handleSubmitAsync = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const { rating, review } = formData;

    setIsSubmitting(true);

    try {
      await dispatch(postReviewAction({ offerId, comment: review, rating: Number(rating) }));
      setFormData({ rating: '', review: '' });
    } catch (error) {
      toast.warn('Failed to submit the review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [dispatch, formData, offerId]);

  const handleSubmit = useCallback((e: FormEvent) => {
    handleSubmitAsync(e).catch(() => {
      toast.warn('Failed to submit the review. Please try again.');
    });
  }, [handleSubmitAsync]);

  const isSubmitDisabled = !formData.rating || formData.review.length < 50 || formData.review.length > 300 || isSubmitting;

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input className="form__rating-input visually-hidden" name="rating" value={`${star}`} id={`${star}-stars`}
              type="radio" onChange={handleFieldChange} checked={formData.rating === `${star}`}
              disabled={isSubmitting}
            />
            <label htmlFor={`${star}-stars`} className="reviews__rating-label form__rating-label"
              title={getRatingTitle(star)}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleFieldChange}
        disabled={isSubmitting}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span>&nbsp;
          and describe your stay <b className="reviews__text-amount">from 50 to 300 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export const ReviewForm = memo(ReviewFormComponent);
