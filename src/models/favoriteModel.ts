import mongoose,{Document}  from "mongoose";

export interface favoriteRestaurantType extends Document {
  userId: string,
  restaurantId: string[]
}


const favoriteRestaurantSchema =new  mongoose.Schema<favoriteRestaurantType>({
  userId: { type: String, required: true },
  restaurantId: {type:[String], default:[]}
})

favoriteRestaurantSchema.index({userId:1})
export const favoriteRestaurantsModel = mongoose.model('favoriteRestaurants',favoriteRestaurantSchema)