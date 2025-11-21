import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
}, {
  timestamps: true, // This will add createdAt and updatedAt automatically
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;