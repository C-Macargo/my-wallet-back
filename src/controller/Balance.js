import db from "../config/database.js";
import { transaction } from "./Transaction.js";

export async function balance(_, res) {
try{
  const userSession = res.locals.session;
  const userTransactions = await db
    .collection("wallets")
    .find({ _id: userSession._id })
    .toArray();

  let saldo = 0;
  
  console.log(userTransactions[0].wallet)

  if(userTransactions[0].wallet.length > 0) {
    userTransactions[0].wallet.map((t) =>
      t.type === "deposit" ? (saldo += parseFloat(t.value)) : (saldo -= parseFloat(t.value))
    );
    res.status(200).json(saldo.toFixed(2))
  } else {
    res.status(200).send("No transactons");
  }
}
  catch (err){
    console.log(err);
    res.status(500).send("Server error");

}
}
