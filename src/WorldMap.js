import { geoMercator, geoPath } from 'd3-geo';
import React from 'react';
import './App.css';
import worlddata from './world'; // geojson

const WorldMap = () => {
  const projection = geoMercator();
  const path = geoPath().projection(projection);
  const countries = worlddata.features.map((d, i) => (
    <path key={`path${i}`} d={path(d)} className="countries" />
  ));

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={500} height={500}>
      {countries}
    </svg>
  );
};

export default WorldMap;
