import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  telephone: {
    type: String,
    default: ''
  },
  headOfAccount: {
    type: String,
    enum: ['Asset', 'Liability', 'Capital', 'Income', 'Expense'],
    required: true
  },
  openingBalance: {
    type: Number,
    default: 0
  },
  openingType: {
    type: String,
    enum: ['DR', 'CR'],
    default: 'DR'
  },
  category: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Account = mongoose.models.Account || mongoose.model('Account', accountSchema);

export default Account;