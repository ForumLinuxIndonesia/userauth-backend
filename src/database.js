import 'dotenv/config';
import mongoose, { connect, model, Schema } from 'mongoose';

connect(process.env.MONGODB_URL);

const UserAuthSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  password: String,
  dateCreated: Date,
});

const DB = model(process.env.MONGODB_USERAUTHMODEL, UserAuthSchema);

export default DB;
export { mongoose };
