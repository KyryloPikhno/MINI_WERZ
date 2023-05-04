import {gql} from "@apollo/client";

export const USER_QUERY = gql`
  query User {
      firstName
      lastName
      fullName
      username
  }
`;

