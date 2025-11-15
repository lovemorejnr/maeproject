import { prisma } from "../prisma";

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
    },
  });

  console.log("Created user:", newUser);

  const users = await prisma.user.findMany();
  console.log("All users:", users);
}

main()
  .catch((error) => {
    console.error("Error while running Prisma sample script:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
