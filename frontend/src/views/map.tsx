import { Box, Button, Heading, HStack, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import { SignOut } from '../auth/authContext';
import { LockIcon, RepeatIcon } from '@chakra-ui/icons';
import { TeslaScopeService } from '../api/teslaScopeService';
import CityPin from '../components/cityPin';
import 'mapbox-gl/dist/mapbox-gl.css';
import { DataCard } from '../components/dataCard';
import { TeslaScopeData } from '../models/teslaScopeDataModel';

export const MapView = () => {
  const [data, setData] = useState<TeslaScopeData>();
  const [clickCount, setClickCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const [viewport, setViewport] = useState({
    latitude: 53.554682,
    longitude: 9.994892,
    zoom: 8,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const receivedData = await TeslaScopeService.getData();

        setData(receivedData as TeslaScopeData);
        setLoading(false);

        setViewport({
          latitude: receivedData.response.vehicle.latitude,
          longitude: receivedData.response.vehicle.longitude,
          zoom: 8,
          bearing: 0,
          pitch: 0,
        });

        if (clickCount > 0) {
          toast({
            title: 'Tessie data succesfully refreshed.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (e) {
        setLoading(false);
        toast({
          title: 'Error while fetching data for Tessie.',
          description: 'Please try again or check the logs.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        console.error(e);
      }
    })();
  }, [clickCount]);

  return (
    <>
      <Box padding="8px">
        <HStack>
          <Heading size="md">Tessie Tracker v2 Beta</Heading>
          <Button rightIcon={<RepeatIcon />} onClick={() => setClickCount(clickCount + 1)}>
            Refresh Data
          </Button>
          <Button rightIcon={<LockIcon />} onClick={() => SignOut()}>
            Sign Out
          </Button>
        </HStack>
      </Box>
      <MapGL
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        // TODO fix map token env
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      >
        {data && (
          <>
            <Marker latitude={data.response.vehicle.latitude} longitude={data.response.vehicle.longitude}>
              <CityPin />
            </Marker>
            <DataCard data={data} loading={loading} />
          </>
        )}
      </MapGL>
    </>
  );
};
