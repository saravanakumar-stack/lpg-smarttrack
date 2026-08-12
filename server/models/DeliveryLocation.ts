import mongoose, { Document, Schema } from "mongoose";

export interface IDeliveryLocationPoint {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface IDeliveryLocation extends Document {
  delivery: mongoose.Types.ObjectId;
  agent?: mongoose.Types.ObjectId;
  location: IDeliveryLocationPoint;
  speed?: number; // km/h
  heading?: number; // degrees 0-360
  battery?: number; // battery percentage 0-100
  recordedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DeliveryLocationPointSchema = new Schema<IDeliveryLocationPoint>(
  {
    type: { type: String, enum: ["Point"], default: "Point", required: true },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  { _id: false }
);

const DeliveryLocationSchema = new Schema<IDeliveryLocation>(
  {
    delivery: { type: Schema.Types.ObjectId, ref: "Delivery", required: true, index: true },
    agent: { type: Schema.Types.ObjectId, ref: "User", index: true },
    location: { type: DeliveryLocationPointSchema, required: true },
    speed: { type: Number },
    heading: { type: Number },
    battery: { type: Number },
    recordedAt: { type: Date, default: Date.now, index: true },
  },
  {
    timestamps: true,
  }
);

// GeoSpatial and Query Indexes
DeliveryLocationSchema.index({ location: "2dsphere" });
DeliveryLocationSchema.index({ delivery: 1, recordedAt: -1 });
DeliveryLocationSchema.index({ agent: 1, recordedAt: -1 });

export const DeliveryLocation =
  mongoose.models.DeliveryLocation ||
  mongoose.model<IDeliveryLocation>("DeliveryLocation", DeliveryLocationSchema);
