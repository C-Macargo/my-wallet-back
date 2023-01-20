import db from "../config/database.js";
import { signUpSchema } from '../model/AuthSchema.js'

export async function signUp(req, res) {

  const { name, email , password, confirmPassword} = req.body;
  const { error } = signUpSchema.validate({ name, email, password, confirmPassword })

  if (error) {
    const errorMessage = error.details.map(err => err.message)
    return res.status(422).send(errorMessage)
  }

  try {
    await db
      .collection("users")
      .insertOne({name, email, password});
    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
