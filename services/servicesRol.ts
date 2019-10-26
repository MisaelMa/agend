import {api} from './Api';
import {RoutePath} from '~/interface/components/routePath/RoutePath';
import {API_NEST_URL} from '~/global.config';
import {Rols} from '~/interface/components/Rols/Rols';

class ApiRol {

    Http = api.Http;
    api = api.api;

    /******###LARAVEL OLD###******/
    async getRoles() {
        return await this.Http.get(this.api + 'acceso/rol');
    }

    async getRole(id: any) {
        return await this.Http.get(this.api + 'acceso/rol/' + id);
    }

    async addRol(data: any) {
        return await this.Http.post(this.api + 'acceso/rol', data);
    }

    async updateRol(data: any) {
        return await this.Http.put(this.api + 'acceso/rol/' + data.id, data);
    }

    async removeRol(id: any) {
        return await this.Http.delete(this.api + 'acceso/rol/' + id);
    }

    /******###NEST JS MIGRATION###******/
    public  async getRols():Promise<Rols[]> {
        return (await this.Http.get<Rols[]>(`${API_NEST_URL}system/roles`)).data;
    }

    public  async addRole(rol: Rols):Promise<Rols[]> {
        return (await this.Http.post<Rols[]>(`${API_NEST_URL}system/roles`,rol)).data;
    }
    public  async updateRole(rol: Rols):Promise<Rols[]> {
        return (await this.Http.patch<Rols[]>(`${API_NEST_URL}system/roles/${rol.id}`,rol)).data;
    }

}

export const servicesRol = new ApiRol();
