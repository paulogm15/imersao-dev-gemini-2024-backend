import express from "express";
import multer from "multer";
import {
  attNewPost,
  listPosts,
  postNewPost,
  uploadImage,
} from "../controllers/postsController.js";
import cors from "cors";

const corsOpt = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

const upload = multer({ dest: "./uploads" });

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOpt));

  app.get("/posts", listPosts);

  app.post("/posts", postNewPost);
  app.post("/upload", upload.single("image"), uploadImage);

  app.put("/upload/:id", attNewPost);
};

export default routes;
