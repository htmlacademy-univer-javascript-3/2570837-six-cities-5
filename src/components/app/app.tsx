import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainScreen from '@pages/main-screen/main-screen';
import LoginScreen from '@pages/login-screen/login-screen';
import FavoritesScreen from '@pages/favorites-screen/favorites-screen';
import OfferScreen from '@pages/offer-screen/offer-screen';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
    placesCount: number;
}

export function App({placesCount}: AppProps): JSX.Element {
  const isAuthenticated = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen placesCount={placesCount}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<FavoritesScreen/>} />}
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen/>}
        />
        <Route
          path="*"
          element={<NotFoundScreen/>}
        />
      </Routes>
    </BrowserRouter>
  );
}
