import { PrismaClient } from '@prisma/client';

// Instantiate Prisma client to handle database interactions
const prisma = new PrismaClient();

async function main() {
    // Define seed data for initial user population
    const users = [
        {
            email: 'john.doe@example.com',
            name: 'John Doe',
        },
        {
            email: 'jane.smith@example.com',
            name: 'Jane Smith',
        },
        {
            email: 'bob.johnson@example.com',
            name: 'Bob Johnson',
        },
    ];

    // Iterate through each user and perform an upsert operation
    // If the user already exists (matched by email), do nothing (empty update object)
    // Otherwise, create a new user with provided data
    for (const user of users) {
        await prisma.user.upsert({
            where: { email: user.email }, // Unique constraint to determine existence
            update: {},                   // No update logic defined; can be extended later
            create: user,                 // Insert new user if not existing
        });
    }

    // Log success message after seeding is complete
    console.log('Seed data created successfully!');
}

// Execute main function and handle any uncaught errors gracefully
main()
    .catch((e) => {
        console.error(e);    // Log any unexpected errors
        process.exit(1);     // Ensure non-zero exit code on failure
    })
    .finally(async () => {
        await prisma.$disconnect(); // Always disconnect Prisma client to clean up resources
    });