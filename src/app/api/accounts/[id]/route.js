import Account from '@/models/Account';
import dbConnect from '@/lib/mongodb';
import { createApiResponse, createApiError } from '@/helpers/apiResponse';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    try {
      await dbConnect();
    } catch (dbError) {
      console.error('Database connection failed:', dbError.message);
      return createApiError('Database connection failed', 500);
    }

    try {
      const account = await Account.findById(id);
      
      if (!account) {
        return createApiError('Account not found', 404);
      }
      
      return createApiResponse(account);
    } catch (queryError) {
      console.error('Error fetching account:', queryError);
      return createApiError(queryError.message || 'Error fetching account', 500);
    }
  } catch (error) {
    return createApiError(error.message, 500);
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    try {
      await dbConnect();
    } catch (dbError) {
      console.error('Database connection failed:', dbError.message);
      return createApiError('Database connection failed', 500);
    }

    try {
      const updatedAccount = await Account.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true }
      );
      
      if (!updatedAccount) {
        return createApiError('Account not found', 404);
      }
      
      return createApiResponse(updatedAccount);
    } catch (updateError) {
      console.error('Error updating account:', updateError);
      return createApiError(updateError.message || 'Error updating account', 400);
    }
  } catch (error) {
    return createApiError(error.message, 400);
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    try {
      await dbConnect();
    } catch (dbError) {
      console.error('Database connection failed:', dbError.message);
      return createApiError('Database connection failed', 500);
    }

    try {
      const deletedAccount = await Account.findByIdAndDelete(id);
      
      if (!deletedAccount) {
        return createApiError('Account not found', 404);
      }
      
      return createApiResponse({ message: 'Account deleted successfully' });
    } catch (deleteError) {
      console.error('Error deleting account:', deleteError);
      return createApiError(deleteError.message || 'Error deleting account', 500);
    }
  } catch (error) {
    return createApiError(error.message, 500);
  }
}