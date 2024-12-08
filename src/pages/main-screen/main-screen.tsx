import { Helmet } from 'react-helmet-async';
import Header from '@components/header/header';
import OfferList from '@components/offer-list/offer-list';
import Map from '@components/map/map';
import { useState, useMemo } from 'react';
import CitiesList from '@components/cities-list/cities-list';
import { Cities, SortOptions } from '@const';
import { useAppSelector, useAppDispatch } from '@hooks/index';
import SortingOptions from '@components/sorting-options/sorting-options.tsx';
import { setSortOption } from '@store/action.ts';


export default function MainScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offersList);
  const city = useAppSelector((state) => state.city);
  const sortOption = useAppSelector((state) => state.sortOption);
  const dispatch = useAppDispatch();
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const currentCityOffers = useMemo(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city);
    return [...filteredOffers].sort((a, b) => {
      switch (sortOption) {
        case SortOptions.PriceLowToHigh:
          return a.price - b.price;
        case SortOptions.PriceHighToLow:
          return b.price - a.price;
        case SortOptions.TopRated:
          return b.starsCount - a.starsCount;
        default:
          return 0;
      }
    });
  }, [city, offers, sortOption]);

  const selectedOffer = useMemo(() => offers.find((offer) => offer.id === activeOfferId), [activeOfferId, offers]);

  const handleSortChange = (option: SortOptions) => {
    dispatch(setSortOption(option));
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />

      <main className={`page__main page__main--index ${currentCityOffers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={Cities} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${currentCityOffers.length} places to stay in ${city}`}</b>
              <SortingOptions
                onSortChange={handleSortChange}
              />
              <OfferList
                pageKeyWords={'cities__places'}
                offers={currentCityOffers}
                onActiveOfferChange={setActiveOfferId}
              />
            </section>
            <div className="cities__right-section">
              <Map
                offers={currentCityOffers}
                selectedOffer={selectedOffer}
                className="cities__map map"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
