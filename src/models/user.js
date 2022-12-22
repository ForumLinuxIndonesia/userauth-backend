import { Schema, model } from 'mongoose';

const UserModel = model('User', new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
}, {
  timestamps: true,
}));

export default UserModel;
export { UserModel };
