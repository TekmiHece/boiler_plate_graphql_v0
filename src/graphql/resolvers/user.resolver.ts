import { userQueries } from './user/queries';
import { userMutations } from './user/mutations';


export const userResolvers = {
  Query: userQueries,
  Mutation: userMutations
}; 