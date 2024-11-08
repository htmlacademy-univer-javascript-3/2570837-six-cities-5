import {Helmet} from 'react-helmet-async';
import Header from '@components/header/header';
import {Offers} from '../../types/offer';
import {FullOffers} from '../../types/fullOffer';
import {Reviews} from '../../types/review';
import { useParams } from 'react-router-dom';
import Map from '@components/map/map';
import ReviewForm from '@components/review-form/review-form';
import ReviewList from '@components/review-list/review-list';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';
import OffersList from '@components/offer-list/offer-list';

type OfferScreenProps = {
  offers: Offers;
  reviews: Reviews;
  fullOffers: FullOffers;
}

export default function OfferScreen({ offers, reviews, fullOffers }: OfferScreenProps): JSX.Element {
  const params = useParams();
  const fullOffer = fullOffers.find((offer) => offer.id === params.id);
  const sameCityOffers = offers.filter(
    (offer) => offer.city.name === fullOffer?.city.name && offer.title !== fullOffer?.title
  );

  if (!fullOffer) {
    return <NotFoundScreen />;
  }
  return (
    <div className="page">
      <Helmet>
        <title>Offer {fullOffer.id}</title>
      </Helmet>
      <Header/>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {fullOffer.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={image}
                    alt={`Photo of ${fullOffer.title}`}
                  />
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
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${fullOffer.starsCount * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{fullOffer.starsCount}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {fullOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {fullOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  {fullOffer.maxAdults} adults
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
                    <img className="offer__avatar user__avatar" src={fullOffer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {fullOffer.host.name}
                  </span>
                  {fullOffer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  {fullOffer.descriptions.map((description) => (
                    <p key={description} className="offer__text">
                      {description}
                    </p>
                  ))}
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewList reviews={reviews}/>
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map
            offers={sameCityOffers}
            selectedOffer={undefined}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              pageKeyWords={'near-places'}
              offers={sameCityOffers}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
