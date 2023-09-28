import mongoose, { Document} from "mongoose";

interface menuType extends Document{
  dishName: string,
  imageUrl: string,
  timeStamp: Date
}


const menuSchema = new mongoose.Schema<menuType>({
  dishName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  timeStamp:{type: Date,default:new Date()}
})

export const menuModel = mongoose.model('menu',menuSchema)