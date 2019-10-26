import axios, { AxiosInstance } from 'axios';
import {AuthInterface} from "~/interface/auth.interface";
class Api {
    public api: string = 'http://localhost:4000/';
    public Http: AxiosInstance = axios.create({
        // baseURL: 'http://187.188.15.19:8082/telweb-factura-server/api/',
        timeout: 18000,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            //'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
    });

    public changeApi(token: string) {
        this.Http.defaults.headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `Bearer ${token}`,
        };
        return this.Http;
    }

    public parseJwt(token: string) {
       // console.log(token.split('.'))
        let base64Url = token.split('.')[1];
        let _ak = decodeURIComponent(atob(token.split('.')[0]).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        let _akus = decodeURIComponent(atob(base64Url).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        let parse: AuthInterface = JSON.parse(_akus);
            parse.data = typeof parse.data==='string' ? JSON.parse(parse.data) : parse.data;
            parse.token = token.split('.');
        return parse;
    };
}
export const api = new Api();
