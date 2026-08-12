import mongoose, { Document, Schema } from "mongoose";

export type DeliveryStatus =
  | "Booked"
  | "Confirmed"
  | "Assigned"
  | "Out for delivery"
  | "near_you"
  | "arrived"
  | "Delivered"
  | "Flagged"
  | "Cancelled";

export type RiskLevel = "Low" | "Medium" | "High";

export interface IGeoPoint {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface IDeliveryFeedback {
  rating: number;
  note?: string;
  submittedAt?: Date;
}

export interface IDelivery extends Document {
  deliveryId: string; // e.g. LPG-2026-00124 or DEL-240812-01
  type: string; // e.g. "14.2 kg domestic cylinder"
  customer: mongoose.Types.ObjectId;
  agent?: mongoose.Types.ObjectId;
  customerName?: string;
  agentName?: string;
  address: string;
  zone?: string;
  status: DeliveryStatus;
  risk: RiskLevel;
  etaMinutes?: number;
  distanceKm?: number;
  distanceLabel?: string;
  expected?: string;
  progress?: number;
  isRunning?: boolean;
  destinationLocation?: IGeoPoint;
  currentLocation?: IGeoPoint;
  verificationOtp?: string;
  verificationStatus?: "Pending" | "Verified" | "Failed";
  arrivedAt?: Date;
  completedAt?: Date;
  feedback?: IDeliveryFeedback;
  createdAt: Date;
  updatedAt: Date;
}

const GeoPointSchema = new Schema<IGeoPoint>(
  {
    type: { type: String, enum: ["Point"], default: "Point", required: true },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  { _id: false }
);

const DeliveryFeedbackSchema = new Schema<IDeliveryFeedback>(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    note: { type: String, trim: true },
    submittedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const DeliverySchema = new Schema<IDelivery>(
  {
    deliveryId: { type: String, required: true, unique: true, trim: true, index: true },
    type: { type: String, default: "14.2 kg domestic cylinder", trim: true },
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    agent: { type: Schema.Types.ObjectId, ref: "User", index: true },
    customerName: { type: String, trim: true },
    agentName: { type: String, trim: true },
    address: { type: String, required: true, trim: true },
    zone: { type: String, trim: true, index: true },
    status: {
      type: String,
      enum: [
        "Booked",
        "Confirmed",
        "Assigned",
        "Out for delivery",
        "near_you",
        "arrived",
        "Delivered",
        "Flagged",
        "Cancelled",
      ],
      default: "Booked",
      index: true,
    },
    risk: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
      index: true,
    },
    etaMinutes: { type: Number },
    distanceKm: { type: Number },
    distanceLabel: { type: String },
    expected: { type: String },
    progress: { type: Number, default: 0 },
    isRunning: { type: Boolean, default: false },
    destinationLocation: { type: GeoPointSchema },
    currentLocation: { type: GeoPointSchema },
    verificationOtp: { type: String, trim: true },
    verificationStatus: {
      type: String,
      enum: ["Pending", "Verified", "Failed"],
      default: "Pending",
    },
    arrivedAt: { type: Date },
    completedAt: { type: Date },
    feedback: { type: DeliveryFeedbackSchema },
  },
  {
    timestamps: true,
  }
);

// Indexes
DeliverySchema.index({ customer: 1, status: 1 });
DeliverySchema.index({ agent: 1, status: 1 });
DeliverySchema.index({ status: 1, updatedAt: -1 });
DeliverySchema.index({ destinationLocation: "2dsphere" });
DeliverySchema.index({ currentLocation: "2dsphere" });

export const Delivery = mongoose.models.Delivery || mongoose.model<IDelivery>("Delivery", DeliverySchema);
