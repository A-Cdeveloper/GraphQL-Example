import { useParams } from "react-router";
import JobList from "../components/JobList";
import { useCompanyById } from "../lib/graphql/hooks";

function CompanyPage() {
  const { companyId } = useParams();

  const { loading, error, company } = useCompanyById(companyId);

  if (!company && !error) {
    return <div>no data found</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error is-danger">Error:{error}</div>;
  }

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>

      <h2 className="title is-5">Jobs at {company.name}</h2>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyPage;
