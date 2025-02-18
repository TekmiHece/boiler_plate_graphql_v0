import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import helmet from 'helmet';
import { environment } from '@/config/environment';
import { connectDB } from '@/config/database';
import logger from '@/utils/logger';
import { authMiddleware, AuthRequest } from '@/middlewares/auth.middleware';
import { userTypeDefs } from '@/graphql/schema/user.schema';
import { userResolvers } from '@/graphql/resolvers/user.resolver';
import { Response, NextFunction } from 'express';
import { UserRole, IUser } from '@/models/user.model';
import { AppError } from '@/utils/error';
import { authDirectiveTransformer } from '@/graphql/directives/auth.directive';
import { makeExecutableSchema } from '@graphql-tools/schema';
import jwt from 'jsonwebtoken';
import { User } from '@/models/user.model';
import { loadSchemas, loadResolvers } from '@/utils/schema-loader';


async function startServer() {
  const app = express();
  
  // Database connection
  await connectDB();

  // Security middleware
  if (environment.nodeEnv === 'production') {
    app.use(helmet());
  } else {
    app.use(cors());
  }

  let schema = makeExecutableSchema({
    typeDefs: loadSchemas(),
    resolvers: loadResolvers()
  });

  // Direktifleri uygula
  schema = authDirectiveTransformer(schema);

  const server = new ApolloServer({
    schema,
    formatError: (error) => {
      logger.error('GraphQL Error:', error);
      return error;
    },
    introspection: true
  });

  await server.start();

  // Apply middleware
  app.use(
    '/graphql',
    express.json(),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      // Block introspection queries for non-admin users
      if (req.body.query?.includes('__schema') || req.body.query?.includes('__type')) {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
          return next(new AppError('Authentication required for schema introspection', 401));
        }

        try {
          const decoded = jwt.verify(token, environment.jwtSecret) as { sub: string };
          const user = await User.findById(decoded.sub);
          
          if (!user || user.role === UserRole.USER) {
            return next(new AppError('Insufficient permissions for schema introspection', 403));
          }
        } catch (error) {
          return next(new AppError('Invalid token', 401));
        }
      }

      const operationName = req.body.operationName;
      
      // Login her zaman erişilebilir
      if (operationName === 'login') {
        return next();
      }

      // Register sadece token olmayanlara açık
      if (operationName === 'register') {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
          return next(new AppError('Authenticated users cannot register', 403));
        }
        return next();
      }
      
      // Diğer tüm işlemler için auth kontrolü
      return authMiddleware(req, res, next);
    },
    expressMiddleware(server, {
      context: async ({ req }) => ({
        user: (req as AuthRequest).user,
        operation: req.body.operationName
      })
    })
  );

  // Start server
  app.listen(environment.port, () => {
    logger.info(`Server is running on port ${environment.port}`);
  });
}

startServer().catch((error) => {
  logger.error('Server startup error:', error);
  process.exit(1);
}); 