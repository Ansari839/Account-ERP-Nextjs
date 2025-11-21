import Company from '@/models/Company';
import dbConnect from '@/lib/mongodb';
import { createApiResponse, createApiError } from '@/helpers/apiResponse';

// GET /api/company - Get the company information (only one record allowed)
export async function GET(request) {
  try {
    await dbConnect();

    try {
      // Find the only company record (or return empty if none exists)
      let company = await Company.findOne();

      if (!company) {
        // Return an empty response indicating no company exists yet
        return createApiResponse({ exists: false, data: null });
      }

      return createApiResponse({ 
        exists: true, 
        data: company 
      });
    } catch (queryError) {
      console.error('Database query failed:', queryError);
      return createApiResponse({ exists: false, data: null });
    }
  } catch (error) {
    return createApiError(error.message, 500);
  }
}

// POST /api/company - Create a new company (only one is allowed)
export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    // Check if a company already exists
    const existingCompany = await Company.findOne();
    if (existingCompany) {
      return createApiError('A company record already exists. Use PUT to update the existing record.', 400);
    }

    // Create new company
    const newCompany = new Company({
      ...body,
      // Set currency symbol and name based on code if not provided
      ...(body.currency && !body.currency.symbol && !body.currency.name && {
        currency: {
          ...body.currency,
          symbol: getCurrencySymbol(body.currency.code),
          name: getCurrencyName(body.currency.code)
        }
      })
    });

    const savedCompany = await newCompany.save();
    
    return createApiResponse(savedCompany, 201);
  } catch (error) {
    console.error('Error creating company:', error);
    return createApiError(error.message || 'Error creating company', 400);
  }
}

// PUT /api/company - Update the existing company
export async function PUT(request) {
  try {
    await dbConnect();

    const body = await request.json();

    // Find the existing company record
    const company = await Company.findOne();
    if (!company) {
      return createApiError('Company record does not exist. Create one first.', 404);
    }

    // Update company with new data
    Object.assign(company, {
      ...body,
      // Set currency symbol and name based on code if not provided
      ...(body.currency && !body.currency.symbol && !body.currency.name && {
        currency: {
          ...body.currency,
          symbol: getCurrencySymbol(body.currency.code),
          name: getCurrencyName(body.currency.code)
        }
      })
    });

    const updatedCompany = await company.save();
    return createApiResponse(updatedCompany);
  } catch (error) {
    console.error('Error updating company:', error);
    return createApiError(error.message || 'Error updating company', 400);
  }
}

// Helper function to get currency symbol by code
function getCurrencySymbol(code) {
  const currencyMap = {
    'PKR': '₨',
    'USD': '$',
    'GBP': '£',
    'EUR': '€',
    'AED': 'د.إ',
    'INR': '₹',
    'SAR': '﷼',
    'CAD': 'C$',
    'AUD': 'A$',
    'JPY': '¥',
  };
  return currencyMap[code] || '$';
}

// Helper function to get currency name by code
function getCurrencyName(code) {
  const nameMap = {
    'PKR': 'Pakistani Rupee',
    'USD': 'US Dollar',
    'GBP': 'British Pound',
    'EUR': 'Euro',
    'AED': 'United Arab Emirates Dirham',
    'INR': 'Indian Rupee',
    'SAR': 'Saudi Riyal',
    'CAD': 'Canadian Dollar',
    'AUD': 'Australian Dollar',
    'JPY': 'Japanese Yen',
  };
  return nameMap[code] || 'Unknown Currency';
}