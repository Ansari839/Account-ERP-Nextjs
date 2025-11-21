import Company from '@/models/Company';
import dbConnect from '@/lib/mongodb';

export async function GET(request) {
  try {
    await dbConnect();

    // Find the first company document (assuming single company setup)
    let company = await Company.findOne();

    // If no company exists, create a default one
    if (!company) {
      company = new Company({
        companyName: 'Default Company',
        address: '',
        email: '',
        ntn: '',
        strn: '',
        currency: { code: 'USD', symbol: '$', name: 'US Dollar' }
      });
      await company.save();
    }

    return new Response(
      JSON.stringify(company),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching company:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch company' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    let company = await Company.findOne();

    if (!company) {
      // Create new company if none exists
      company = new Company(body);
    } else {
      // Update existing company
      Object.keys(body).forEach(key => {
        company[key] = body[key];
      });
    }

    const updatedCompany = await company.save();

    return new Response(
      JSON.stringify(updatedCompany),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating/updating company:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create/update company' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();

    const body = await request.json();
    let company = await Company.findOne();

    if (!company) {
      // Create new company if none exists
      company = new Company(body);
    } else {
      // Update existing company
      Object.keys(body).forEach(key => {
        company[key] = body[key];
      });
    }

    const updatedCompany = await company.save();

    return new Response(
      JSON.stringify(updatedCompany),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating company:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update company' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}