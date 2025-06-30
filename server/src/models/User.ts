import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  password: string;
  terms: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>; // 👈 add this
}

const UserSchema: Schema<IUser> = new Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  phone:    { type: String, required: true },
  location: { type: String },
  password: { type: String, required: true },
  terms:    { type: Boolean, required: true }
});

// 🔒 Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

// ✅ Define comparePassword method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
