import { Offers } from '../../types/offer';
import { useState, useCallback, useEffect } from 'react';
import PlaceCard from '@components/place-card/place-card';

type OfferListProps = {
  pageKeyWords: string;
  offers: Offers;
  onActiveOfferChange: (offerId: string | null) => void;
};

export default function OffersList({ pageKeyWords, offers, onActiveOfferChange }: OfferListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  useEffect(() => {
    onActiveOfferChange(activeOfferId);
  }, [activeOfferId, onActiveOfferChange]);

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
