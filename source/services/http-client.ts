import axios, { AxiosInstance, AxiosResponse } from 'axios';

declare module 'axios' {
    interface AxiosResponse<T = any> extends Promise<T> { }
}

abstract class HttpClient {
    protected readonly instance: AxiosInstance;

    public constructor(baseURL: string, token?: string | null) {
        this.instance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : ''
            }
        });
        this._initializeResponseInterceptor();
    }

    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
    };

    private _handleResponse = ({ data }: AxiosResponse) => data;

    protected _handleError = (error: any) => Promise.reject(error);
}

export default HttpClient;