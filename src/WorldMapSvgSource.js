import { geoMercator, geoPath } from 'd3-geo';
import React from 'react';
import './App.css';
import worlddata from './world'; // geojson

export const WorldMapImageSrc = () => {
  const projection = geoMercator();
  const path = geoPath().projection(projection);
  const countries = worlddata.features.map((d, i) => (
    <path key={`path${i}`} d={path(d)} className="countries" />
  ));
  return (
    'data:image/svg+xml;base64,' +
    window.btoa(
      `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /></svg>`
    )
  );
};
