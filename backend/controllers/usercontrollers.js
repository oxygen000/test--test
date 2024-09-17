import User from "../models/User.js";

// Create user
export const create = async (req, res) => {
  try {
    // Verify that all required fields are present
    const { name, police, code, assignment, condition } = req.body;
    if (!name || !police || !code || !assignment || !condition) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Read users
const get = async (req, res) => {
  try {
    const users = await User.find(); // Use "User" instead of "usermodel"

    if (!users.length) {
      return res.status(404).json({ success: false, message: 'No users found' });
    }

    // Returning list of users
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update user
const Updated = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID and update with new data
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }); // Use "User" instead of "usermodel"

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Returning updated user
    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete user
const Delete = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID and delete
    const deletedUser = await User.findByIdAndDelete(userId); // Use "User" instead of "usermodel"

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Returning success message
    return res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export { get, Updated, Delete };
