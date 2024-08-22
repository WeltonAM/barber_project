/*
  Warnings:

  - You are about to drop the column `emailCliente` on the `agendamento` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `profissional` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioId` to the `agendamento` table without a default value. This is not possible if the table is not empty.
  - Made the column `telefone` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "agendamento" DROP COLUMN "emailCliente",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "telefone" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profissional_nome_key" ON "profissional"("nome");

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
