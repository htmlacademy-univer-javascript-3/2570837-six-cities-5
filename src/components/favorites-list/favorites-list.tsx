import { useMemo } from 'react';
import { Offers } from '../../types/offer.ts';
import { FavoriteCard } from '../favorite-card/favorite-card.tsx';

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

  return (
    <ul className="favorites__list">
      {Object.entries(groupedOffers).map(([city, cityOffers]) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
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
