import { Helmet } from 'react-helmet-async';
import Header from '@components/header/header';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useCallback } from 'react';
import { MemoizedMap } from '@components/map/map';
import { AuthorizationStatus, AppRoute, MAX_NEARBY_OFFERS } from '@const';
import ReviewList from '@components/review-list/review-list';
import OffersList from '@components/offers-list/offers-list';
import LoadingScreen from '@pages/loading-screen/loading-screen';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { changeFavoriteOffersAction, fetchFullOfferAction } from '@store/api-actions';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';
import ReviewForm from '@components/review-form/review-form';
import { getAuthorizationStatus } from '@store/user-info/selector';
import { getNearbyOffers, getReviews, getOfferLoadingStatus, getFullOffer } from '@store/offer-data/selector';
import { getOffers } from '@store/offers-data/selector';


export default function OfferScreen(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const offers = useAppSelector(getOffers);
  const fullOffer = useAppSelector(getFullOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getReviews);
  const isLoading = useAppSelector(getOfferLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const memoizedNearbyOffers = useMemo(() => nearbyOffers.slice(0, MAX_NEARBY_OFFERS), [nearbyOffers]);
  const currentOffer = useMemo(() => offers.find((offer) => offer.id === id), [offers, id]);

  const handleBookmarkedClick = useCallback(() => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    } else if (currentOffer) {
      const status = currentOffer.isFavorite ? 0 : 1;
      dispatch(changeFavoriteOffersAction({ offerId: currentOffer.id, status }));
    }
  }, [authorizationStatus, navigate, dispatch, currentOffer]);

  useEffect(() => {
    if (id && !currentOffer) {
      dispatch(fetchFullOfferAction({ id }));
    }
  }, [currentOffer, dispatch, id]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!fullOffer || !currentOffer) {
    return (
      <NotFoundScreen />
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title> 6 cities offer №{currentOffer.id}</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {fullOffer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt={`Photo of ${fullOffer.title}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {fullOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {fullOffer.title}
                </h1>
                <button
                  className={`offer__bookmark-button ${currentOffer.isFavorite && 'offer__bookmark-button--active'} button`}
                  type="button"
                  onClick={handleBookmarkedClick}
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${Math.round(fullOffer.rating) * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{fullOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {fullOffer.type.charAt(0).toUpperCase() + fullOffer.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {fullOffer.bedrooms} Bedroom{fullOffer.bedrooms > 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {fullOffer.maxAdults} adult{fullOffer.maxAdults > 1 ? 's' : ''}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{fullOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {fullOffer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper ${fullOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}
                  >
                    <img className="offer__avatar user__avatar" src={fullOffer.host.avatarUrl} width={74} height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {fullOffer.host.name}
                  </span>
                  {fullOffer.host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {fullOffer.descriptions}
                  </p>
                </div>
              </div>
              <ReviewList reviews={reviews} offerId={fullOffer.id} />
              {authorizationStatus === AuthorizationStatus.Auth && (<ReviewForm offerId={id ?? ''} />)}
            </div>
          </div>
          <section className={'offer__map map'} data-testid={'map'}>
            <MemoizedMap points={[currentOffer, ...memoizedNearbyOffers]} selectedPointId={currentOffer.id} height={600} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffers} onActiveOfferChange={() => {
            }} parentOfferId={currentOffer.id}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
