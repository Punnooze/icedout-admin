import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
    {
        bannerName:{
            type: String, 
            required:true,
            unique:true
        },
        images:[{
            imageLink:{
                type:String,
            },
            redirect:{
                type:String,
            }
        }]
        
    }
);

const Banner = mongoose.models.Banner || mongoose.model('Banner', bannerSchema);
export default Banner;