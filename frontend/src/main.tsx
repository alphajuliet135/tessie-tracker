import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes } from 'react-router';
import { BrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { AuthContext, AuthProvider } from './auth/authContext';
import { Login } from './views/login';
import { MapView } from './views/map';
import { Register } from './views/register';

const container = document.getElementById('root')!;

const PrivateRoutes = () => {
  // const { authenticated } = useContext(AuthContext);

  // if (!authenticated)

  if (!localStorage.getItem('authToken')) return <Navigate to="/" replace />;

  return <Outlet />;
};

// Create a root.
const root = ReactDOM.createRoot(container);

const theme = extendTheme({
  semanticTokens: {
    colors: {
      error: 'red.500',
      success: 'green.500',
      primary: {
        default: 'red.500',
        _dark: 'red.400',
      },
      secondary: {
        default: 'red.800',
        _dark: 'red.700',
      },
    },
  },
});

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/map" element={<MapView />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
