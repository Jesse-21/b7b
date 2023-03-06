import React from "react";
import { useLocation } from "react-router-dom";

import { config } from "../../config";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const withUriQueryParams = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return ({ children }) => {
    const query = useQuery();
    const uri =
      query.get("uri") ||
      window.localStorage.getItem("uri") ||
      config.DEFAULT_URI;

    return <Memo uri={uri}>{children}</Memo>;
  };
};
