import db from "../config/database.js"

export async function listUsers(req, res) {
    try {
      const dados = await db.collection("users").find().toArray()
      return res.send(dados)
    } catch (error) {
      res.status(500).send("Server problems")
    }
  }