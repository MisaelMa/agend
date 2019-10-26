import axios from 'axios';
// @ts-ignore
import {Api} from './api.service'
import {CreateUserDTO} from '~/pages/user/interface/CreateUserDTO.interface';
class UserService {


  public async getUser(){
   return await Api.Http.get(Api.api + 'user');
  }
  public async createUser(user: CreateUserDTO) {
      return await Api.Http.post(Api.api + 'user',user);
  }
}
export  const userService = new UserService();
