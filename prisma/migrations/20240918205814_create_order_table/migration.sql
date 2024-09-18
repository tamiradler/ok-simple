-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "cityid" TEXT NOT NULL,
    "productTypeid" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "corporateId" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cityid_fkey" FOREIGN KEY ("cityid") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productTypeid_fkey" FOREIGN KEY ("productTypeid") REFERENCES "product_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
