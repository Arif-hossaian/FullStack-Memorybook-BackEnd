import PostMsgSchema from "./../models/postMsgSchema.js";

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
