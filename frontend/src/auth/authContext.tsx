import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children?: ReactNode;
};

type AuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
};

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},
};

const AuthContext = createContext<AuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [authenticated, setAuthenticated] = useState(initialValue.authenticated);

  return <AuthContext.Provider value={{ authenticated, setAuthenticated }}>{children}</AuthContext.Provider>;
};

const SignOut = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('permission_group');
  localStorage.removeItem('signInTime');

  window.location.reload();
};

export { AuthContext, AuthProvider, SignOut };
