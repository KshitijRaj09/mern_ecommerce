const Item = require("../models/Item");
const { product_deleted, product_updated, product_added, server_error } = require("../constants/constantMsg");

//To get all the Products
const getProduct = async (req, res) => {
    console.log("hiiii");
    const products = await Item.find({}).sort({ data: -1 });
    return res.json(products);
}

//To add New Products
const addProduct = async (req, res) => {
    //console.log(req.body)
    try {
        const newItem = new Item(req.body);
        const item = await newItem.save();
        console.log("inside addproduct", item)
        return res.json(item);
    }
    catch (error) {
        res.status(500).json(server_error);
    }

}

//To update a Product inside Database
const updateProduct = async (req, res) => {
    try {
        const updateItem = await Item.findById(req.params.id);
        console.log("inside update item", updateItem);
        const { productName, imageURL, description, category, price } = req.body;
        updateItem.productName = productName || updateItem.productName;
        updateItem.imageURL = imageURL || updateItem.imageURL;
        updateItem.description = description || updateItem.description;
        updateItem.category = category || updateItem.category;
        updateItem.price = price || updateItem.price;

        const updatedItem = await updateItem.save();
        return res.json(updatedItem);
    }
    catch (error) {
        return res.status(500).json(server_error)
    }
}

// To remove a product from database
const deleteProduct = async (req, res) => {
    try {
        const deletedItem = await Item.deleteOne({ _id: req.params.id });
        console.log("inside deleteProduct", deletedItem);
        return res.json({
            "success": true,
            "error": false,
            "message": product_deleted
        })
    }
    catch (error) {
        return res.status(500).json(server_error)
    }
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct,
    updateProduct
}