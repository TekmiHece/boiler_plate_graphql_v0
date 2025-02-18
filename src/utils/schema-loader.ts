import { readdirSync } from 'fs';
import { join } from 'path';

export const loadSchemas = () => {
  const schemaPath = join(__dirname, '../graphql/schema');
  const schemaFiles = readdirSync(schemaPath).filter(file => file.endsWith('.schema.ts'));
  
  const typeDefs = schemaFiles.map(file => {
    const schema = require(join(schemaPath, file));
    return schema.default || schema.typeDefs || Object.values(schema)[0];
  });

  return typeDefs;
};

export const loadResolvers = () => {
  const resolverPath = join(__dirname, '../graphql/resolvers');
  const resolverFiles = readdirSync(resolverPath).filter(file => file.endsWith('.resolver.ts'));
  
  const resolvers = resolverFiles.map(file => {
    const resolver = require(join(resolverPath, file));
    return resolver.default || resolver.resolvers || Object.values(resolver)[0];
  });

  return resolvers;
}; 