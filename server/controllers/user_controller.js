import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv"
import User from "../models/user_entity.js"
dotenv.config()

const client = new OAuth2Client('939883123761-up76q4mal36sd3quh558ssccr1cqc035.apps.googleusercontent.com');
const JWT_SECRET = 'prasanna';

export const googleAuthController = async (req, res) => {
    
  const { credential, client_id } = req.body;

  
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });

    const payload = ticket.getPayload();
    const { email, given_name, picture } = payload; // Destructure picture
    console.log(email, given_name, picture);
    
    
    let user = await User.findOne({ email });
    if (!user) {
      // Create a user if they do not exist
      user = await User.create({
        email,
        name:`${given_name}`,
        picture, // Save picture in the database
        authSource: 'google',
      });
    } else {
      // Update the user's profile picture if it has changed
      user.picture = picture;
      // console.log(user);
      
      await user.save();
    }

    // Generate a JWT token
    const token = jwt.sign({user}, process.env.JWT_SECRET);

    // Send back the user (with picture) and token in the response body
    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error in Google authentication:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const signUpController = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    user = await User.create({
      email,
      password: hashedPassword, // Store the hashed password
      name,
      authSource: 'self',
    });

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'prasanna', { expiresIn: '1h' });

    // Return the newly created user and token
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Error in user sign-up:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'prasanna', { expiresIn: '1h' });

    // Return the user and the token
    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error in user login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, picture, addresses } = req.body;
  const { id } = req.user; // Extract userId from the decoded JWT token

  try {
    // Find the user by the ID from the token
    const user = await User.findById(id);
console.log(user,'pppp');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if they are provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (picture) user.picture = picture;

    // Append new addresses to the existing addresses array if provided
    if (addresses && Array.isArray(addresses)) {
      user.addresses = [...user.addresses, ...addresses];
    }

    // Save the updated user
    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Error updating user", error: error.message });
  }
};