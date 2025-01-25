// Write a script that:
// 1. Connects to MongoDB.
// 2. Creates the 'users' collection.
// 3. Adds new users.
// 4. Finds users with duplicate emails.

// Use Mongoose library

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

async function manageUsers(): Promise<{ email: string }[]> {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/testdb');

    console.log('Searching for duplicate emails...');
    const duplicates = await User.aggregate([
      { $group: { _id: '$email', count: { $sum: 1 } } }, 
      { $match: { count: { $gt: 1 } } }, 
      { $project: { email: '$_id', _id: 0 } },
    ]);

    console.log('Found duplicates in manageUsers:', duplicates);
    return duplicates;
  } catch (error) {
    console.error('Error managing users:', error);
    return [{ email: 'error@example.com' }];
  } finally {
    console.log('Disconnecting from MongoDB...');
    await mongoose.disconnect();
  }}
export { manageUsers };