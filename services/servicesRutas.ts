import { api } from './Api'
import {RoutePath} from '~/interface/components/routePath/RoutePath';
import {API_NEST_URL} from '~/global.config';
class ApiRutas {

  Http= api.Http;
  api= api.api;

  public async getRoutes(): Promise<RoutePath[]> {
    return (await this.Http.get<RoutePath[]>(`${API_NEST_URL}routes/roots`)).data;
  }

  public async addRoute(route: RoutePath): Promise<RoutePath> {
    return (await this.Http.post<RoutePath>(`${API_NEST_URL}routes`,route)).data;
  }
  public async updateRoute(route: RoutePath): Promise<RoutePath> {
    return (await this.Http.patch<RoutePath>(`${API_NEST_URL}routes/${route.id}`,route)).data;
  }
  async getRutas () {
    return await this.Http.get(this.api+'acceso/rutas');
  }

}
export const servicesRutas = new ApiRutas();
