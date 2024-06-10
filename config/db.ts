import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MongoDb_Connection_String as string);
  } catch (error) {
    console.log(error);
  }
};
export default connect;
