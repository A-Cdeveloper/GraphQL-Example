import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";
import { deleteJobMutation } from "../lib/graphql/mutations";

function JobList({ jobs }) {
  const [error, setError] = useState(null);
  return (
    <>
      {error && <div className="notification is-danger">{error}</div>}
      <ul className="box">
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} onError={setError} />
        ))}
      </ul>
    </>
  );
}

function JobItem({ job, onError }) {
  const title = job.company ? `${job.title} at ${job.company.name}` : job.title;

  return (
    <li className="media">
      <div className="media-left has-text-grey">{formatDate(job.date)}</div>
      <div className="media-content">
        <Link to={`/jobs/${job.id}`}>{title}</Link>
      </div>
      <div
        onClick={async () => {
          try {
            await deleteJobMutation({ id: job.id });
          } catch (error) {
            onError(error.errors[0].message);
          }
        }}
        className="is-uppercase is-small is-danger is-cursor-pointer"
      >
        delete
      </div>
    </li>
  );
}

export default JobList;
