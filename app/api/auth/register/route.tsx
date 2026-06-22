import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'

export async function POST(req: Request) {
  try {
    const { name, email, phone, city, serviceType, password } = await req.json()

    if (!name || !email || !phone || !city || !serviceType || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    await connectDB()

    const existing = await User.findOne({ email })
    if (existing) {
      return NextResponse.json({ error: 'This email is already registered.' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({ name, email, phone, city, serviceType, password: hashedPassword })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}