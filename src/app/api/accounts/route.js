import Account from '@/models/Account';
import dbConnect from '@/lib/mongodb';
import { createApiResponse, createApiError } from '@/helpers/apiResponse';

export async function GET(request) {
  try {
    try {
      await dbConnect();
    } catch (dbError) {
      console.error('Database connection failed:', dbError.message);
      // Return empty list if DB connection fails
      return createApiResponse({
        accounts: [],
        totalPages: 0,
        currentPage: 1,
        total: 0
      });
    }

    const url = new URL(request.url);
    const { searchParams } = url;
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    try {
      const accounts = await Account.find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const total = await Account.countDocuments({});

      return createApiResponse({
        accounts,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      });
    } catch (queryError) {
      console.error('Database query failed:', queryError);
      return createApiResponse({
        accounts: [],
        totalPages: 0,
        currentPage: 1,
        total: 0
      });
    }
  } catch (error) {
    return createApiError(error.message, 500);
  }
}

export async function POST(request) {
  try {
    try {
      await dbConnect();
    } catch (dbError) {
      console.error('Database connection failed:', dbError.message);
      return createApiError('Database connection failed', 500);
    }

    const body = await request.json();

    try {
      const newAccount = new Account(body);
      const savedAccount = await newAccount.save();
      return createApiResponse(savedAccount, 201);
    } catch (saveError) {
      console.error('Error saving account:', saveError);
      return createApiError(saveError.message || 'Error creating account', 400);
    }
  } catch (error) {
    return createApiError(error.message, 400);
  }
}