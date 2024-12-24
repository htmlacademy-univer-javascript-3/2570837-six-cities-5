import { Offers } from '../../types/offer';
import { useState, useCallback, useEffect, memo } from 'react';
import PlaceCard from '@components/place-card/place-card';

type OfferListProps = {
  offers: Offers;
  onActiveOfferChange: (offerId: string | null) => void;
  parentOfferId?: string;
};

function OffersList({ offers, onActiveOfferChange, parentOfferId = undefined }: OfferListProps): JSX.Element {
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

  const containerName = parentOfferId ? 'near-places__list places__list' : 'cities__places-list places__list tabs__content';

  return (
    <div className={containerName}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          card={offer}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
          parentOfferId={parentOfferId}
        />
      ))}
    </div>
  );
}

const MemoizedOffersList = memo(OffersList);
export default MemoizedOffersList;
