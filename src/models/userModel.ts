import mongoose,{Document} from "mongoose";

interface userType extends Document {
  id: string,
  name: string,
  email: string,
  phone: string,
  imageUrl: string,
  timeStamp:Date,
}

const userSchema = new mongoose.Schema<userType>({
  id: { type: String, required: true },
  name:{type:String,required:true},
  email: { type: String, },
  phone: { type: String, },
  imageUrl: { type: String, },
  timeStamp:{type:Date, default: new Date()}
})

export const userModel = mongoose.model('users',userSchema)