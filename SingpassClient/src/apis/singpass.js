import Axios from "axios";

const api = Axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
  credentials: true,
})

class BaseAPI {
  static get(url, config = {}) {
    return api.get(url, config);
  }

  static post(url, data, config) {
    return api.post(url, data, config)
  }

  static put(url, data, config) {
    return api.put(url, data, config)
  }

  static delete(url, config) {
    return api.delete(url, config)
  }
};

export class SingpassAPI extends BaseAPI {
  static getEnv() {
    const url = '/getEnv';
    return this.get(url);
  }

  static generateCodeChallenge(data={}) {
    const url = '/generateCodeChallenge'

    return this.post(url, data)
  }

  static getPersonData(data) {
    const url = '/getPersonData'

    return this.post(url, data)
  }
};
