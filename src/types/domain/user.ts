import { Tables } from '../supabase';

export type UserRow = Tables<'user'>;

export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
  isAdmin: boolean;
};

export function mapUserFromDb(row: UserRow): User {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    profileImage: row.profile_image,
    isAdmin: row.is_admin,
  };
}
