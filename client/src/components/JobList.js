import { Link } from "react-router-dom";
import { apolloClient } from "../lib/graphql/client";
import { formatDate } from "../lib/formatters";
import { useDeleteJob } from "../lib/graphql/hooks";

function JobList({ jobs }) {
  return (
    <>
      <ul className="box">
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </ul>
    </>
  );
}

function JobItem({ job }) {
  const title = job.company ? `${job.title} at ${job.company.name}` : job.title;

  const { deleteJob, loading } = useDeleteJob();

  // if (error) {
  //   return <div className="error is-danger">Error:{error}</div>;
  // }

  return (
    <li className="media">
      <div className="media-left has-text-grey">{formatDate(job.date)}</div>
      <div className="media-content">
        <Link to={`/jobs/${job.id}`}>{title}</Link>
      </div>
      <div
        onClick={async () => {
          await deleteJob(job.id);
          await apolloClient.resetStore();
        }}
        className="is-uppercase is-small is-danger is-cursor-pointer"
      >
        {loading ? "Deleting..." : "Delete"}
      </div>
    </li>
  );
}

export default JobList;
