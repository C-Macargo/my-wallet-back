import db from "../config/database.js";

export async function walletContent(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  const userSession = await db.collection("sessions").findOne({ token });

  if (!userSession)
    return res.status(422).send("Você não tem acesso, infome o token");

  if (userSession) {
    const userWallet = await db
      .collection("wallets")
      .findOne({ _id: userSession._id });
    const { name, wallet } = userWallet;
    return res.status(202).send({ name, wallet });
  }
}
