import { useState } from "react";
import JobList from "../components/JobList";
import PaginationBar from "../components/PaginationBar";
import { useJobs } from "../lib/graphql/hooks";

const JOBS_PER_PAGE = 5;

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, jobs, count } = useJobs(
    JOBS_PER_PAGE,
    (currentPage - 1) * JOBS_PER_PAGE
  );

  const pageCount = Math.ceil(count / JOBS_PER_PAGE);

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
      <div>
        <PaginationBar
          currentPage={currentPage}
          totalPages={pageCount}
          onPageChange={setCurrentPage}
        />
        {/* <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          {currentPage} of {pageCount}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === pageCount}
        >
          Next
        </button> */}
      </div>
      <JobList jobs={jobs.items} />
    </div>
  );
}

export default HomePage;
