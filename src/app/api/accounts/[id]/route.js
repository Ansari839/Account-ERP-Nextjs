import Account from '@/models/Account';
import dbConnect from '@/lib/mongodb';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();

    const account = await Account.findById(id);

    if (!account) {
      return new Response(
        JSON.stringify({ error: 'Account not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(account),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching account:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch account' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();

    const body = await request.json();

    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true } // Return updated document and run validations
    );

    if (!updatedAccount) {
      return new Response(
        JSON.stringify({ error: 'Account not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(updatedAccount),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating account:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update account' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();

    const deletedAccount = await Account.findByIdAndDelete(id);

    if (!deletedAccount) {
      return new Response(
        JSON.stringify({ error: 'Account not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Account deleted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting account:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete account' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}