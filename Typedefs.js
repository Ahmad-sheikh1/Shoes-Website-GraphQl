
const typeDefs = `#graphql
  type ShoesDataHome {
    productname : String!
    img : String!
    price : Int!
    _id : ID!
    imgT : String!
    imgTh : String!
    mindetail : String!
    catagory : String!
  }


  input inputregdata {
    FirstName : String!
    LastName : String!
    Email :String!
    Password : String!
  }
  type Pend_Order {
    Name : String!
    Image : String!
    Price : Int!
  }
  input InputPendingData {
    Name : String!
    Image : String!
    Price : Int!
  }
  type RegistrationResponse {
    FirstName : String!
    LastName : String!
    Email :String!
    Password : String!
  }
  type LoginResponse {
  token: String
  loggedUser: RegistrationResponse
  }
  input InputLoginRes {
  Email : String!
  Password : String!
  }
  type Mutation {
    AddRegistrationData(inputdata : inputregdata!)  : RegistrationResponse
    AddPendingDBData(input: [InputPendingData!]!): [Pend_Order!]!
    verifyToken(token: String!): RegistrationResponse
    login(input : InputLoginRes): LoginResponse
  }

  type Query {
    getshoes: [ShoesDataHome]
    getpending: [Pend_Order]
    getRegistrationResponse : [RegistrationResponse]
  }
`;

module.exports = typeDefs;
