import axios, { AxiosInstance }  from 'axios';
// @ts-ignore
import humbleLocalStorage from 'humble-localstorage';
class ApiCnx {

  public api:string = 'http://localhost:4000/';
  //api = 'http://187.217.205.58/ServerColegioPdc/api/';
  public Http:AxiosInstance =  axios.create({
      // baseURL: 'http://187.188.15.19:8082/telweb-factura-server/api/',
      timeout: 18000,
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Bearer ${'access_token'}`
      },
  });
 public changeApi(token: string){
    return axios.create({
      timeout: 18000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${ token }`}
    });
  }
}
export const Api = new ApiCnx();
