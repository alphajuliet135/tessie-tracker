import { Box, Button, Heading, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import { SignOut } from '../auth/authContext';
import { LockIcon, RepeatIcon } from '@chakra-ui/icons';
import { TeslaScopeService } from '../api/teslaScopeService';
import CityPin from '../utils/cityPin';
import 'mapbox-gl/dist/mapbox-gl.css';

export const MapView = () => {
  const [data, setData] = useState<{
    lat: number;
    long: number;
  }>({
    lat: 10.00689635464326,
    long: 53.6002772277303,
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await TeslaScopeService.getData();

        setData({
          lat: data.response.vehicle.latitude,
          long: data.response.vehicle.longitude,
        });

        console.log(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <>
      <Box padding="8px">
        <HStack>
          <Heading size="md">Tessie Tracker v2 Alpha</Heading>
          <Button rightIcon={<RepeatIcon />}>Refresh Location</Button>
          <Button rightIcon={<LockIcon />} onClick={() => SignOut()}>
            Sign Out
          </Button>
        </HStack>
      </Box>
      <MapGL
        initialViewState={{
          latitude: 53.554682,
          longitude: 9.994892,
          zoom: 8,
        }}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        // TODO fix map token env
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      >
        <Marker latitude={data.lat} longitude={data.long}>
          <CityPin />
        </Marker>
      </MapGL>
    </>
  );
};
