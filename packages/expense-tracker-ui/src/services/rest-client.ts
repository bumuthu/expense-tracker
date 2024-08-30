
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

export class RestClient {

    private baseUrl: string;

    constructor() {
        this.baseUrl = `http://localhost:${process.env.BACKEND_PORT}`;

        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    private async request<T>(config: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios(config);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message || 'An error occurred';
        }
    }

    async get<T>(url: string, params?: Record<string, any>): Promise<T> {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.baseUrl}/${url}`,
            params,
        };
        return this.request<T>(config);
    }

    async post<T>(url: string, data: any): Promise<T> {
        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.baseUrl}/${url}`,
            data,
        };
        return this.request<T>(config);
    }

    async put<T>(url: string, data: any): Promise<T> {
        const config: AxiosRequestConfig = {
            method: 'put',
            url: `${this.baseUrl}/${url}`,
            data,
        };
        return this.request<T>(config);
    }

    async delete<T>(url: string): Promise<T> {
        const config: AxiosRequestConfig = {
            method: 'delete',
            url: `${this.baseUrl}/${url}`,
        };
        return this.request<T>(config);
    }
}
