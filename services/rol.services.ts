import {Api} from './api.service'
class RolService {


  async getRols(){
    return await Api.Http.get(Api.api + 'rol');
  }
}
export  const rolService = new RolService();
