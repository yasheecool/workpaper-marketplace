import { listings1, listings2 } from './listings';
import prisma from '../src/config/dbClient';
import users from './users';
import firms from './firms';
import { Firm } from '@prisma/client';

async function main() {
  await prisma.user.createMany({
    data: users,
  });

  await prisma.firm.createMany({
    data: firms as Firm[],
  });

  await prisma.vendorProfile.createMany({
    data: [
      {
        firmId: '6367742e-e1b0-48ec-af5d-da92778e4d13',
        firmEmail: 'helloworld@gmail.com',
        description: `
        Cimplico is a technology-driven consulting firm focused on modernizing how professional services firms manage their compliance, audit, and documentation workflows. Unlike traditional vendors, Cimplico combines deep accounting expertise with product design and technical implementation, enabling the creation of scalable, digital-first workpaper content. Cimplico is also the creator of the Content Management Marketplace platform. As both a platform builder and a content contributor, they are uniquely positioned to drive best practices in how reusable workpaper content is structured, shared, and managed across firms. `,
        websiteUrl: 'https://www.cimplico.com/about/',
        vendorSince: '2025-05-02T12:00:00.000Z',
      },
      {
        firmId: '5a694a45-1d17-4b8a-9e41-9ac7f17b96f6',
        firmEmail: 'helloworld@gmail.com',
        description: `Sky accounting is a mid-tier professional services firm based in Sydney, Australia, specializing in audit, compliance, and advisory services for small to medium-sized enterprises. With over two decades of experience, Sky has built a reputation for delivering practical and efficient solutions that help firms meet regulatory requirements without unnecessary complexity.
        The team at Sky includes registered auditors, compliance consultants, and industry trainers, all of whom contribute to developing standardized documentation and tools used by firms across Australia. Their approach blends technical accuracy with usability, making their content highly accessible for teams at any level of experience. `,
        websiteUrl: 'https://www.cimplico.com/about/',
        vendorSince: '2025-06-15T09:30:45.000Z',
      },
    ],
  });

  listings1.forEach(async (listing: any) => {
    await prisma.listing.create({
      data: listing,
    });

    // Not used for now
    // await prisma.listingChangeRecords.create({
    //   data: {
    //     listingId: listing.id,
    //     createdAt: listing.createdAt,
    //     createdBy: listing.createdByUserId,
    //     title: 'Listing Created',
    //     description: '',
    //   },
    // });
  });

  listings2.forEach(async (listing: any) => {
    await prisma.listing.create({
      data: listing,
    });

    //Not used for now
    // await prisma.listingChangeRecords.create({
    //   data: {
    //     listingId: listing.id,
    //     createdAt: listing.createdAt,
    //     createdBy: listing.createdByUserId,
    //     title: 'Listing Created',
    //     description: '',
    //   },
    // });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
