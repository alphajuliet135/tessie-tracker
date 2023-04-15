import { Box, Card, CardBody, CardHeader, Divider, HStack, Heading, Progress, Spinner, Stack, StackDivider, Text } from '@chakra-ui/react';
import { TeslaScopeData } from '../models/teslaScopeDataModel';

export const DataCard = ({ data, loading }: { data: TeslaScopeData; loading: boolean }) => {
  return (
    <Card maxW="sm" backgroundColor="white" margin="3">
      <CardBody>
        <HStack>
          <Box>
            <Heading size="lg">Tessie 2</Heading>
          </Box>
          <Box>{loading && <Spinner thickness="2px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="md" />}</Box>
        </HStack>
      </CardBody>
      <Divider />
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Battery Level
            </Heading>

            <Text pt="2" fontSize="sm">
              <Progress
                hasStripe={data.response.battery?.charging_state === 'Charging'}
                colorScheme="green"
                value={data.response.battery?.level}
              />
              <div>
                {data.response.battery?.level}% - {data.response.battery?.charging_state}
              </div>
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Odometer
            </Heading>
            <Text pt="2" fontSize="sm">
              {((data.response.odometer || 0) * 1.6).toFixed(2)} KMs
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Temparature
            </Heading>
            <Text pt="2" fontSize="sm">
              Inside {(((data.response.climate?.inside || 0) - 32) / 1.8).toFixed(1)}℃ | Outside{' '}
              {(((data.response.climate?.outside || 0) - 32) / 1.8).toFixed(1)}℃
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
