import db from "../config/database.js";
import bcrypt from "bcrypt";

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const checkUser = await db.collection("users").findOne({ email });

    if (!checkUser) return res.status(400).send("Usuário ou senha incorretos");

    const isCorrectPassword = bcrypt.compareSync(password, checkUser.password);

    if (!isCorrectPassword){
        return res.status(400).send("Usuário ou senha incorretos");
    }else{
        return res.status(200).send("Login realizado com sucesso");
    }



  } catch (error) {
    res.status(500).send(error.message);
  }
}
