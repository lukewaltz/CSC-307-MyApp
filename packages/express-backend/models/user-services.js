import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else if (job && name) {
    promise = findUserByNameAndJob(name, job);
  }
  return await promise;
}

async function findUserById(id) {
  return await userModel.findById(id);
}

async function addUser(user) {
  const userToAdd = new userModel(user);
  userToAdd.id = userToAdd._id;
  const promise = userToAdd.save();
  return await promise;
}

async function findUserByName(name) {
  return await userModel.find({ name: name });
}

async function findUserByNameAndJob(name, job) {
  return await userModel.find({ name: name, job: job });
}

async function findUserByJob(job) {
  return await userModel.find({ job: job });
}

async function deleteUser(id) {
  return await userModel.findByIdAndRemove(id);
}


export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob, 
  deleteUser
};