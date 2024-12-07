import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { Offer, Offers } from '../../types/offer';
import { DEFAULT_MARKER_ICON, CURRENT_MARKER_ICON } from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offers;
  selectedOffer: Offer | undefined;
  className: string;
};

const defaultMarkerIcon = new Icon({
  iconUrl: DEFAULT_MARKER_ICON,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentMarkerIcon = new Icon({
  iconUrl: CURRENT_MARKER_ICON,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export default function Map({ offers, selectedOffer, className }: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0].city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        if (offer && offer.location) {
          const marker = new Marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude
          });
          marker
            .setIcon(
              selectedOffer !== undefined && offer.id === selectedOffer.id
                ? currentMarkerIcon
                : defaultMarkerIcon
            )
            .addTo(markerLayer);
        }
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return <section className={className} style={{ height: '500px' }} ref={mapRef}></section>;
}
