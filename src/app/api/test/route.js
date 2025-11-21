import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  await dbConnect();
  const users = await User.find({});
  return Response.json({ success: true, users });
}

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  const newUser = await User.create(data);
  return Response.json({ success: true, user: newUser });
}