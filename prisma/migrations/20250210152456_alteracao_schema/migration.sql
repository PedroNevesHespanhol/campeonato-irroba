/*
  Warnings:

  - You are about to drop the `_Inscricao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Inscricao" DROP CONSTRAINT "_Inscricao_A_fkey";

-- DropForeignKey
ALTER TABLE "_Inscricao" DROP CONSTRAINT "_Inscricao_B_fkey";

-- AlterTable
ALTER TABLE "Time" ADD COLUMN     "campeonatoId" INTEGER;

-- DropTable
DROP TABLE "_Inscricao";

-- AddForeignKey
ALTER TABLE "Time" ADD CONSTRAINT "Time_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonato"("id") ON DELETE SET NULL ON UPDATE CASCADE;
