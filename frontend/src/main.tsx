import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes } from 'react-router';
import { BrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, SignOut } from './auth/authContext';
import { Login } from './views/login';
import { MapView } from './views/map';
import { Register } from './views/register';
import theme from './theme';

const container = document.getElementById('root')!;

const PrivateRoutes = () => {
  const signInTimeString = localStorage.getItem('signInTime');

  if (!localStorage.getItem('authToken')) return <Navigate to="/" replace />;
  if (!signInTimeString) {
    return <Navigate to="/" replace />;
  } else {
    const signInTime = new Date(signInTimeString);
    const signInExpiryTime = signInTime.setHours(signInTime.getHours() + 3);

    if (signInExpiryTime > Date.now()) {
      SignOut();
      <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

// Create a root.
const root = ReactDOM.createRoot(container);

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
