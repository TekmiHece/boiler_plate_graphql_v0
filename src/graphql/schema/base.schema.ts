export const baseTypeDefs = `#graphql
  type Query {
    _empty: String  # placeholder
  }

  type Mutation {
    _empty: String  # placeholder
  }

  directive @auth on FIELD_DEFINITION
  directive @requiresRole(role: Role!) on FIELD_DEFINITION

  enum Role {
    user
    admin
    super_admin
  }
`; 