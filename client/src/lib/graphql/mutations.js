import { gql } from "@apollo/client";
import { apolloClient } from "./client";
import { jobByIdQuery } from "./queries";
//import { gql } from "@apollo/client";
import { jobDatailFragment } from "./queries";

export const createJobMutation = async ({ title, description }) => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        ...JobDetail
      }
    }
    ${jobDatailFragment}
  `;

  // const { job: newJob } = await client.request(mutation, {
  //   input: { title, description },
  // });

  const {
    data: { job: newJob },
  } = await apolloClient.mutate({
    mutation,
    variables: {
      input: { title, description },
    },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: jobByIdQuery,
        variables: { id: data.job.id },
        data,
      });
    },
  });
  return newJob;
};

export const deleteJobMutation = async ({ id }) => {
  const mutation = gql`
    mutation DeleteJob($id: ID!) {
      deleteJob(id: $id) {
        title
      }
    }
  `;
  // const { job: deletedJob } = await client.request(mutation, { id });

  const {
    data: { deleteJob: deletedJob },
  } = await apolloClient.mutate({
    mutation,
    variables: { id },
  });
  return deletedJob;
};
