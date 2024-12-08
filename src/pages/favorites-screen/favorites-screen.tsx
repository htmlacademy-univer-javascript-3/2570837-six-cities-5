import { Offer } from '../../types/offer';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import PlaceCard from '@components/place-card/place-card';
import { useAppSelector } from '@hooks/index';


export default function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offersList);
  const favorites = offers.filter((offer) => offer.isBookmarked);
  const groupedFavorites = favorites.reduce<{ [city: string]: Offer[] }>((acc, offer) => {
    const city = offer.city.name;
    (acc[city] = acc[city] || []).push(offer);
    return acc;
  }, {});
  return (
    <div className="page">
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favorites.length === 0 ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search results.
                </p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(groupedFavorites).map(([city, cityOffers]) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to="#">
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cityOffers.map((offer) => (
                        <PlaceCard
                          key={offer.id}
                          pageKeyWords={'favorites'}
                          card={offer}
                          onMouseEnter={() => { }}
                          onMouseLeave={() => { }}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </a>
      </footer>
    </div>
  );
}
