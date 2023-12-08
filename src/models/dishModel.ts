import mongoose, { Document, Schema } from "mongoose";


export type dishType = {
  id: string;
  dishName: string;
  description: string;
  cuisineName: string;
  price: number;
  rating: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export interface dishesType extends Document {
  _id: typeof mongoose.Types.ObjectId,
  restaurantId: string,
  dishes: dishType[]
}


const DishSchema = new Schema<dishType>({
  dishName: { type: String, required: true },
  description: { type: String, required: true },
  cuisineName: { type: String },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: String },
  updatedAt: { type: String }
})

const dishesSchema = new Schema<dishesType>({
  _id: { type: mongoose.Types.ObjectId, required: true },
  restaurantId: { type: String, required: true },
  dishes: [DishSchema]
})

dishesSchema.index({ restaurantId :1})
export const dishModel = mongoose.model<dishesType>('dishes', dishesSchema)