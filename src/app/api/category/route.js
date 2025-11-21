import { connectDB } from '@/lib/db'; // Assuming you have a DB connection utility
import Category from '@/models/Category';

export async function GET(request) {
  try {
    await connectDB();
    
    const categories = await Category.find({}).sort({ createdAt: -1 });
    
    return new Response(
      JSON.stringify(categories),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch categories' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, description } = body;
    
    // Validation
    if (!name || name.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'Category name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const newCategory = new Category({
      name: name.trim(),
      description: description ? description.trim() : '',
    });
    
    const savedCategory = await newCategory.save();
    
    return new Response(
      JSON.stringify(savedCategory),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating category:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create category' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}