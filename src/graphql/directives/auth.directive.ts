import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { UserRole } from '@/models/user.model';
import { AppError } from '@/utils/error';

export function authDirectiveTransformer(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, 'auth')?.[0];
      const requiresRole = getDirective(schema, fieldConfig, 'requiresRole')?.[0];

      if (authDirective || requiresRole) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          if (!context.user) {
            throw new AppError('Authentication required', 401);
          }

          if (requiresRole) {
            const requiredRole = requiresRole.role as UserRole;
            const userRole = context.user.role as UserRole;
            
            const roleHierarchy = {
              [UserRole.SUPER_ADMIN]: 3,
              [UserRole.ADMIN]: 2,
              [UserRole.USER]: 1
            };

            if (roleHierarchy[userRole] < roleHierarchy[requiredRole]) {
              throw new AppError('Insufficient permissions', 403);
            }
          }

          return resolve(source, args, context, info);
        };
      }
      return fieldConfig;
    },
  });
} 