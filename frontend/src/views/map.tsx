import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import { SignOut } from '../auth/authContext';

export const MapView = () => {
  return (
    <>
      <MapGL
        initialViewState={{
          latitude: 53.554682,
          longitude: 9.994892,
          zoom: 8,
        }}
        style={{ width: '100vw', height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        // TODO fix map token env
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
      <Button onClick={() => SignOut()}>Sign Out</Button>
    </>
  );
};
