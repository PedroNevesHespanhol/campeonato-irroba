const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const campeonatoRoutes = require("./routes/campeonatoRoutes");

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/campeonato", campeonatoRoutes);

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
