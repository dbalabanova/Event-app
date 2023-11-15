import axios from 'axios';
import conf from 'services/config';

class Api {
  url(addUrl: string) {
    return conf.baseUrl + addUrl + `?apikey=${conf.apikey}`;
  }
  get(url: string, params: Record<string, string> | null = null) {
    return axios({
      method: 'GET',
      url: this.url(url),
      params,
    });
  }
}

const api = new Api();
export default api;
