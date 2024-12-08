import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import MainScreen from '@pages/main-screen/main-screen';
import LoginScreen from '@pages/login-screen/login-screen';
import FavoritesScreen from '@pages/favorites-screen/favorites-screen';
import OfferScreen from '@pages/offer-screen/offer-screen';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '@pages/loading-screen/loading-screen';
import browserHistory from '../../browser-history.ts';
import HistoryRouter from '../history-router/history-router.tsx';


export default function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainScreen />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferScreen />}
          />
          <Route
            path="*"
            element={<NotFoundScreen />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
