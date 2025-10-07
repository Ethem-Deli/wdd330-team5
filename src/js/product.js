import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData(); // to use your ProductData
//  get id from URL parameter
const productId = getParam("productId");
const dataSource = new ExternalServices("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();
