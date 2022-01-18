const Item = require("../models/Item");
const { product_deleted, product_updated, product_added } = require("../constants/constantMsg");

//To get all the Products
const getProduct = async (req, res) => {
    const products = await Item.find({}).sort({ data: -1 });
    return res.json({ products });
}

//To add New Products
const addProduct = async (req, res) => {
    const newItem = new Item(req.body);
    const item = await newItem.save();
    return res.json(item);
}

//To update a Product inside Database
const updateProduct = async (req, res) => {
    const updateItem = await Item.find({ _id: req.params.id });
    const { productName, imageURL, description, category, price } = req.body;
    updateItem.productName = productName || updateItem.productName;
    updateItem.imageURL = imageURL || updateItem.imageURL;
    updateItem.description = description || updateItem.description;
    updateItem.category = category || updateItem.category;
    updateItem.price = price || updateItem.price;

    const updatedItem = await updateItem.save();
    return res.json(updatedItem);
}

// To remove a product from database
const deleteProduct = async (req, res) => {
    const deletedItem = await Item.deleteOne({ _id: req.params.id });
    return res.json({
        "success": true,
        "error": false,
        "message": product_deleted
    })
}