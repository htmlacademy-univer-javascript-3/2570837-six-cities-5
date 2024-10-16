import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  element: JSX.Element;
  isAuthenticated: boolean;
};

export default function PrivateRoute({element, isAuthenticated}: PrivateRouteProps): JSX.Element {
  return isAuthenticated ? element : <Navigate to={AppRoute.Login} />;
}
