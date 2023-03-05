import React from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { useCommunityContext } from "../../context/CommunityContext";

import { GET_COMMUNITY_ROLES } from "../../graphql/queries/GET_COMMUNITY_ROLES";

import { RolesTable } from "../../components/roles/RolesTable";

const withCommunityRolesContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const { community, loading } = useCommunityContext();
    const navigate = useNavigate();
    const { data, loading: rolesLoading } = useQuery(GET_COMMUNITY_ROLES, {
      variables: { id: community?._id },
      skip: !community?._id,
    });
    console.log("withCommunityRolesContext");
    const isLoading = React.useMemo(
      () => loading || rolesLoading,
      [loading, rolesLoading]
    );
    const communityDomain = React.useMemo(() => {
      return community?.bebdomain;
    }, [community?.bebdomain]);

    const roles = React.useMemo(() => {
      return data?.CommunityQuery?.getCommunityById?.roles;
    }, [data]);
    const onClick = React.useCallback(
      (id) => {
        navigate(`/${communityDomain}/admin/roles/${id}`);
      },
      [navigate, communityDomain]
    );

    if (isLoading) return <>Loading...</>;
    if (!community?._id) return <></>;

    return (
      <Memo
        communityDomain={community?.bebdomain}
        communityTld={community?.tld}
        roles={roles}
        onClick={onClick}
      />
    );
  };
};

export const RolesTableWithContext = withCommunityRolesContext(RolesTable);
