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
  constructor(category) {
    this.category = category;
    // Always served from /json/... because it's inside public/
    this.path = `/json/${this.category}.json`;
  }

  async getData() {
    try {
      const data = await fetch(this.path).then(convertToJson);
      return data;
    } catch (err) {
      console.error("Error loading data:", err);
      return [];
    }
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
