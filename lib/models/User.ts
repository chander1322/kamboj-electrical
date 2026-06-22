import { Schema, models, model } from 'mongoose'

export interface IUser {
  name: string
  email: string
  phone: string
  city: string
  serviceType: string
  password: string
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  serviceType: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true })

// agar model already bana hua hai to use hi use karo, warna naya banao
// (Next.js hot-reload mein "model already exists" error se bachne ke liye)
export default models.User || model<IUser>('User', UserSchema)