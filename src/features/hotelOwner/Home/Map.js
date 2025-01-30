import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: 28.6139, // Example latitude
    lng: 77.209,  // Example longitude
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAxOhPTXy4Vf-_XXhVUIIRfSt8bIUE6j_Y">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
