/*
  Warnings:

  - You are about to drop the column `userId` on the `shop` table. All the data in the column will be lost.
  - Made the column `ownerId` on table `shop` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `shop` DROP FOREIGN KEY `Shop_ownerId_fkey`;

-- DropIndex
DROP INDEX `Shop_userId_idx` ON `shop`;

-- AlterTable
ALTER TABLE `shop` DROP COLUMN `userId`,
    MODIFY `ownerId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `StockLog` (
    `id` VARCHAR(191) NOT NULL,
    `shopId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `variantId` VARCHAR(191) NULL,
    `changeAmount` INTEGER NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `adminId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `StockLog_shopId_idx`(`shopId`),
    INDEX `StockLog_productId_idx`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Shop` ADD CONSTRAINT `Shop_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Owner`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockLog` ADD CONSTRAINT `StockLog_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `Shop`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `shop` RENAME INDEX `Shop_ownerId_fkey` TO `Shop_ownerId_idx`;
