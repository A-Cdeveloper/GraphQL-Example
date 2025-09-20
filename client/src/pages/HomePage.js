import { useJobs } from "../lib/graphql/hooks";

import JobList from "../components/JobList";

function HomePage() {
  const { loading, error, jobs } = useJobs();

  if (!jobs && !error) {
    return <div>no jobs found</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error is-danger">Error:{error}</div>;
  }

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
