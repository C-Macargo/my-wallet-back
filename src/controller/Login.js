import db from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function login(req, res) {
  const { email, password } = req.body;

  const newToken = uuidv4();

  try {
    const checkUser = await db.collection("users").findOne({ email });

    if (!checkUser) return res.status(400).send("Usuário ou senha incorretos");

    const isCorrectPassword = bcrypt.compareSync(password, checkUser.password);

    if (!isCorrectPassword) {
      return res.status(400).send("Usuário ou senha incorretos");
    }

    const checkSession = await db.collection("sessions").findOne({ idUsuario: email });
    if (checkSession) {
      await db.collection("sessions").updateOne(
        { idUsuario: email },
        {
          $set: { token: newToken },
        }
      );    
    } else {
      const existingUser = await db
        .collection("sessions")
        .findOne({ idUsuario: email });
      if (!existingUser) {
        await db
          .collection("sessions")
          .insertOne({ idUsuario: email, token: newToken });
      }
    }
    return res.status(202).send(newToken);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
