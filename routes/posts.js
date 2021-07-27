import express from "express";
import auth from "../middleware/auth.js";
import {
  getPost,
  getPosts,
  getPostsBySearch,
  createPost,
  deletePost,
  likePost,
  updatePost,
} from "./../controllers/posts.js";

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
