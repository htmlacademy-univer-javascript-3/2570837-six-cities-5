import { useMemo, useCallback } from 'react';
import { Offers } from '../../types/offer.ts';
import { FavoriteCard } from '../favorite-card/favorite-card.tsx';
import { Link } from 'react-router-dom';
import { AppRoute } from '@const';
import { changeCity } from '@store/app-data/app-data';
import { useAppDispatch } from '../../hooks';

type FavoritesListProps = {
  offers: Offers;
}

export function FavoritesList({ offers }: FavoritesListProps) {
  const groupedOffers = useMemo(() => offers.reduce((acc, offer) => {
    const cityName = offer.city.name;

    if (!acc[cityName]) {
      acc[cityName] = [];
    }

    acc[cityName].push(offer);

    return acc;
  }, {} as Record<string, Offers>), [offers]);

  const dispatch = useAppDispatch();

  const handleCityClick = useCallback((city: string) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  return (
    <ul className="favorites__list">
      {Object.entries(groupedOffers).map(([city, cityOffers]) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Root}
                onClick={() => handleCityClick(city)}
              >
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className={'favorites__places'}>
            {cityOffers.map((offer) => (
              <FavoriteCard
                offer={offer}
                key={offer.id}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
