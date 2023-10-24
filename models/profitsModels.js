import mongoose from 'mongoose';

const ProfitSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Profit = mongoose.models.Profit || mongoose.model('Profit', ProfitSchema);
export default Profit;
