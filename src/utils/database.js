import mongoose from 'mongoose';

mongoose.set('strictQuery', true); // supress warn

const connectToDB = () => mongoose.connect(process.env.MONGODB_URL, {
  connectTimeoutMS: 30_000,
});

export default connectToDB;
export { connectToDB };
