import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Progress,
  Spinner,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { TeslaScopeData } from '../models/teslaScopeDataModel';

export const DataCard = ({ data }: { data: TeslaScopeData }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button margin="10px">Tessie 2 Data</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Heading size="lg">Tessie 2</Heading>
        </PopoverHeader>
        <PopoverBody>
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
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
