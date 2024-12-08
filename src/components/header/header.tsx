import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@const';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { logoutAction, } from '@store/api-actions';
import { memo, useCallback } from 'react';


function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userEmail = useAppSelector((state) => state.userEmail);
  const favoritesCount = useAppSelector((state) =>
    state.offersList.filter((offer) => offer.isBookmarked).length);

  const handleSignOut = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const isLoginScreen = location.pathname.startsWith(AppRoute.Login);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Root}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {!isLoginScreen && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">{userEmail}</span>
                        <span className="header__favorite-count">{favoritesCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#" onClick={handleSignOut}>
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header >
  );
}

const MemoizedHeader = memo(Header);
export default MemoizedHeader;
