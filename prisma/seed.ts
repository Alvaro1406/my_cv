// prisma/seed.ts
// This file is used to seed the database with initial data. You can run it using `npx prisma db:seed`.
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
// Import data to seed
import { users } from "./data-seed/users";
import { contactMessages } from "./data-seed/contacts";
import { technicalMastery } from "./data-seed/technical-mastery";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function main() {
  console.log("🌱 Start seeding...");
  await prisma.userSession.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.technicalMastery.deleteMany({});
  await prisma.notifications.deleteMany({});
  await prisma.contact.deleteMany({});

  // Hash the password before seeding the users
  console.log("🌱 Hash the password");
  const passwordHash = await bcrypt.hash("Qazxsw.12", 10);

  // Create a top-level user
  console.log("🌱 Create users");
  for (const item of users) {
    await prisma.user.create({
      data: {
        username: item.username,
        password: passwordHash,
        firstName: item.firstName,
        lastName: item.lastName,
        phoneNumber: item.phoneNumber,
        email: item.email,
        image: item.image,
      },
    });
  }

  console.log("🌱 Create technical mastery messages");
  for (const item of technicalMastery) {
    await prisma.technicalMastery.create({
      data: {
        name: item.name,
        description: item.description,
        image: item.image,
      },
    });
  }

  console.log("🌱 Create contacts messages");
  for (const item of contactMessages) {
    const data = await prisma.contact.create({
      data: {
        name: item.name,
        email: item.email,
        subject: item.subject,
        message: item.message,
      },
    });

    await prisma.notifications.create({
      data: {
        title: "Nuevo mensaje de contacto",
        description: `${data.subject}`,
        contactId: data.id,
      },
    });
  }

  console.log("🌱 Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
