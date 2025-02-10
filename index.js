import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import router from "./routes/routes.js";
import swaggerApp from './swagger.js';

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/", router);
app.use(swaggerApp);

// Testando a conexão com o banco
prisma.$connect()
  .then(() => {
    console.log("✅ Conectado ao PostgreSQL com Prisma!");
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar ao PostgreSQL:", error);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});