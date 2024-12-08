import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { memo } from 'react';


type PlaceCardProps = {
  pageKeyWords: string;
  card: Offer;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function PlaceCard({ pageKeyWords, card, onMouseEnter, onMouseLeave }: PlaceCardProps): JSX.Element {
  return (
    <article className={`${pageKeyWords}__card place-card`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {card.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${pageKeyWords}__image-wrapper place-card__image-wrapper`}>
        {
          <Link to={`${AppRoute.Offer}/${card.id}`}>
            <img className="place-card__image" src={card.imgPath} width={260} height={200} alt="Place image" />
          </Link>
        }
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{card.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${card.isBookmarked ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{card.isBookmarked ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `calc(20% * ${card.starsCount})` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${card.id}`}>{card.title}</Link>
        </h2>
        <p className="place-card__type">{card.type}</p>
      </div>
    </article>
  );
}

const MemoizedPlaceCard = memo(PlaceCard);

export default MemoizedPlaceCard;
