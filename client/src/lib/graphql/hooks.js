import { useMutation, useQuery } from "@apollo/client/react";
import { ADD_JOB_MUTATION, DELETE_JOB_MUTATION } from "./mutations";
import {
  COMPANY_BY_ID_QUERY,
  GET_JOBS_QUERY,
  GET_JOB_BY_ID_QUERY,
} from "./queries";

export const useCompanyById = (id) => {
  const { loading, error, data } = useQuery(COMPANY_BY_ID_QUERY, {
    variables: { id },
  });

  return {
    loading,
    error: Boolean(error),
    company: data?.company,
  };
};

export const useJobs = () => {
  const { loading, error, data } = useQuery(GET_JOBS_QUERY, {
    fetchPolicy: "network-only",
  });
  return {
    loading,
    error: Boolean(error),
    jobs: data?.jobs,
  };
};

export const useJob = (id) => {
  const { loading, error, data } = useQuery(GET_JOB_BY_ID_QUERY, {
    variables: { id },
  });
  return {
    loading,
    error: Boolean(error),
    job: data?.job,
  };
};

export const useCreateJob = () => {
  const [mutate, { loading, error }] = useMutation(ADD_JOB_MUTATION);

  const createJob = async (title, description) => {
    const {
      data: { job },
    } = await mutate({
      variables: { input: { title, description } },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_JOB_BY_ID_QUERY,
          variables: { id: data.job.id },
          data,
        });
      },
    });
    return job;
  };

  return { createJob, loading, error };
};

export const useDeleteJob = () => {
  const [mutate, { loading, error }] = useMutation(DELETE_JOB_MUTATION);

  const deleteJob = async (id) => {
    const {
      data: { deleteJob: job },
    } = await mutate({ variables: { id } });
    return job;
  };

  return { deleteJob, loading, error };
};
