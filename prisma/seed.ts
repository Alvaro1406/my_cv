import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.userSession.deleteMany({});
  await prisma.user.deleteMany({});

  // Hash the password
  console.log("🌱 Hash the password");
  const passwordHash = await bcrypt.hash("Qazxsw.12", 10);

  const users = [
    {
      username: "admin",
      password: passwordHash,
      firstName: "Alvaro",
      lastName: "Beruvides",
      phoneNumber: "+5355651996",
      image: "",
      email: "alvaroberuvides@gmail.com",
    },
  ];

  // Create a top-level user
  console.log("🌱 Create users");
  for (const item of users) {
    await prisma.user.create({
      data: {
        username: item.username,
        password: item.password,
        firstName: item.firstName,
        lastName: item.lastName,
        phoneNumber: item.phoneNumber,
        email: item.email,
        image: item.image,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
