import { Offers } from '../../types/offer';
import { useState, useCallback } from 'react';
import PlaceCard from '@components/place-card/place-card';

type OfferListProps = {
  pageKeyWords: string;
  offers: Offers;
};

export default function OffersList({ pageKeyWords, offers }: OfferListProps): JSX.Element {
  const [ , setActiveOfferId] = useState<string | null>(null);

  const handleMouseEnter = useCallback((offerId: string) => {
    setActiveOfferId(offerId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveOfferId(null);
  }, []);

  return (
    <div className={`${pageKeyWords}__places-list places__list tabs__content`}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          pageKeyWords={pageKeyWords}
          card={offer}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}
