import { Helmet } from 'react-helmet-async';
import Header from '@components/header/header';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { useCallback, useEffect, useState } from 'react';
import { fetchOffersAction, loginAction } from '@store/api-actions';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, CITIES } from '@const';
import { getAuthorizationStatus } from '@store/user-info/selector';
import { toast } from 'react-toastify';
import { changeCity } from '@store/app-data/app-data';

const validatePassword = (password: string): boolean => {
  const hasSpaces = password.includes(' ');
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigit = /\d/.test(password);

  return !hasSpaces && hasLetter && hasDigit;
};

export default function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleCityClick = useCallback(() => {
    const amsterdamCity = CITIES.find((city) => city === 'Amsterdam');
    if (amsterdamCity) {
      dispatch(changeCity(amsterdamCity));
      navigate(AppRoute.Root);
    }
  }, [dispatch, navigate]);


  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [authorizationStatus, navigate]);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!validatePassword(password)) {
      toast.warn('Password must contain at least one English letter, one number and no spaces');
      return;
    }

    dispatch(loginAction({ email: email, password })).then(() => {
      dispatch(changeCity(CITIES[0]));
      dispatch(fetchOffersAction());
      navigate(AppRoute.Root);
    });
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email"
                  value={email} onChange={(e) => setEmail(e.target.value)} required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password"
                  value={password} onChange={(e) => setPassword(e.target.value)} required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" onClick={handleCityClick} to={AppRoute.Root}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
