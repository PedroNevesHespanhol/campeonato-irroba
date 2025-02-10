/*
  Warnings:

  - A unique constraint covering the columns `[nome,campeonatoId]` on the table `Time` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Time_nome_campeonatoId_key" ON "Time"("nome", "campeonatoId");
