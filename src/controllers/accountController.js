import Account from '@/models/Account';
import dbConnect from '@/lib/mongodb';

// POST /api/accounts - Create a new account
export const createAccount = async (req, res) => {
  try {
    await dbConnect();
    
    const {
      name,
      city,
      address,
      telephone,
      headOfAccount,
      openingBalance,
      openingType,
      category
    } = req.body;

    // Create new account
    const newAccount = new Account({
      name,
      city,
      address,
      telephone,
      headOfAccount,
      openingBalance,
      openingType,
      category
    });

    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /api/accounts - Get all accounts
export const getAllAccounts = async (req, res) => {
  try {
    await dbConnect();
    
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const accounts = await Account.find({})
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await Account.countDocuments({});
    
    res.status(200).json({
      accounts,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/accounts/:id - Get a specific account by ID
export const getAccountById = async (req, res) => {
  try {
    await dbConnect();
    
    const { id } = req.query;
    const account = await Account.findById(id);
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/accounts/:id - Update an account by ID
export const updateAccount = async (req, res) => {
  try {
    await dbConnect();
    
    const { id } = req.query;
    const updateData = req.body;
    
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // Return updated document and run schema validations
    );
    
    if (!updatedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/accounts/:id - Delete an account by ID
export const deleteAccount = async (req, res) => {
  try {
    await dbConnect();
    
    const { id } = req.query;
    
    const deletedAccount = await Account.findByIdAndDelete(id);
    
    if (!deletedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};