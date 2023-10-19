import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        sku: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        size:{ type: String, required: true },
        name:{ type: String, required: true },
        slug:{
          type: String, 
          required: true
        }
      },
    ],
    shippingAddress: {
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
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'prepaid'],
      required: true,
    },
    paymentResult: { id: String, status: String},
    shippingPrice: { type: Number, required: true },
    couponDiscount: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    status: {
      type: String,
      enum: ['Confirmed', 'Shipped', 'Out for delivery', 'Delivered', 'Failed'],
      required: true,
      default: 'Confirmed'
    },
    deliveredAt: { type: Date },
    trackingLink: { type: String},
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;