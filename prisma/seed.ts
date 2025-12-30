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
      email: "alvaroberuvides@gmail.com",
      role: "ADMIN",
      isActive: true,
      visible: true,
    },
    {
      username: "israel",
      password: passwordHash,
      firstName: "Israel",
      lastName: "Beruvides",
      phoneNumber: "+5354220883",
      email: "abguzman1406@gmail.com",
      role: "USER",
      isActive: true,
      visible: true,
    },
    {
      username: "lizett",
      password: passwordHash,
      firstName: "Lizett",
      lastName: "Guzmán",
      phoneNumber: "+5351748028",
      email: "paraisoscuba2@gmail.com",
      role: "USER",
      isActive: true,
      visible: true,
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
        role: "ADMIN",
        isActive: item.isActive,
        visible: item.visible,
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
