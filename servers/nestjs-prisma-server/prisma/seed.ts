import { Prisma, PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'bob@prisma.io',
    firstname: 'Bob',
    lastname: 'Prisma',
    password: '$2b$10$o6KioO.taArzboM44Ig85O3ZFZYZpR3XD7mI8T29eP4znU/.xyJbW', // "secret43"
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
        },
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
        },
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
        },
        {
          title: 'Follow Nexus Prisma plugin',
          content: 'https://github.com/prisma-labs/nexus-prisma',
          published: true,
        },
      ],
    },
  },
];

/*
async function main() {
  //-- Seeding data
}
*/

async function main() {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  console.log("Seeding data...");

  const user1 = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      firstname: 'Alice',
      lastname: 'Prisma',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      // role: 'USER',
      posts: {
        create: {
          title: 'Join us for Prisma Day 2019 in Berlin',
          content: 'https://www.prisma.io/day/',
          published: true,
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bart@simpson.com',
      firstname: 'Bart',
      lastname: 'Simpson',
      // role: 'ADMIN',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      posts: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: false,
          },
        ],
      },
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'john@prisma.io', },
    update: {},
    create: {
      email: 'john@prisma.io',
      firstname: 'John',
      lastname: 'Prisma',
      password: '$2b$10$ZjONRZAxqX2pLoPax2xdcuzABTUEsFanQI6yBYCRtzpRiU4/X1uIu', // "graphql"
    },
  });

  console.log({ user1, user2, user3 });

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding data done...");
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
