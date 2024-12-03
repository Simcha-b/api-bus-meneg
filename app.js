import express from "express";
import cors from "cors";
import customersRoutes from "./routes/customersRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import contactsRoutes from "./routes/contactRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import paymentsRoutes from "./routes/paymentsRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";

import verifyToken from "./middlewares/verifyToken.js";
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://bederech-hayshar-914f7e5318cb.herokuapp.com",
      "https://bederech-hayshar.netlify.app"
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/customers",verifyToken, customersRoutes);
app.use("/api/orders",verifyToken, ordersRoutes);
app.use("/api/companies",verifyToken, companyRoutes);
app.use("/api/contacts",verifyToken, contactsRoutes);
app.use("/api/payments",verifyToken, paymentsRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/users", usersRoutes);





app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
