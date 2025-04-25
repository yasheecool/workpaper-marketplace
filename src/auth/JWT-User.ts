import { JWTMetadata } from './Cimplico_Marketplace_Typescript_Definitions';

const User: JWTMetadata = {
  uuid: 'user-1234',
  workpapers: {
    firms: [{ id: 'firm-1234', shortId: 'f123' }],
  },
};

export default User;
