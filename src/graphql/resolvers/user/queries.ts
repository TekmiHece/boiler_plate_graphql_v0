import { IUser, User } from '@/models/user.model';

export const userQueries = {
  me: (_: any, __: any, { user }: { user: IUser }) => user,
  users: async () => User.find(),
  userById: async (_: any, { id }: { id: string }) => User.findById(id),
}; 