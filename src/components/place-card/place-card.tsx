import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import { AppRoute, AuthorizationStatus } from '@const';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { redirectToRoute } from '@store/action';
import { changeFavoriteAction, fetchNearbyOffersAction } from '@store/api-actions';
import { showCustomToast } from '@components/custom-toast/custom-toast';


type PlaceCardProps = {
  card: Offer;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  parentOfferId?: string;
}

export default function PlaceCard({ card, onMouseEnter, onMouseLeave, parentOfferId = undefined }: PlaceCardProps): JSX.Element {
  const stylePrefix = parentOfferId ? 'near-places' : 'cities';
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const handleFavoriteClick = useCallback(async () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }

    const newStatus = card.isBookmarked ? 0 : 1;
    await dispatch(changeFavoriteAction({ offerId: card.id, status: newStatus }));
    if (parentOfferId) {
      dispatch(fetchNearbyOffersAction(parentOfferId));
    }
  }, [authorizationStatus, card.isBookmarked, card.id, dispatch, parentOfferId]);

  const handleClickWrapper = () => {
    handleFavoriteClick().catch((error) => {
      showCustomToast(`${error}`);
    });
  };

  return (
    <article className={`${stylePrefix}__card place-card`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {card.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <Link to={`${AppRoute.Offer}/${card.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className={`${stylePrefix}__image-wrapper place-card__image-wrapper`}>
          <img className="place-card__image" src={card.imgPath} width={260} height={200} alt="Place image" />
        </div>
      </Link>
      <div className={`${card.isBookmarked && 'favorites__card-info '}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{card.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${card.isBookmarked && 'place-card__bookmark-button--active '}button`}
            type="button"
            onClick={handleClickWrapper}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{card.isBookmarked ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${20 * Math.round(card.starsCount)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <Link to={`${AppRoute.Offer}/${card.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2 className="place-card__name">
            {card.title}
          </h2>
          <p className="place-card__type">{card.type.charAt(0).toUpperCase() + card.type.slice(1)}</p>
        </Link>
      </div>
    </article>
  );
}
