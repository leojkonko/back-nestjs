import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'password123',
    },
    {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'password456',
    },
    {
      email: 'bob.johnson@example.com',
      name: 'Bob Johnson',
      password: 'password789',
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });