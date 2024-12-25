import { useRef, useEffect, useMemo, memo } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '@hooks/use-map';
import { Offers } from '../../types/offer';
import { DEFAULT_MARKER_ICON, CURRENT_MARKER_ICON } from '@const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  points: Offers;
  selectedPointId: string | null;
  height: number;
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

function Map({ points, selectedPointId, height }: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, points[0].city);

  const markerLayer = useMemo(() => layerGroup(), []);

  useEffect(() => {
    if (map) {
      markerLayer.clearLayers();
      points.forEach((offer) => {
        if (offer && offer.location) {
          const marker = new Marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude
          });
          marker
            .setIcon(
              selectedPointId !== null && offer.id === selectedPointId
                ? currentMarkerIcon
                : defaultMarkerIcon
            )
            .addTo(markerLayer);
        }
      });

      markerLayer.addTo(map);
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, markerLayer, points, selectedPointId]);

  return (
    <div
      style={{ height: `${height}px` }}
      ref={mapRef}
    >
    </div>
  );
}

export const MemoizedMap = memo(Map);
