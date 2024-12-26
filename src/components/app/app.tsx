import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@const';
import { HelmetProvider } from 'react-helmet-async';
import MainScreen from '@pages/main-screen/main-screen';
import LoginScreen from '@pages/login-screen/login-screen';
import FavoritesScreen from '@pages/favorites-screen/favorites-screen';
import OfferScreen from '@pages/offer-screen/offer-screen';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '@hooks/index';
import LoadingScreen from '@pages/loading-screen/loading-screen';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-router/history-router';
import { getAuthorizationStatus } from '@store/user-info/selector';
import { getOffersLoadingStatus } from '@store/offers-data/selector';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getOffersLoadingStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <>
      <ToastContainer />
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
                  authorizationStatus={authorizationStatus}
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
    </>
  );
}
