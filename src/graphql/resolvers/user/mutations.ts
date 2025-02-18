import { IUser, User, UserRole } from '@/models/user.model';
import { AuthService } from '@/services/auth.service';

export const userMutations = {
  register: async (_: any, { input }: { input: Partial<IUser> }) => {
    return AuthService.register({ ...input, role: UserRole.USER });
  },
  
  login: async (_: any, { input }: { input: { email: string; password: string } }) => {
    return AuthService.login(input.email, input.password);
  },

  updateUser: async (_: any, { id, input }: { id: string, input: Partial<IUser> }) => {
    return User.findByIdAndUpdate(id, input, { new: true });
  },

  deleteUser: async (_: any, { id }: { id: string }) => {
    await User.findByIdAndDelete(id);
    return true;
  },

  updateUserRole: async (_: any, { userId, role }: { userId: string, role: UserRole }) => {
    return User.findByIdAndUpdate(userId, { role }, { new: true });
  },
}; 