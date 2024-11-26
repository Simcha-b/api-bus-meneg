import express from "express";
import cors from "cors";
import customersRoutes from "./routes/customersRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import contactsRoutes from "./routes/contactRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import paymentsRoutes from "./routes/paymentsRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://bederech-hayshar-914f7e5318cb.herokuapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/customers", customersRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/payments", paymentsRoutes);



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
