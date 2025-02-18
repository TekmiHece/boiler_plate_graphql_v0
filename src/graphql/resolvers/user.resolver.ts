import { AuthService } from '@/services/auth.service';
import { IUser, UserRole, User } from '@/models/user.model';
import { AppError } from '@/utils/error';
import { userQueries } from './user/queries';
import { userMutations } from './user/mutations';

const checkPermission = (user: IUser, requiredRole: UserRole) => {
  const roleHierarchy = {
    [UserRole.SUPER_ADMIN]: 3,
    [UserRole.ADMIN]: 2,
    [UserRole.USER]: 1
  };

  if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
    throw new AppError('Insufficient permissions', 403);
  }
};

export const userResolvers = {
  Query: userQueries,
  Mutation: userMutations
}; 