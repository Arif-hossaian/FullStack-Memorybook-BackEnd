import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/posts", postRoutes)

const CONNECTION_URL = process.env.MONGODB_URL;
mongoose
  .connect(CONNECTION_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => console.log(`${error} did not connect`));
mongoose.set("useFindAndModify", false);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port:- ${PORT}`);
});
