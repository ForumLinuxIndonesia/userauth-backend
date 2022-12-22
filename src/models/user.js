import { Schema } from 'mongoose';

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
}, {
  timestamps: true,
});

export default UserSchema;
export { UserSchema };
