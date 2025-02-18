export const userTypeDefs = `#graphql
  directive @auth on FIELD_DEFINITION
  directive @requiresRole(role: Role!) on FIELD_DEFINITION

  enum Role {
    user
    admin
    super_admin
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    role: Role!
    createdAt: String!
    updatedAt: String!
  }

  type AuthResponse {
    user: User!
    token: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    email: String
  }

  type Query {
    me: User! @auth
    users: [User!]! @requiresRole(role: admin)
    userById(id: ID!): User @requiresRole(role: admin)
  }

  type Mutation {
    register(input: RegisterInput!): AuthResponse!
    login(input: LoginInput!): AuthResponse!
    updateUser(id: ID!, input: UpdateUserInput!): User! @requiresRole(role: admin)
    deleteUser(id: ID!): Boolean! @requiresRole(role: admin)
    updateUserRole(userId: ID!, role: Role!): User! @requiresRole(role: super_admin)
  }
`; 