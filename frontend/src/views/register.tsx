import { EditIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Center,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Divider,
  CardFooter,
  ButtonGroup,
  useToast,
  useColorMode,
  Badge,
  Tag,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AuthService } from '../api/loginService';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  // TODO add correct check for empty fields
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const [token, setToken] = useState<string>();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const navigate = useNavigate();

  const register = async () => {
    try {
      setIsLoading(true);

      console.log(email, password, name, token);

      // TODO replace with better react forms logic to validate
      if (!email || !password || !name || !token) {
        throw 'Empty fields on form';
      }

      await AuthService.register({
        email,
        password,
        name,
        token,
      });

      toast({
        title: 'Sucessfully created user!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/');
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast({
        title: `Unable to register user due to the following error: ${error}`,
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <Center h="100vh">
      <Card minW="sm">
        <CardHeader>
          <Center>
            <Heading size="lg">
              Tessie Tracker{' '}
              <Badge ml="1" fontSize="0.8em" colorScheme="blue">
                v2
              </Badge>
              <Badge ml="1" fontSize="0.8em" colorScheme="green">
                Beta
              </Badge>
            </Heading>
          </Center>
          <Center marginTop="10px">
            <Tag size="lg" borderRadius="full" variant="solid" colorScheme="green">
              Register
            </Tag>
          </Center>
        </CardHeader>
        <CardBody>
          <Stack spacing={3}>
            <Input placeholder="E-Mail" onChange={(event) => setEmail(event.target.value)} />
            <Input placeholder="Name" onChange={(event) => setName(event.target.value)} />
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Input placeholder="Register Token" onChange={(event) => setToken(event.target.value)} />
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button isLoading={isLoading} leftIcon={<EditIcon />} variant="solid" colorScheme="red" onClick={() => register()}>
              Register
            </Button>
            <Button variant="ghost" colorScheme="red" onClick={() => window.open('/', '_self')}>
              Login
            </Button>
            <Button variant="ghost" onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Center>
  );
};
