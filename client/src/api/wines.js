const axios = require("axios");
export class Wines {
  constructor(baseURL) {
    //baseUrl could be overwritten in the route that uses the API
    const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
    this.baseURL = `${baseUrl}/wines`;
    this.api = axios.create({
      baseURL: this.baseURL,
    });
  }

  // // CHANGE THE PATHS ACCORDING TO API DOCUMENTATION
  getAll() {
    return this.api.get("/all-wine");
  }
  getOne(id) {
    return this.api.get(`/wine/${id}`);
  }
  topWines() {
    return this.api.get(`/top-wine`);
  }
  search(query, page) {
    return this.api.get(`/search/?q=${query}&page=${page}`);
  }
  createOne(newEntityValues) {
    return this.api.post("/create-wine", newEntityValues);
  }
  // deleteOne = (id)=> this.api.delete(`/${id}`)
  // updateOne = (id)=> this.api.put(`/${id}`)
  // // etc...
}

export default Wines;
