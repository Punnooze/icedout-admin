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
        gender: {
            type: String,
            enum: ['male', 'female','unisex'],
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
            required: true 
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
            'XXL':{type: Number},
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
        },
        seo:{
            desc:{
                type: String,
                default:'Shop for oversized t-shirts, crop-tops, heavyweight hoodies, cargo pants, joggers, posters & tote bags online at The Icedout Store - the one-stop destination for premium streetwear & accessories.'
            },
            keywords:{
                type: Array,
                default:['Oversized T-shirts', 'Posters','hoodies', 'Premium hoodies', 'heavyweight hoodies', 'crop-tops', 'Graphic t-shirts','cargo pants','parachute pants', 'tote bags', 'graphic posters', 'y2k clothing', 'opium clothing' , 'carti t-shirts', 'fashion', 'streetwear']
            }
        }
    },
    {
        timestamps:true,
    }

);

const Products = mongoose.models.Products || mongoose.model('Products', ProductsSchema);
export default Products;