import { Helmet } from 'react-helmet-async';
import Header from '@components/header/header';
import { useParams } from 'react-router-dom';
import Map from '@components/map/map';
import ReviewForm from '@components/review-form/review-form';
import ReviewList from '@components/review-list/review-list';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';
import OffersList from '@components/offer-list/offer-list';
import { useAppSelector } from '@hooks/index';


export default function OfferScreen(): JSX.Element {
  const params = useParams();
  const offers = useAppSelector((state) => state.offersList);
  const reviews = useAppSelector((state) => state.reviews);
  const fullOffers = useAppSelector((state) => state.fullOffers);
  const currentOffer = offers.find((offer) => offer.id === params.id);
  const currentFullOffer = fullOffers.find((offer) => offer.id === params.id);

  if (!currentOffer || !currentFullOffer) {
    return <NotFoundScreen />;
  }

  const sameCityOffers = offers
    .filter((offer) => offer.city.name === currentOffer.city.name && offer.id !== currentOffer.id)
    .slice(0, 3);

  return (
    <div className="page">
      <Helmet>
        <title>Offer {currentFullOffer.id}</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentFullOffer.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={image}
                    alt={`Photo of ${currentOffer.title}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentFullOffer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${currentFullOffer.starsCount * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentFullOffer.starsCount}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentFullOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentFullOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  {currentFullOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentFullOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentFullOffer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={currentFullOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {currentFullOffer.host.name}
                  </span>
                  {currentFullOffer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  {currentFullOffer.descriptions.map((description) => (
                    <p key={description} className="offer__text">
                      {description}
                    </p>
                  ))}
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewList reviews={reviews} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map
            offers={[currentOffer, ...sameCityOffers]}
            selectedOffer={undefined}
            className="offer__map map"
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              pageKeyWords={'near-places'}
              offers={sameCityOffers}
              onActiveOfferChange={() => { }}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
