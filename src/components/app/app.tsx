import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {HelmetProvider} from 'react-helmet-async';
import MainScreen from '@pages/main-screen/main-screen';
import LoginScreen from '@pages/login-screen/login-screen';
import FavoritesScreen from '@pages/favorites-screen/favorites-screen';
import OfferScreen from '@pages/offer-screen/offer-screen';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { Offers } from '../../types/offer';
import { FullOffers } from '../../types/fullOffer';
import { Reviews } from '../../types/review';

type AppProps = {
  placesCount: number;
  offers: Offers;
  fullOffers: FullOffers;
  reviews: Reviews;
}

export function App({placesCount, offers, fullOffers, reviews}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainScreen placesCount={placesCount} offers={offers}/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen/>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoritesScreen offers={offers}/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferScreen fullOffers={fullOffers} reviews={reviews}/>}
          />
          <Route
            path="*"
            element={<NotFoundScreen/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
