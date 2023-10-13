import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema(
    {
        sku: {
            type: String,
            required: true
        },
        name:{
            type: String, 
            required: true
        },
        slug:{
            type: String, 
            required: true
        },
        category: {
            type: String,
            required: true 
        },
        drop: {
            type: String,
            required: true 
        },
        images: {
            type: Array,
            // required: true 
        },
        price: {
            type: Number,
            required: true 
        },
        discount: {
            type: Number,
            required: true 
        },
        countInStock: {
            'S':{type: Number},
            'M':{type: Number},
            'L':{type: Number},
            'XL':{type: Number},
            '2XL':{type: Number},
        },
        unavailable:{
            type:Boolean,
            default:false
        },
        description:{
            type:Array,
            required: true 
        },
        details:{
            type:Array,
            required: true
        },
        isFeatured:{
            type: Boolean,
            required: true 
        },
        featuremsg:{
            type: String,
            default:"" 
        }

        
    }

);

const Products = mongoose.models.Products || mongoose.model('Products', ProductsSchema);
export default Products;