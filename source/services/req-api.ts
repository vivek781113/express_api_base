import HttpClient from './http-client';
import User from '../dto/user';

class ReqApi extends HttpClient {
    public constructor() {
        super('https://reqres.in/api');
    }

    public login = (user: User) => this.instance.post<{ 'token': string }>('/login', user);

    public getUser = (id: string) => this.instance.get<User>(`/users/${id}`);
}

export default new ReqApi;