/*
  Warnings:

  - Added the required column `priority` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todo` ADD COLUMN `dueDate` DATETIME(3) NULL,
    ADD COLUMN `priority` INTEGER NOT NULL,
    ADD COLUMN `todotype` VARCHAR(191) NULL;
