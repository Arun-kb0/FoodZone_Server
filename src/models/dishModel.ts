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
  dishes: [DishSchema]
})


export const dishModel = mongoose.model<dishesType>('dishes', dishesSchema)



const tmp = [
  {
    "dishName": "Spaghetti",
    "imageUrl": "https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=600",
    "description": "Delicious spaghetti with tomato sauce",
    "price": 10.99,
    "rating": 4.5
  },
  {
    "dishName": "Paztha",
    "imageUrl": "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=600",
    "description": "Homemade pasta with a creamy sauce",
    "price": 12.99,
    "rating": 4.2
  },
  {
    "dishName": "Pizza",
    "imageUrl": "https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?b=1&s=612x612&w=0&k=20&c=ZcLXrogjpyc5froC5ZIP-0uepbhldATwmCbt3mzViGQ=",
    "description": "Classic pepperoni pizza with a thin crust",
    "price": 14.99,
    "rating": 4.7
  },
  {
    "dishName": "Sushi",
    "imageUrl": "https://images.pexels.com/photos/7245465/pexels-photo-7245465.jpeg?auto=compress&cs=tinysrgb&w=600",
    "description": "Fresh and tasty sushi rolls with soy sauce",
    "price": 18.99,
    "rating": 4.8
  },
  {
    "dishName": "Cake",
    "imageUrl": "https://images.pexels.com/photos/2684556/pexels-photo-2684556.jpeg?auto=compress&cs=tinysrgb&w=600",
    "description": "Decadent chocolate cake with a rich ganache",
    "price": 8.99,
    "rating": 4.4
  }
]
