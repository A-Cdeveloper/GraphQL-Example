import { useQuery } from "@apollo/client/react";
import { COMPANY_BY_ID_QUERY } from "./queries";

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
