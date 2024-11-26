import paymentsQueris from"../db/queries/paymentsQueris.js";

export async function createPayment(req, res) {
  const { order_id, customer_id, amount, payment_date } = req.body;
  if (!order_id || !customer_id || !amount || !payment_date) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const result = await insertPayment(payment);
    res.status(201).json({ message: "Payment added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

