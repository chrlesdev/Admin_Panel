import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { genSalt, hash } from "bcryptjs";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || "localhost",
  port: 3306,
  connectionLimit: 5,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const salt = await genSalt(10);
  const hashedPassword = await hash("password", salt);

  await prisma.retur.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.shopAdminAccess.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.shop.deleteMany();
  await prisma.platform.deleteMany();
  await prisma.owner.deleteMany();

  console.log("🌱 Creating Owner: ");
  const alice = await prisma.owner.create({
    data: {
      name: "Alice",
      email: "alice@gmail.com",
      password: hashedPassword,
      phoneNumber: "081238484885",
    },
  });

  console.log("🌱 Creating Platform & Shop...");
  const shopee = await prisma.platform.create({
    data: { name: "Shopee", feePercent: 3.5, fixedFee: 500 },
  });

  const shop = await prisma.shop.create({
    data: {
      shopName: "Alice Official Store",
      ownerId: alice.id,
      platformId: shopee.id,
    },
  });

  console.log("🌱 Creating Products & Variants...");
  const productWithVariant = await prisma.product.create({
    data: {
      shopId: shop.id,
      productName: "Uniqlo Airism",
      hasVariant: true,
      productStock: 0, // Stock is managed by variants
      productSellingPrice: 150000,
      productCostPrice: 80000,
      variants: {
        create: [
          { variantName: "White - L", stock: 20, sellingPrice: 150000, costPrice: 80000 },
          { variantName: "Black - L", stock: 15, sellingPrice: 160000, costPrice: 85000 },
        ],
      },
    },
    include: { variants: true },
  });

  console.log("🌱 Creating Admin (Agus)...");
  // 1. Create Owner (Jack)
  console.log("🌱 Creating Owner: Jack...");
  const jack = await prisma.owner.create({
    data: {
      name: "Jack",
      email: "jack@gmail.com",
      password: hashedPassword,
      phoneNumber: "081238484325",
    },
  });

  console.log("🌱 Creating Admin: Jack Admin 1...");
  const jackAdmin = await prisma.admin.create({
    data: {
      name: "Jack Admin 1",
      email: "admin1@gmail.com",
      roles: "ADMIN",
      password: hashedPassword,
      ownerId: jack.id,
    },
  });

  // 3. Create Platforms
  console.log("🌱 Creating Platforms...");
  const platformTokopedia = await prisma.platform.create({
    data: { name: "Tokopedia", feePercent: 2.5, fixedFee: 3000 },
  });

  const platformShopee = await prisma.platform.create({
    data: { name: "Shopee", feePercent: 4.0, fixedFee: 1000 },
  });

  // 4. Create Shops (Linked to Jack & Platforms)
  console.log("🌱 Creating Shops...");

  // Shop A: Jack's Shopee Store
  const shopShopee = await prisma.shop.create({
    data: {
      shopName: "Jack Official Shopee",
      ownerId: jack.id,
      platformId: platformShopee.id,
      products: {
        create: {
          productName: "Shopee Exclusive T-Shirt",
          productStock: 100, // Aggregate stock
          productCostPrice: 80,
          productSellingPrice: 250,
          hasVariant: true,
          variants: {
            create: [
              { variantName: "Red - L", stock: 50, costPrice: 80, sellingPrice: 250 },
              { variantName: "Red - XL", stock: 50, costPrice: 80, sellingPrice: 250 },
            ],
          },
        },
      },
    },
  });

  // Shop B: Jack's Tokopedia Store
  const shopTokopedia = await prisma.shop.create({
    data: {
      shopName: "Jack Official Tokopedia",
      ownerId: jack.id,
      platformId: platformTokopedia.id,
      products: {
        create: {
          productName: "Tokopedia Green Hat",
          productStock: 50,
          productCostPrice: 20,
          productSellingPrice: 50,
          hasVariant: false, // Simple product example
        },
      },
    },
  });

  // 5. ASSIGN ADMIN TO BOTH SHOPS
  // This is the critical fix: We link the Admin ID to the Shop IDs (not Platform IDs)
  console.log("🔗 Linking Admin to Shops...");

  await prisma.shopAdminAccess.createMany({
    data: [
      { adminId: jackAdmin.id, shopId: shopShopee.id },
      { adminId: jackAdmin.id, shopId: shopTokopedia.id },
    ],
  });

  console.log("✅ Seeding Success! Jack now has 2 shops and 1 admin managing both.");
}
main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
