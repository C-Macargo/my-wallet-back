import db from "../config/database.js";

export async function deposit(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const userSession = await db.collection("sessions").findOne({ token });
  const { value, description, date } = req.body;

  if (!userSession)
    return res.status(422).send("Você não tem acesso, infome o token");

  if (userSession) {
    const userWallet = await db
      .collection("wallets")
      .findOne({ _id: userSession._id });
    const { name, wallet } = userWallet;

    try {
      const Transaction = {
        value,
        description,
        date,
        type: "Deposit",
      };
      await db
        .collection("wallets")
        .updateOne(
          { _id: userSession._id },
          { $push: { wallet: { ...Transaction } } }
        );
      res.sendStatus(201);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
