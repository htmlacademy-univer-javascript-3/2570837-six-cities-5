import { Helmet } from 'react-helmet-async';
import Header from '@components/header/header';
import OfferList from '@components/offer-list/offer-list';
import { MemoizedMap } from '@components/map/map';
import { useState, useMemo, useCallback } from 'react';
import CitiesList from '@components/cities-list/cities-list';
import { Cities, SortOptions } from '@const';
import { useAppSelector, useAppDispatch } from '@hooks/index';
import SortingOptions from '@components/sorting-options/sorting-options.tsx';
import { setSortOption } from '@store/action.ts';
import MainEmpty from '@pages/empty-main-screen/empty-main-screen';
import { Point } from '../../types/offer';

function getPlacesText(count: number): string {
  if (count === 1) {
    return 'place';
  } else {
    return 'places';
  }
}

export default function MainScreen(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const offers = useAppSelector((state) => state.offersList);
  const city = useAppSelector((state) => state.city);
  const sortOption = useAppSelector((state) => state.sortOption);
  const dispatch = useAppDispatch();

  const { filteredOffers, sortedOffers, points } = useMemo(() => {
    const filtered = offers.filter((offer) => offer.city.name === city);

    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'Price: low to high':
          return a.price - b.price;
        case 'Price: high to low':
          return b.price - a.price;
        case 'Top rated first':
          return b.starsCount - a.starsCount;
        default:
          return 0;
      }
    });

    const mapPoints: Point[] = sorted.map((offer) => ({
      id: offer.id,
      city: offer.city,
      location: offer.location,
    }));

    return { filteredOffers: filtered, sortedOffers: sorted, points: mapPoints };
  }, [offers, city, sortOption]);

  const handleSortChange = useCallback((option: SortOptions) => {
    dispatch(setSortOption(option));
  }, [dispatch]);


  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />

      <main className={`page__main page__main--index ${offers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={Cities} />
          </section>
        </div>
        <div className="cities">
          {offers.length > 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{getPlacesText(filteredOffers.length)} to stay in {city}</b>
                <SortingOptions
                  onSortChange={handleSortChange}
                />
                <OfferList
                  offers={sortedOffers}
                  onActiveOfferChange={setActiveOfferId}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map" data-testid={'map'}>
                  <MemoizedMap
                    points={points}
                    selectedPointId={activeOfferId}
                    height={700}
                  />
                </section>
              </div>
            </div>
          ) :
            <MainEmpty city={city} />}
        </div>
      </main>
    </div>
  );
}
