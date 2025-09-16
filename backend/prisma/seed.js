const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  // Users
  const user1 = await prisma.user.create({
    data: {
      name: "Adarsh Priydarshi",
      email: "adarsh@example.com",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Alice Johnson",
      email: "alice@example.com",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Bob Smith",
      email: "bob@example.com",
    },
  });

  // Todos
  await prisma.todo.createMany({
    data: [
      {
        title: "Learn Node.js",
        description: "Study Express and Prisma",
        todotype: "Study",
        priority: 1,
        userId: user1.id,
      },
      {
        title: "Complete AI Project",
        description: "Integrate Email + AI notifications",
        todotype: "Work",
        priority: 2,
        userId: user1.id,
      },
      {
        title: "Read a book",
        description: "Start reading 'Clean Code'",
        todotype: "Personal",
        priority: 3,
        userId: user2.id,
      },
      {
        title: "Go to Gym",
        description: "Leg day workout",
        todotype: "Health",
        priority: 2,
        userId: user3.id,
      },
      {
        title: "Buy groceries",
        description: "Milk, eggs, vegetables",
        todotype: "Personal",
        priority: 1,
        userId: user3.id,
      },
    ],
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
