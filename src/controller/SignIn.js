import db from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function signIn(req, res) {
  const { email, password } = req.body;

  const newToken = uuidv4();

  try {
    const checkUser = await db.collection("users").findOne({ email });

    if (!checkUser) return res.status(400).send("Usuário ou senha incorretos");

    const isCorrectPassword = bcrypt.compareSync(password, checkUser.password);

    if (!isCorrectPassword) {
      return res.status(400).send("Usuário ou senha incorretos");
    }

    const checkSession = await db
      .collection("sessions")
      .findOne({ _id: checkUser._id });
    if (checkSession) {
      await db.collection("sessions").updateOne(
        { _id: checkUser._id },
        {
          $set: { token: newToken },
        }
      );
    } else {
      const existingUser = await db
        .collection("sessions")
        .findOne({ _id: checkUser._id });
      if (!existingUser) {
        await db
          .collection("sessions")
          .insertOne({ _id: checkUser._id, token: newToken });
      }
    }

    const checkWalet = await db
      .collection("wallets")
      .findOne({ _id: checkUser._id });

    if (!checkWalet) {
      const userWallet = {
        _id: checkUser._id,
        name: checkUser.name,
        wallet: [],
      };
      await db.collection("wallets").insertOne(userWallet);
    }
    return res.status(202).send(newToken);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
