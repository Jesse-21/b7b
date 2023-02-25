import React from "react";
import { useQuery } from "@apollo/client";

import { GET_COMMUNITY_BY_DOMAIN_OR_TOKEN_ID } from "../graphql/queries/GET_COMMUNITY_BY_DOMAIN_OR_TOKEN_ID";

export const CommunityContext = React.createContext({
  community: null,
  loading: false,
  error: null,
});
CommunityContext.displayName = "CommunityContext";

export const useCommunityContext = () => React.useContext(CommunityContext);

export const CommunityContextProvider = ({ children, domain, tld = "beb" }) => {
  const { data, loading, error } = useQuery(
    GET_COMMUNITY_BY_DOMAIN_OR_TOKEN_ID,
    {
      variables: {
        bebdomain: domain,
        tld,
      },
    }
  );

  const community = React.useMemo(() => {
    return data?.CommunityQuery?.getCommunityByDomainOrTokenId;
  }, [data?.CommunityQuery?.getCommunityByDomainOrTokenId]);

  return (
    <CommunityContext.Provider
      value={{
        community,
        loading,
        error,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
