import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { useAppSelector } from '@hooks/index';
import { memo, useMemo } from 'react';
import { FavoritesList } from '@components/favorites-list/favorites-list.tsx';


function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offersList);
  const favorites = useMemo(() => offers.filter((offer) => offer.isBookmarked), [offers]);

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
              <FavoritesList offers={favorites} />
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

const MemoizedFavoritesScreen = memo(FavoritesScreen);
export default MemoizedFavoritesScreen;
