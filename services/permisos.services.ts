import { api } from './Api'
import {RoutePath} from '~/interface/components/routePath/RoutePath';
import {API_NEST_URL} from '~/global.config';
import {Permission} from '~/interface/components/Rols/Permission';
class Permisos {

  Http= api.Http;
  api= api.api;

  async flatpermissions (idrol: any) {
    return await this.Http.get(this.api+'acceso/flatpermissions/' +idrol + '/rol');
  }

  async treepermits(idrol: any) {
    return await this.Http.get(this.api+'acceso/treepermits/' +idrol + '/rol');
  }

  async getPermisoSesion(idrol: any) {
    return await this.Http.get(this.api+'acceso/permisos');
  }

  async updatePermissionRole(data: any) {
    return await this.Http.post(this.api+'acceso/permisos/rol/updatepermissionrole',data);
  }

  async addPermissionRole(data: any): Promise<Permission> {
    return (await this.Http.post<Permission>(`${API_NEST_URL}system/permissions/assignpermissions`,data)).data;
  }

  async getPermissionFlat(id: number): Promise<any> {
    return (await this.Http.get(`${API_NEST_URL}system/permissions/assignpermissions/${id}`)).data;
  }

  async getPermissionTree(idrol:number): Promise<RoutePath[]> {
    return (await this.Http.get(`${API_NEST_URL}system/permissions/getpermission/${idrol}`)).data;
  }


}
export const permisos = new Permisos();
