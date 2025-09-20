import { apolloClient } from "./client";
//import { gql } from "graphql-request";
import { gql } from "@apollo/client";

export const getJobs = async () => {
  const query = gql`
    {
      jobs {
        id
        title
        date
        company {
          name
        }
      }
    }
  `;
  //const { jobs } = await client.request(query);

  const {
    data: { jobs },
  } = await apolloClient.query({ query, fetchPolicy: "network-only" });
  return jobs;
};

export const jobDatailFragment = gql`
  fragment JobDetail on Job {
    id
    title
    date
    company {
      id
      name
    }
    description
  }
`;

export const jobByIdQuery = gql`
  query GetJobById($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDatailFragment}
`;

//////////////////////////////////////////////////
export const getJobById = async (id) => {
  //const { job } = await client.request(query, { id });

  const {
    data: { job },
  } = await apolloClient.query({ query: jobByIdQuery, variables: { id } });

  return job;
};

//////////////////////////////////////////////////

export const COMPANY_BY_ID_QUERY = gql`
  query GetCompanyById($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
        date
      }
    }
  }
`;

// export const getCompanyById = async (id) => {
//   const {
//     data: { company },
//   } = await apolloClient.query({ query: companyByIdQuery, variables: { id } });
//   return company;
// };
