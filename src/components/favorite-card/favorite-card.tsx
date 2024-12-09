import { Offer } from '../../types/offer.ts';
import { Link } from 'react-router-dom';
import { AppRoute } from '@const';
import { memo, useCallback } from 'react';
import { changeFavoriteAction } from '@store/api-actions.ts';
import { useAppDispatch } from '@hooks/index';

type FavoriteCardProps = {
  offer: Offer;
}

function FavoriteCardComponent({ offer }: FavoriteCardProps) {
  const dispatch = useAppDispatch();

  const handleFavoriteClick = useCallback(() => {
    dispatch(changeFavoriteAction({ offerId: offer.id, status: 0 }));
  }, [offer.isBookmarked, offer.id, dispatch]);

  return (
    <article className={'favorites__card place-card'}>
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={'favorites__image-wrapper place-card__image-wrapper'}>
        <a href="#">
          <img className="place-card__image" src={offer.imgPath} width="150" height="110" alt="Place image" />
        </a>
      </div>
      <div className={'favorites__card-info place-card__info'}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={'place-card__bookmark-button button place-card__bookmark-button--active button'}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${20 * Math.round(offer.starsCount)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}</p>
      </div>
    </article>
  );
}

export const FavoriteCard = memo(FavoriteCardComponent);
