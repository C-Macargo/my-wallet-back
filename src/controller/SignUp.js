import bcrypt from "bcrypt";
import db from "../config/database.js";
import { signUpSchema } from "../schemas/SignUpSchema.js";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  const { error } = signUpSchema.validate({
    name,
    email,
    password,
    confirmPassword,
  });

  if (error) {
    const errorMessage = error.details.map((err) => err.message);
    return res.status(422).send(errorMessage);
  }

  const encryptedPassword = bcrypt.hashSync(password, 10);

  try {
    const existingEmail = await db
      .collection("users")
      .findOne({ email: email });
    if (existingEmail)
      return res.status(400).send("Este email já está sendo usado!");

    await db
      .collection("users")
      .insertOne({ name, email, password: encryptedPassword });
    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
