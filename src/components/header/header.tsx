import { Link } from 'react-router-dom';
import { AppRoute } from '@const';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { logoutAction, } from '@store/api-actions';
import { memo } from 'react';
import { getUserInfo, getFavoriteOffersCount } from '@store/user-info/selector';


function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(getUserInfo);
  const favoriteOffersCount = useAppSelector(getFavoriteOffersCount);
  const isLoginScreen = location.pathname.startsWith(AppRoute.Login);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {!isLoginScreen && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  {userInfo ?
                    <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img className="user__avatar" src={userInfo.avatarUrl} alt="avatar" />
                      </div>
                      <span className="header__user-name user__name">{userInfo.email}</span>
                      <span className="header__favorite-count">{favoriteOffersCount}</span>
                    </Link>
                    :
                    <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>}
                </li>
                {userInfo &&
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to={AppRoute.Root}
                      onClick={(evt) => {
                        evt.preventDefault();
                        dispatch(logoutAction());
                      }}
                    >
                      <span className="header__signout">Log out</span>
                    </Link>
                  </li>}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

const MemoizedHeader = memo(Header);
export default MemoizedHeader;
