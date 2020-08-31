import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/fruits",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  async getProducts() {
    const response = await API.get("/");
    return response.data;
  },
  async addFruit(newFruit) {
    const response = await API.post("/", newFruit);
    return response.data;
  },
  async deleteFruit(fruitId) {
    const response = await API.delete(`/${fruitId}`);
    return response.data;
  }
};
