import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    default: '',
    trim: true,
  },
  address: {
    type: String,
    default: '',
    trim: true,
  },
  telephone: {
    type: String,
    default: '',
    trim: true,
  },
  headOfAccount: {
    type: String,
    required: true,
    enum: ['Asset', 'Liability', 'Capital', 'Income', 'Expense']
  },
  openingBalance: {
    type: Number,
    default: 0,
  },
  openingType: {
    type: String,
    required: true,
    enum: ['DR', 'CR']
  },
  category: {
    type: String,
    default: '',
  }
}, {
  timestamps: true, // This will add createdAt and updatedAt automatically
});

const Account = mongoose.models.Account || mongoose.model('Account', accountSchema);

export default Account;