export const baseTypeDefs = `#graphql
  directive @auth on FIELD_DEFINITION
  directive @requiresRole(role: Role!) on FIELD_DEFINITION

  enum Role {
    user
    admin
    super_admin
  }
`; 