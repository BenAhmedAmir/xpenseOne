import axios, { AxiosRequestConfig, AxiosError } from 'axios';

interface IHttpClientRequestParameters {
    url: string;
    accessToken?: string;
    payload?: any;
}

interface IHttpClient {
    get<T>(parameters: IHttpClientRequestParameters): Promise<T>
    post<T>(parameters: IHttpClientRequestParameters): Promise<T>
    patch<T>(parameters: IHttpClientRequestParameters): Promise<T>
    put<T>(parameters: IHttpClientRequestParameters): Promise<T>
    uploadFile<T>(parameters: IHttpClientRequestParameters): Promise<T>
}

export class HttpClient implements IHttpClient {
    get<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            // extract the individual parameters
            const { url, accessToken } = parameters
            // axios request options like headers etc
            const options: AxiosRequestConfig = {
                headers: {
                    contentType : 'application/json'
                }
            }
            // if API endpoint requires a token, we'll need to add a way to add this.
            if (accessToken) {
                options.headers.authorization =  `Bearer ${accessToken}`;
            }
            axios
                .get(url, options)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })

        })
    }
    post<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url, payload, accessToken } = parameters
            // axios request options like headers etc
            const options: AxiosRequestConfig = {
                headers: {
                    contentType : 'application/json'
                }
            }
            // if API endpoint requires a token, we'll need to add a way to add this.
            if (accessToken) {
                options.headers.authorization =  `Bearer ${accessToken}`;
            }
            axios
                .post(url, payload, options)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    }

    patch<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url, payload, accessToken } = parameters
            // axios request options like headers etc
            const options: AxiosRequestConfig = {
                headers: {
                    contentType : 'application/json'
                }
            }
            // if API endpoint requires a token, we'll need to add a way to add this.
            if (accessToken) {
                options.headers.authorization =  `Bearer ${accessToken}`;
            }
            axios
                .patch(url, payload, options)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    }
    put<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url, payload, accessToken } = parameters
            // axios request options like headers etc
            const options: AxiosRequestConfig = {
                headers: {
                    contentType: 'application/json'
                }
            }
            // if API endpoint requires a token, we'll need to add a way to add this.
            if (accessToken) {
                options.headers.authorization = `Bearer ${accessToken}`;
            }
            axios
                .put(url, payload, options)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    }
    uploadFile<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url, payload, accessToken/*, onUploadProgress*/ } = parameters
            // axios request options like headers etc
            const options: AxiosRequestConfig = {
                headers: {
                    contentType: 'multipart/form-data'
                }
            }
            // if API endpoint requires a token, we'll need to add a way to add this.
            if (accessToken) {
                options.headers.authorization = `Bearer ${accessToken}`;
            }
            axios
                .post(url, payload, options)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    }
}

export default new HttpClient();