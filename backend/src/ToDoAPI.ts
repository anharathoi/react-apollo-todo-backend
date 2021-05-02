import { RESTDataSource } from "apollo-datasource-rest";

export class ToDoAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000/";
  }

  async getAllItems() {
    return this.get("items");
  }

  async getItem(id: number) {
    return await this.get(`items/${id}`);
  }

  async addItem(id: number, title: string, done = false) {
    return await this.post(`items`, {
      id: id,
      title: title,
      done: done,
    });
  }
}

const api = new ToDoAPI();
