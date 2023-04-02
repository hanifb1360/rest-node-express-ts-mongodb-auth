// connect and interact with MongoDB
import mongoose from 'mongoose';

// Defining the user schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

// Creating a User model from the UserSchema
export const UserModel = mongoose.model('User', UserSchema);

// Defining CRUD (Create, Read, Update, Delete) operations on User model

// Get all users
export const getUsers = () => UserModel.find();

// Get user by email
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

// Get user by session token
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ 'authentication.sessionToken': sessionToken });

// Get user by id
export const getUserById = (id: string) => UserModel.findById(id);

// Create a new user
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

// Delete a user by id
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

// Update a user by id
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
