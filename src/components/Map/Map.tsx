import MapClient from './MapClient';

interface MapProps {
  /** Address or query used to locate the point on the map. */
  query: string;
  /** Accessible label for the map element */
  label?: string;
}

export default async function Map({ query, label }: MapProps) {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'casamento-site/1.0',
    },
    // don't cache to ensure coordinates are fresh and to honor Nominatim policy
    next: { revalidate: 60 * 60 * 24 },
  });

  const data: { lat: string; lon: string }[] = await res.json();

  if (!data || !data[0]) return null;

  const position: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  const directionUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedQuery}`;

  return <MapClient position={position} label={label || query} directionUrl={directionUrl} />;
}
