import axios, {AxiosInstance} from 'axios';
import humbleLocalStorage from 'humble-localstorage';
import {API_BASE_URL, API_NEST_URL} from '@/global.config';

class ApiCnx {

    api: string = API_BASE_URL;
    api_nest: string = API_NEST_URL;
    Http: AxiosInstance = axios.create({
        timeout: 50000,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `Bearer ${humbleLocalStorage.getItem('token')}`
        },
    });

    changeApi(token: string) {
        this.Http.defaults.headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `Bearer ${token}`
        };
        return this.Http;
    }
}

export const Api = new ApiCnx();
