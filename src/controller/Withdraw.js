import db from "../config/database.js";
import dayjs from "dayjs";
import { WalletSchema } from "../schemas/WalletSchema.js";


export async function withdraw(req, res) {
  const time = dayjs().format("DD/MM/YYYY");
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const userSession = await db.collection("sessions").findOne({ token });
  const { value, description} = req.body;

  const { error } = WalletSchema.validate({
    value,
    description,
  });

  if (error) {
    const errorMessage = error.details.map((err) => err.message);
    return res.status(422).send(errorMessage);
  }

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
        date : time,
        type: "withdraw",
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
