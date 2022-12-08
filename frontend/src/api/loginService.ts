export class LoginService {
  static login(credentials: { email: string; password: string }) {
    console.log(credentials);
  }
}
