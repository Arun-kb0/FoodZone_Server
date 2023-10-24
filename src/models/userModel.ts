import mongoose,{Document} from "mongoose";

interface userType extends Document {
  id: string,
  name: string,
  email: string,
  password:string,
  phone: string,
  imageUrl: string,
  timeStamp:Date,
}

const userSchema = new mongoose.Schema<userType>({
  id: { type: String,},
  name:{type:String,required:true},
  email: { type: String, default: null },
  password: { type: String, default: null },
  phone: { type: String, default: null },
  imageUrl: { type: String, default:null},
  timeStamp:{type:Date, default: new Date()}
})

export const userModel = mongoose.model('users',userSchema)