import React from "react";
import { useQuery } from "@apollo/client";

import { GET_CHANNEL } from "../graphql/queries/GET_CHANNEL";

export const ChannelContext = React.createContext({
  channel: null,
  loading: false,
  error: null,
});
ChannelContext.displayName = "ChannelContext";

export const useChannelContext = () => React.useContext(ChannelContext);

export const ChannelContextProvider = ({ children, channelId }) => {
  const { data, loading, error } = useQuery(GET_CHANNEL, {
    variables: {
      id: channelId,
    },
    skip: !channelId,
  });

  const channel = React.useMemo(() => {
    return data?.ChannelQuery?.getChannelById;
  }, [data]);

  return (
    <ChannelContext.Provider
      value={{
        channel,
        loading,
        error,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};
