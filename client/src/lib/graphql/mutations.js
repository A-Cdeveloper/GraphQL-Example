import { gql } from "@apollo/client";
//import { gql } from "@apollo/client";
import { jobDatailFragment } from "./queries";

export const ADD_JOB_MUTATION = gql`
  mutation CreateJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDatailFragment}
`;

export const DELETE_JOB_MUTATION = gql`
  mutation DeleteJob($id: ID!) {
    deleteJob(id: $id) {
      title
    }
  }
`;
