import { gql } from '@apollo/client';

export const EVENTS_QUERY = gql`
  query Events($name: String, $skip: Int!, $take: Int!) {
    events(where: {name: {contains: $name}}, orderBy: [{start: asc}], skip: $skip, take: $take) {
      name
      start
      end
      ticketsSold
      iconUrl
      mediaUrl
      grossRevenue
      publishingStatus
    }
  }
`;


