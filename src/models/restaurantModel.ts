import mongoose, { Document, Schema, trusted } from "mongoose";


type OpeningHoursType = {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
};

interface restaurantType extends Document {
  Restaurant_Name: string;
  Category: string[];
  Pricing_for_2: string;
  Locality: string;
  Dining_Rating: string;
  Dining_Review_Count: string;
  Delivery_Rating: string;
  Delivery_Rating_Count: string;
  Website: string;
  Address: string;
  Phone_No: string;
  Latitude: string;
  Longitude: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
};


const restaurantSchema = new Schema<restaurantType>({
  Restaurant_Name: {type:String,required:true},
  Category: { type: [String], required: true },
  Pricing_for_2: { type: String, required: true }, 
  Locality: { type: String, required: true },
  Dining_Rating: { type: String, required: true },
  Dining_Review_Count: { type: String, required: true },
  Delivery_Rating: { type: String, required: true },
  Delivery_Rating_Count: { type: String, required: true },
  Website: { type: String, required: true },
  Address: { type: String, required: true },
  Phone_No: { type: String, required: true },
  Latitude: { type: String, required: true },
  Longitude: { type: String, required: true },
  id: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
  imageUrl: { type: String, required: true },
})

restaurantSchema.index({ id: 1, })
restaurantSchema.index({ Dining_Rating: 1 })
restaurantSchema.index({ Delivery_Rating: 1 })
restaurantSchema.index({ Category: 1 })


export const restaurantModel = mongoose.model<restaurantType>('restaurants', restaurantSchema)



