import Account from '@/models/Account';
import dbConnect from '@/lib/mongodb';

export async function GET(request) {
  try {
    await dbConnect();
    
    const accounts = await Account.find({}).sort({ createdAt: -1 });
    
    return new Response(
      JSON.stringify(accounts),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch accounts' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const newAccount = new Account(body);
    const savedAccount = await newAccount.save();
    
    return new Response(
      JSON.stringify(savedAccount),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating account:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create account' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}