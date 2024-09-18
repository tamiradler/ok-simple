/*
  Warnings:

  - Added the required column `productGroupid` to the `product_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_type" ADD COLUMN     "productGroupid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "product_type" ADD CONSTRAINT "product_type_productGroupid_fkey" FOREIGN KEY ("productGroupid") REFERENCES "product_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
