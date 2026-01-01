/*
  Warnings:

  - You are about to drop the column `images` on the `User` table. All the data in the column will be lost.
  - Added the required column `image` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'USER';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "images",
ADD COLUMN     "image" TEXT NOT NULL;
