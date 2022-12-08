import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Divider,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { LoginService } from '../api/loginService';

export const Login = () => {
  const [loginResponse, setLoginResponse] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  loginResponse;

  return (
    <Center h="100vh">
      <Card minW="sm">
        <CardHeader>
          <Heading size="lg">Tessie Tracker V2 - Login</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={3}>
            <Input isInvalid={!email} placeholder="E-Mail" onChange={(event) => setEmail(event.target.value)} />
            <InputGroup size="md">
              <Input
                isInvalid={!password}
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
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => {
                if (!!email && !!password) {
                  LoginService.login({
                    email,
                    password,
                  });
                } else {
                  console.error('Credentials empty');
                }
              }}
            >
              Login
            </Button>
            <Button variant="ghost" colorScheme="blue" disabled>
              Signup
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Center>
  );
};
