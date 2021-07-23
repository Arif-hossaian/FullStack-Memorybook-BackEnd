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
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  await PostMsgSchema.findByIdAndUpdate(id, updatedPost, { new: true });
  res.json(updatedPost);
};
//Delete post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await PostMsgSchema.findByIdAndRemove(id);
  res.json({ msg: "Post deleted succesfully" });
};
//Like post
export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const post = await PostMsgSchema.findById(id);
  const updatedPost = await PostMsgSchema.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  res.json(updatedPost);
};
