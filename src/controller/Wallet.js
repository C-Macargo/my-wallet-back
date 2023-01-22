import db from "../config/database.js";

export async function walletContent(req, res) {

  const userSession = res.locals.session;

  if (!userSession) return res.status(422).send("Acesso negado");
  const userWallet = await db
    .collection("wallets")
    .findOne({ _id: userSession._id });
  const { name, wallet } = userWallet;
  return res.status(202).send({ name, wallet });




}
