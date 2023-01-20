import db from "../config/database.js";

export async function signUp(req, res) {
  const { name, email} = req.body;

  try {
    await db
      .collection("users")
      .insertOne({name, email});
    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
