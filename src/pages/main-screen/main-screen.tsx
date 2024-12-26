import { Helmet } from 'react-helmet-async';
import Header from '@components/header/header';
import OfferList from '@components/offers-list/offers-list';
import { MemoizedMap } from '@components/map/map';
import { useState, useMemo } from 'react';
import CitiesList from '@components/cities-list/cities-list';
import { SortOptions } from '@const';
import { useAppSelector } from '@hooks/index';
import SortingOptions from '@components/sorting-options/sorting-options.tsx';
import { getOffers } from '@store/offers-data/selector';
import { getCity, getSortOption } from '@store/app-data/selector';
import EmptyCitiesList from '@components/empty-cities-list/empty-cities-list';

function getPlacesText(count: number): string {
  if (count === 1) {
    return `${count} place`;
  } else {
    return `${count} places`;
  }
}

export default function MainScreen(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);
  const sortOption = useAppSelector(getSortOption);
  const sortedOffers = useMemo(() => {
    const filtered = offers.filter((offer) => offer.city.name === city);
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case SortOptions.PriceLowToHigh:
          return a.price - b.price;
        case SortOptions.PriceHighToLow:
          return b.price - a.price;
        case SortOptions.TopRated:
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [offers, city, sortOption]);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />

      <main className={`page__main page__main--index ${sortedOffers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {sortedOffers.length > 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{getPlacesText(sortedOffers.length)} to stay in {city}</b>
                <SortingOptions />
                <OfferList
                  offers={sortedOffers}
                  onActiveOfferChange={setActiveOfferId}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map" data-testid={'map'}>
                  <MemoizedMap
                    points={sortedOffers}
                    selectedPointId={activeOfferId}
                    height={700}
                  />
                </section>
              </div>
            </div>
          ) :
            <EmptyCitiesList city={city} />}
        </div>
      </main>
    </div>
  );
}
