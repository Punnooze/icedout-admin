import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true 
        },
        firstName:{
            type: String, 
            required: true
        },
        lastName:{
            type: String, 
            required: true
        },
        mobile:{
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true 
        },
        city: {
            type: String,
            required: true 
        },
        state: {
            type: String,
            required: true 
        },
        country: {
            type: String,
            required: true 
        },
        pincode: {
            type: String,
            required: true 
        },
        email: {
            type: String, 
            required: true
        }
    }

);

const Address = mongoose.models.Address || mongoose.model('Address', AddressSchema);
export default Address;