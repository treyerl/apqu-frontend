import axios from "axios";

axios.defaults.baseURL = "http://localhost:18080";

export enum Mode {
  show, edit, new
}

export interface Hero {
  uuid: string|null;
  name: string;
  superpower: string;
  realname: string;
  aka: string;
}

class Client {
  async getHeroes(): Promise<Array<Hero>> {
    let r = await axios.get<Array<Hero>>('/api/heroes.json');
    return r.data;
  }

  async getHero(uuid: string): Promise<Hero> {
    let r = await axios.get<Hero>(`/api/heroes/${uuid}.json`)
    return r.data;
  }

  async createHero(hero: Hero): Promise<Hero> {
   let r = await axios.post<Hero>('/api/heroes', hero)
   return r.data;
  }

  async deleteHero(hero: Hero): Promise<void> {
    await axios.delete(`/api/heroes/${hero.uuid}`);
  }

  async updateHero(hero: Hero): Promise<void> {
    await axios.put(`/api/heroes/${hero.uuid}`, hero);
  }
}

export const client = new Client();