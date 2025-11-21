import mongoose from 'mongoose';

// Define currency options with symbols
const currencyOptions = [
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'AED', symbol: 'د.إ', name: 'United Arab Emirates Dirham' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  address: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
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
      required: [true, 'Currency is required'],
      enum: {
        values: currencyOptions.map(option => option.code),
        message: 'Please select a valid currency code'
      }
    },
    symbol: {
      type: String,
      required: [true, 'Currency symbol is required']
    },
    name: {
      type: String,
      required: [true, 'Currency name is required']
    }
  }
}, {
  timestamps: true
});

// Ensure only one company record exists in the database
companySchema.index({ _id: 1 }); // Default index

// Pre-save middleware to ensure only one company exists
companySchema.pre('save', async function (next) {
  // Skip if this is an update operation (not a new document)
  if (!this.isNew) {
    return next();
  }

  // Check if a company record already exists
  const existingCompany = await this.constructor.findOne();
  if (existingCompany) {
    const error = new Error('Only one company record is allowed');
    error.code = 11000; // Duplicate key error code
    return next(error);
  }

  // Set currency symbol and name based on currency code
  if (this.currency && this.currency.code) {
    const currencyInfo = currencyOptions.find(option => option.code === this.currency.code);
    if (currencyInfo) {
      this.currency.symbol = currencyInfo.symbol;
      this.currency.name = currencyInfo.name;
    }
  }

  next();
});

// Pre-findOneAndUpdate middleware to ensure only one company exists
companySchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  
  // If updating currency, set symbol and name
  if (update.currency && update.currency.code) {
    const currencyInfo = currencyOptions.find(option => option.code === update.currency.code);
    if (currencyInfo) {
      update.currency.symbol = currencyInfo.symbol;
      update.currency.name = currencyInfo.name;
    }
  }

  next();
});

const Company = mongoose.models.Company || mongoose.model('Company', companySchema);

export default Company;