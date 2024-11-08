import { Offers } from '../../types/offer';
import { useState, useCallback } from 'react';
import PlaceCard from '@components/place-card/place-card';
import { FullOffers } from 'src/types/fullOffer';

type OfferListProps = {
  offers: Offers | FullOffers;
};

export default function OffersList({ offers }: OfferListProps): JSX.Element {
  const [ , setActiveOfferId] = useState<string | null>(null);

  const handleMouseEnter = useCallback((offerId: string) => {
    setActiveOfferId(offerId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveOfferId(null);
  }, []);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          card={offer}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}
