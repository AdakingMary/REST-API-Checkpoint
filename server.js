import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

// Connecting to MongoDB
const ConnectMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://adakingmary:mj6BXm7CJMnx18mb@cluster0.tryobxo.mongodb.net/Rest-API?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database successfully connected");
  } catch (error) {
    console.log(error);
  }
};

ConnectMongoDB();

// Importing from Server.js

import user from "./Models/User.js";

// Get Route
app.get("/Users", async (req, res) => {
  try {
    const allUsers = await user.find();
    res.send(allUsers);
  } catch (error) {
    res.send("An error occurred");
  }
});

// **************
//  Put Route(Route for updating user by id)
app.put("/updateUser/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  try {
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { name: name },
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    res.send("An error occurred");
  }
});

// Post Route
app.post("/register", async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    // create a user using user model
    const person = await user.create({
      name: name,
      email: email,
      phone: phone,
    });
    // send the created user as a response back to the client
    res.send(person);
  } catch (error) {
    console.log(error);
    res.send("An error occurred");
  }
});

// Delete Route
app.delete("/deleteUser/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await user.findByIdAndDelete(userId);
    res.send(deletedUser);
  } catch (error) {
    res.send("An error occurred");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
