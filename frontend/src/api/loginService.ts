import { useToast } from '@chakra-ui/react';

export class AuthService {
  static async login(credentials: { email: string; password: string }): Promise<boolean> {
    try {
      let apiResponse = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      //TODO add ajv type security
      const body = await apiResponse.json();

      localStorage.setItem('authToken', body.authToken);
      localStorage.setItem('permission_group', body.permission_group);
      localStorage.setItem('signInTime', `${Date.now()}`);

      return true;
    } catch (error) {
      throw error;
    }
  }

  static async register(credentials: { email: string; password: string; name: string; token: string }): Promise<boolean> {
    try {
      let apiResponse = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (apiResponse.ok) {
        return true;
      } else {
        throw apiResponse.status;
      }
    } catch (error) {
      throw error;
    }
  }
}
