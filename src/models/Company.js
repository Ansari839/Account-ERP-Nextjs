import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    default: '',
    trim: true,
  },
  email: {
    type: String,
    default: '',
    trim: true,
  },
  ntn: {
    type: String,
    default: '',
    trim: true,
  },
  strn: {
    type: String,
    default: '',
    trim: true,
  },
  currency: {
    code: {
      type: String,
      default: 'USD',
    },
    symbol: {
      type: String,
      default: '$',
    },
    name: {
      type: String,
      default: 'US Dollar',
    }
  }
}, {
  timestamps: true, // This will add createdAt and updatedAt automatically
});

const Company = mongoose.models.Company || mongoose.model('Company', companySchema);

export default Company;