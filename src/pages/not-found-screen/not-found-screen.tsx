import { AppRoute } from '@const';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './not-found-screen.css';

export default function NotFoundScreen(): JSX.Element {
  return (
    <section className="six-cities">
      <Helmet>
        <title>6 cities: page not found</title>
      </Helmet>

      <div>
        <h1>404 Not Found</h1>
        <Link to={AppRoute.Root} className="button-link">
          Go back to Main
        </Link>
      </div>
    </section>
  );
}
