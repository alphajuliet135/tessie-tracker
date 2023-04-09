export class TeslaScopeService {
  static async getData() {
    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        throw 'No Auth Token found';
      }

      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}/data/get`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: authToken,
        },
      });

      //TODO add ajv type security
      const body = await apiResponse.json();

      return body;
    } catch (error) {
      throw error;
    }
  }
}
