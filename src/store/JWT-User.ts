import { JWTMetadata } from './Cimplico_Marketplace_Typescript_Definitions';

//user 1 as Marco, Cimplico having vendor status, AuditPro as user firm
const user1: JWTMetadata = {
  uuid: '01848bf0-aea0-4a7f-b220-e8d2aaf72f93',
  workpapers: {
    firms: [
      {
        id: '6367742e-e1b0-48ec-af5d-da92778e4d13',
        name: 'Cimplico',
        shortId: '6367742e',
      },
      {
        id: '9c4f4554-003c-43af-8343-b1e49d48f51c',
        name: 'AuditPro Systems',
        shortId: '9c4f4554',
      },
    ],
  },
  marketplace: {
    role: 'user',
  },
};

//User 2 as Yash, SKY having vendor status but EY as user firm
const user2: JWTMetadata = {
  uuid: 'ae181499-37bf-466d-afd5-b4a1d75d1662',
  workpapers: {
    firms: [
      {
        id: '5a694a45-1d17-4b8a-9e41-9ac7f17b96f6',
        name: 'Sky Accounting',
        shortId: '034d07f0',
      },
      {
        id: 'befd5f57-a674-4810-a497-df6a568a76e2',
        name: 'EY',
        shortId: 'befd5f57',
      },
    ],
  },
  marketplace: {
    role: 'user',
  },
};

export { user1, user2 };
