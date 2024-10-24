import { productsModel } from "../models/products.js";

export default class Products {
  constructor() {}

  getAll = async () => {
    const products = await productsModel.find();
    return products.map((product) => product.toObject());
  };

  saveProducts = async (product, photoRoute) => {
    try {
      product.photo = photoRoute;
      const result = await productsModel.create(product);
      return result;
    } catch (error) {
      throw error;
    }
  };

  paginate = async (filter, options) => {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const totalDocs = await productsModel.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / limit);
    const docs = await productsModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(options.sort);

    return {
      docs: docs.map((doc) => doc.toObject()),
      totalPages,
      page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
    };
  };
}
