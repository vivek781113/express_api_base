import HttpClient from "./http-client";
import User from '../dto/user';
import { Order } from "../dto/order";


class ShiprocketApi extends HttpClient {
    public constructor() {
        super('https://apiv2.shiprocket.in/v1/external');

    }

    public login = (user: User) => this.instance.post<{ token: string }>('/auth/login', user);
    public createOrder = (order: Order) => this.instance.post('orders/create/adhoc', order);
}


export default new ShiprocketApi();