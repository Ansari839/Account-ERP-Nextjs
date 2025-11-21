import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();

    const body = await request.json();
    const { name, description } = body;

    // Validation
    if (!name || name.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'Category name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        description: description ? description.trim() : '',
      },
      { new: true, runValidators: true } // Return updated document and run validations
    );

    if (!updatedCategory) {
      return new Response(
        JSON.stringify({ error: 'Category not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(updatedCategory),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating category:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update category' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return new Response(
        JSON.stringify({ error: 'Category not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Category deleted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting category:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete category' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}