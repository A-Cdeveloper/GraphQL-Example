import { gql } from "@apollo/client";

export const GET_JOBS_QUERY = gql`
  query GetJobs($limit: Int, $offset: Int) {
    jobs(limit: $limit, offset: $offset) {
      items {
        id
        title
        date
        company {
          name
        }
      }
      totalCount
    }
  }
`;

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

export const GET_JOB_BY_ID_QUERY = gql`
  query GetJobById($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDatailFragment}
`;

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
