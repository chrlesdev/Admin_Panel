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

  console.log("🌱 Seeding database...");

  try {
    await prisma.$connect();
    console.log("✅ Database connected!");
  } catch (error) {
    console.error("❌ Connection failed:", error);
    throw error;
  }

  // Clear existing data (optional - be careful in production!)
  await prisma.sale.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.shop.deleteMany();
  await prisma.user.deleteMany();

  const userData: Prisma.UserCreateInput[] = [
    {
      name: "Alice Seller",
      email: "alice@mail.com",
      password: hashedPassword,
      phoneNumber: "081234567890",
      shops: {
        create: [
          {
            shopName: "Alice Tokopedia Store", // Fixed: ShopName → shopName
            platform: "tokopedia", // Fixed: platForm → platform
            products: {
              create: [
                {
                  productName: "Kaos Polos",
                  productSellingPrice: 50000,
                  productCostPrice: 30000,
                  productStock: 0, // Stock in variants
                  hasVariant: true,
                  variants: {
                    create: [
                      {
                        variantName: "Merah, M",
                        stock: 10,
                        costPrice: 30000,
                        sellingPrice: 50000,
                      },
                      {
                        variantName: "Biru, L",
                        stock: 15,
                        costPrice: 32000,
                        sellingPrice: 55000,
                      },
                    ],
                  },
                },
                {
                  productName: "Topi Baseball",
                  productSellingPrice: 75000,
                  productCostPrice: 40000,
                  productStock: 25,
                  hasVariant: false, // No variants
                },
              ],
            },
          },
          {
            shopName: "Alice Shopee Store",
            platform: "shopee",
            products: {
              create: {
                productName: "Tas Ransel",
                productSellingPrice: 150000,
                productCostPrice: 80000,
                productStock: 30,
                hasVariant: false,
              },
            },
          },
        ],
      },
    },
    {
      name: "Bob Merchant",
      email: "bob@mail.com",
      password: hashedPassword,
      phoneNumber: "082345678901", // Fixed: unique number
      shops: {
        create: {
          shopName: "Bob Electronics",
          platform: "lazada",
          products: {
            create: {
              productName: "Power Bank 10000mAh",
              productSellingPrice: 120000,
              productCostPrice: 70000,
              productStock: 50,
              hasVariant: false,
            },
          },
        },
      },
    },
    {
      name: "Charlie Store",
      email: "charlie@mail.com",
      password: hashedPassword,
      phoneNumber: "083456789012", // Fixed: unique number
      shops: {
        create: {
          shopName: "Charlie Fashion",
          platform: "tiktokshop",
          products: {
            create: {
              productName: "Sepatu Sneakers",
              productSellingPrice: 250000,
              productCostPrice: 150000,
              productStock: 0,
              hasVariant: true,
              variants: {
                create: [
                  {
                    variantName: "Hitam, 40",
                    stock: 5,
                    costPrice: 150000,
                    sellingPrice: 250000,
                  },
                  {
                    variantName: "Putih, 42",
                    stock: 8,
                    costPrice: 150000,
                    sellingPrice: 250000,
                  },
                ],
              },
            },
          },
        },
      },
    },
  ];

  // Create users with shops and products
  for (const user of userData) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log("✅ Users, shops, and products created!");

  // Add some sample sales
  const aliceShop = await prisma.shop.findFirst({
    where: { shopName: "Alice Tokopedia Store" },
    include: { products: { include: { variants: true } } },
  });

  if (aliceShop) {
    const kaosPolos = aliceShop.products.find((p) => p.productName === "Kaos Polos");
    const topiBaseball = aliceShop.products.find((p) => p.productName === "Topi Baseball");

    if (kaosPolos && kaosPolos.variants.length > 0) {
      // Sale with variant
      const variantMerah = kaosPolos.variants[0];
      await prisma.sale.create({
        data: {
          shopId: aliceShop.id,
          productId: kaosPolos.id,
          variantId: variantMerah.id,
          quantity: 2,
          totalPrice: variantMerah.sellingPrice * 2,
          totalCost: variantMerah.costPrice ? variantMerah.costPrice * 2 : null,
          profit: variantMerah.costPrice ? (variantMerah.sellingPrice - variantMerah.costPrice) * 2 : null,
          resi: "TOKOPEDIA123456",
          saleDate: new Date("2025-01-20"),
        },
      });
    }

    if (topiBaseball) {
      // Sale without variant
      await prisma.sale.create({
        data: {
          shopId: aliceShop.id,
          productId: topiBaseball.id,
          variantId: null, // No variant
          quantity: 3,
          totalPrice: topiBaseball.productSellingPrice * 3,
          totalCost: topiBaseball.productCostPrice ? topiBaseball.productCostPrice * 3 : null,
          profit: topiBaseball.productCostPrice ? (topiBaseball.productSellingPrice - topiBaseball.productCostPrice) * 3 : null,
          resi: "TOKOPEDIA789012",
          saleDate: new Date("2025-01-21"),
        },
      });
    }
  }

  console.log("✅ Sample sales created!");
  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
