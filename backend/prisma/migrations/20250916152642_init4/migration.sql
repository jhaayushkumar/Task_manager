/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Todo` MODIFY `todotype` VARCHAR(191) NULL DEFAULT 'general',
    MODIFY `priority` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `password` VARCHAR(191) NOT NULL;
