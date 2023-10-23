import mongoose from 'mongoose';

const miscSchema = new mongoose.Schema({
    miscName:{
        type: String, 
        required:true,
        unique:true,
    },
    miscData:{
        type: Object, 
        required: true,
    }
}
);

const Misc = mongoose.models.Misc || mongoose.model('Misc', miscSchema);
export default Misc;