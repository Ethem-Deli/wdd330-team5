const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad response: ${res.status} ${res.statusText}`);
  }
}

// Base URL for server - can be changed in the .env file
const baseURL = import.meta.env.VITE_SERVER_URL; //from .env file

// Class to handle fetching product data
export default class ProductData {
  constructor() {
    // Always served from /json/... because it's inside public/
    // this.path = `/json/${this.category}.json`;
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category} `);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const product = await convertToJson(response);
    return product.Result;
  }
}
