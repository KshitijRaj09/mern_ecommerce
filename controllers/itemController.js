const Item = require('../models/Item');
const {
  product_deleted,
  product_updated,
  product_added,
  server_error,
} = require('../constants/constantMsg');

const pageSize = 3;
//To get all the Products
const getProduct = async (req, res) => {
  const { term, pageNumber } = req.query;
  console.log(term, pageNumber, 'getProduct');
  const findItem = term ? { productName: new RegExp('^' + term, 'i') } : {};
  const products = await Item.find(findItem).limit(3);
  const totalDocuments = await Item.countDocuments(findItem);
  console.log({ totalDocuments });
  let hasMoreData = Math.ceil(totalDocuments - pageSize * pageNumber);
  hasMoreData = hasMoreData < 1 ? false : true;
  if (products.length < 1) {
    return res.status(404).json({
      message: 'Product Not Found',
    });
  }
  return res.json({
    products,
    message: 'items fetched',
    hasMoreData,
  });
};

const searchProduct = async (req, res) => {
  const term = req.query.term;
  const findItem = term ? { productName: new RegExp('^' + term, 'i') } : {};
  const products = await Item.find(findItem).sort({ data: -1 }).limit(5);
  if (products.length < 1) {
    return res.status(404).json({
      message: 'Product Not Found',
    });
  }
  return res.json({
    products,
    message: 'items fetched',
  });
};

// get data onScroll // Infinite Scroll feature
const getProductsOnScroll = async (req, res) => {
  const { term, pageNumber } = req.query;
  const findItem = term ? { productName: new RegExp('^' + term, 'i') } : {};
  const totalDocuments = await Item.countDocuments(findItem);
  let hasMoreData = Math.ceil(totalDocuments - pageSize * pageNumber);
  hasMoreData = hasMoreData < 1 ? false : true;
  const products = await Item.find(findItem)
    .skip(pageSize * pageNumber)
    .limit(pageSize);
  if (products.length < 1) {
    return res.status(200).json({
      hasMoreData: false,
      message: 'All products listed above',
      products,
    });
  }
  return res.json({
    products,
    hasMoreData,
    message: 'items fetched on Scroll',
  });
};

//To add New Products
const addProduct = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const item = await newItem.save();
    return res.json(item);
  } catch (error) {
    res.status(500).json(server_error);
  }
};

//To update a Product inside Database
const updateProduct = async (req, res) => {
  try {
    const updateItem = await Item.findById(req.params.id);
    const { productName, imageURL, description, category, price } = req.body;
    updateItem.productName = productName || updateItem.productName;
    updateItem.imageURL = imageURL || updateItem.imageURL;
    updateItem.description = description || updateItem.description;
    updateItem.category = category || updateItem.category;
    updateItem.price = price || updateItem.price;

    const updatedItem = await updateItem.save();
    return res.json(updatedItem);
  } catch (error) {
    return res.status(500).json(server_error);
  }
};

// To remove a product from database
const deleteProduct = async (req, res) => {
  try {
    const deletedItem = await Item.deleteOne({ _id: req.params.id });
    return res.json({
      success: true,
      error: false,
      message: product_deleted,
    });
  } catch (error) {
    return res.status(500).json(server_error);
  }
};

module.exports = {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductsOnScroll,
};
