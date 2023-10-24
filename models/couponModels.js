import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  couponName: {
    type: String,
    required: true,
  },
  couponID: {
    type: String,
    required: true,
    unique: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  percentage: {
    type: Boolean,
    required: true,
  },
  percentageDiscount: {
    type: Number,
  },
  flatDiscount: {
    type: Number,
  },
  minPurchase: {
    type: Number,
    required: true,
  },
  deliveryFree: {
    type: Boolean,
    required: true,
  },
});

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);
export default Coupon;
