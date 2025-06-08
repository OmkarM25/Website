import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"
// import req from "../middleware/multer.js"

// Add Product function
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        console.log(req.files);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                //     let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                //     return result.secure_url
                // })
                try {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    console.log('Cloudinary upload result:', result);  // Log the result of the Cloudinary upload
                    return result.secure_url;
                } catch (uploadError) {
                    console.error('Error uploading to Cloudinary:', uploadError);
                    return null;
                }
            })
        );

        console.log('Uploaded image URLs:', imagesUrl);

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            images: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: 'Product Added' })




    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// List Product function
const listProduct = async (req, res) => {

    try {

        const products = await productModel.find({});
        res.json({ success: true, products })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


// Remove Product function
const removeProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// Single Product info function
const singleProduct = async (req, res) => {
    try {

        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export { listProduct, addProduct, removeProduct, singleProduct };