import { api } from './Api'
class ServingService {
    public apiUrl = api.api;
    public async login(mail: string, password: string) {

        const auth = {
            email: mail,
            password,
            remember_me: false,
        };
        return await api.Http.post(this.apiUrl + 'auth/login', auth);
    }
}
export const Serving = new ServingService();

