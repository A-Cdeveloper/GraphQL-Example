import { createJob, deleteJob, getJob, getJobs, updateJob } from "./db/jobs.js";

import { GraphQLError } from "graphql";
import { getCompany } from "./db/companies.js";

export const resolvers = {
  Query: {
    jobs: () => {
      return getJobs();
    },
    job: async (_, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFoundError(`Job with id ${id} not found`);
      }
      return job;
    },
    company: async (_, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError(`Company with id ${id} not found`);
      }
      return company;
    },
  },

  Mutation: {
    createJob: async (_, { input: { title, description } }, { user }) => {
      if (!user) {
        throw notAuthorizedError("You must be logged in to create a job");
      }

      return createJob({ companyId: user.companyId, title, description });
    },

    deleteJob: async (_, { id }, { user }) => {
      if (!user) {
        throw notAuthorizedError("You must be logged in to delete a job");
      }
      const job = await deleteJob(id, user.companyId);
      if (!job) {
        throw notFoundError(`Job with id ${id} not found`);
      }
      return job;
    },

    updateJob: async (_, { input: { id, title, description } }, { user }) => {
      if (!user) {
        throw notAuthorizedError("You must be logged in to update a job");
      }
      const job = await updateJob({
        id,
        companyId: user.companyId,
        title,
        description,
      });
      if (!job) {
        throw notFoundError(`Job with id ${id} not found`);
      }
      return job;
    },
  },

  Company: {
    jobs: async (company) => {
      const jobs = await getJobs();
      return jobs.filter((job) => job.companyId === company.id);
    },
  },

  Job: {
    date: (job) => {
      return toIsoDate(job.createdAt);
    },
    company: (job) => {
      return getCompany(job.companyId);
    },
  },
};

////////////////////////////

const notFoundError = (message) => {
  return new GraphQLError(message, {
    extensions: {
      code: "NOT_FOUND",
    },
  });
};

const notAuthorizedError = (message) => {
  return new GraphQLError(message, {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  });
};

const toIsoDate = (value) => {
  return value.slice(0, "yyyy-MM-dd".length);
};
