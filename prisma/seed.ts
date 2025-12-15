import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.deleteMany({});
  await prisma.userSession.deleteMany({});

  // Hash the password
  console.log("🌱 Hash the password");
  const passwordHash = await bcrypt.hash("Qazxsw.12", 10);

  // Create a top-level user
  console.log("🌱 Create a top-level user");
  await prisma.user.create({
    data: {
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
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
