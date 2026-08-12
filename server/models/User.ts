import mongoose, { Document, Schema } from "mongoose";

export type UserRole = "customer" | "agent" | "admin";
export type UserStatus = "Active" | "On route" | "Offline" | "Suspended";
export type VerificationState = "Email verified" | "Pending email" | "Reminder sent";

export interface IUser extends Document {
  customId?: string; // e.g. CUS-0284, AGT-001, USR-1042
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  verification: VerificationState;
  emailVerified: boolean;
  address?: string;
  vehicle?: string;
  zone?: string;
  title?: string;
  lastSeen?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    customId: { type: String, trim: true, sparse: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["customer", "agent", "admin"],
      default: "customer",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["Active", "On route", "Offline", "Suspended"],
      default: "Active",
      index: true,
    },
    verification: {
      type: String,
      enum: ["Email verified", "Pending email", "Reminder sent"],
      default: "Pending email",
    },
    emailVerified: { type: Boolean, default: false },
    address: { type: String, trim: true },
    vehicle: { type: String, trim: true },
    zone: { type: String, trim: true },
    title: { type: String, trim: true },
    lastSeen: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ role: 1, status: 1 });

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
