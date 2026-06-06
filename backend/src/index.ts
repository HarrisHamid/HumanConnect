import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import vapiRouter from "./routes/vapi";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "HumanConnect backend live 🟢" });
});

// Routes
app.use("/webhook/vapi", vapiRouter);

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
