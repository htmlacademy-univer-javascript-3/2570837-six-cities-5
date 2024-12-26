import { useRef, useEffect, memo } from 'react';
import leaflet from 'leaflet';
import useMap from '@hooks/use-map';
import { Offers } from '../../types/offer';
import { DEFAULT_MARKER_ICON, CURRENT_MARKER_ICON } from '@const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  points: Offers;
  selectedPointId: string | null;
  height: number;
};

const defaultMarkerIcon = leaflet.icon({
  iconUrl: DEFAULT_MARKER_ICON,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentMarkerIcon = leaflet.icon({
  iconUrl: CURRENT_MARKER_ICON,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({ points, selectedPointId, height }: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, points[0].city);

  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      const bounds = leaflet.latLngBounds([]);

      points.forEach((point) => {
        const markerIcon = point.id === selectedPointId ? currentMarkerIcon : defaultMarkerIcon;

        const marker = leaflet
          .marker(
            {
              lat: point.location.latitude,
              lng: point.location.longitude,
            },
            {
              icon: markerIcon,
            }
          )
          .addTo(map);
        bounds.extend(marker.getLatLng());
      });

      if (points.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [map, points, selectedPointId]);


  return (
    <div
      style={{ height: `${height}px` }}
      ref={mapRef}
    >
    </div>
  );
}

export const MemoizedMap = memo(Map);
