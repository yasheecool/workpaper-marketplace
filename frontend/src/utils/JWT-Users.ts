import { JWTMetadata } from '../types/types';

//user 1 as Marco, Cimplico having vendor status, AuditPro as user firm
const user1: JWTMetadata = {
  uuid: '01848bf0-aea0-4a7f-b220-e8d2aaf72f93',
  workpapers: {
    firms: [
      {
        id: '6367742e-e1b0-48ec-af5d-da92778e4d13',
        shortId: '6367742e',
      },
      {
        id: '9c4f4554-003c-43af-8343-b1e49d48f51c',
        shortId: '9c4f4554',
      },
    ],
  },
  marketplace: {
    isAdmin: false,
  },
};

//User 2 as Yash, SKY having vendor status but EY as user firm
const user2: JWTMetadata = {
  uuid: 'ae181499-37bf-466d-afd5-b4a1d75d1662',
  workpapers: {
    firms: [
      {
        id: '5a694a45-1d17-4b8a-9e41-9ac7f17b96f6',
        shortId: '5a694a45',
      },
      {
        id: 'befd5f57-a674-4810-a497-df6a568a76e2',
        shortId: 'befd5f57',
      },
    ],
  },
  marketplace: {
    isAdmin: false,
  },
};

const user3: JWTMetadata = {
  uuid: '9e14f1bb-7c95-475f-8c4b-542d626285a9',
  workpapers: {
    firms: [],
  },
  marketplace: {
    isAdmin: true,
  },
};

export { user1, user2, user3 };
