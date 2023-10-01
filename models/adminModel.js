import mongoose, { Schema, models } from 'mongoose';

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = models.Admin || mongoose.model('Admin', adminSchema);
export default Admin;
