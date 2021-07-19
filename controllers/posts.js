import PostMsgSchema from "./../models/postMsgSchema.js";
import mongoose from "mongoose";

//Get post
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMsgSchema.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};
//create post
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMsgSchema(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};
//Update post
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that ID");
  const updatedPost = await PostMsgSchema.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};
