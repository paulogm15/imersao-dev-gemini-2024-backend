import { getAllPosts, createPost, attPost } from "../models/postsModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listPosts(request, response) {
  const posts = await getAllPosts();
  response.status(200).json(posts);
}

export async function postNewPost(req, res) {
  const newPost = req.body;

  try {
    const createdPost = await createPost(newPost);
    res.status(200).json(createdPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function uploadImage(req, res) {
  const newPost = {
    description: "",
    imgUrl: req.file.originalname,
    alt: "",
  };

  try {
    const createdPost = await createPost(newPost);
    const attImage = `uploads/${createdPost.insertedId}.png`;

    fs.renameSync(req.file.path, attImage);

    res.status(200).json(createdPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function attNewPost(req, res) {
  const id = req.params.id;
  const urlImage = `http://localhost:3000/${id}.png`;

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const description = await gerarDescricaoComGemini(imgBuffer);

    const post = {
      imgUrl: urlImage,
      description: description,
      alt: req.body.alt,
    };

    const createdPost = await attPost(id, post);

    res.status(200).json(createdPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

