import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
     
    // name:{type:String, required:true},
    // description:{type:String, required:true},
    // price:{type:Number, required:true},
    // image:{type:[String], required:true},
    // category:{type:String, required:true},
    // subCategory:{type:String, required:true},
    // bestSeller:{type:Boolean},
    // date:{type:Number,required:true}

    // name: String,
    // description: String,
    // price: Number,
    // category: String,
    // subCategory: String,
    // bestseller: Boolean,
    // images: [String], // This should be an array of image URLs
    // date: Date

    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    bestseller: { type: Boolean },
    images: { type: [String], required: true },
    date: { type: Date, required: true }
});

const productModel= mongoose.models.product || mongoose.model("product",productSchema)

export default productModel