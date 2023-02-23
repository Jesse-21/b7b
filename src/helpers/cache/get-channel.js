import { CORE_CHANNELS_FIELDS } from "../../graphql/fragments/CORE_CHANNELS_FIELDS";

/** Get channel from apollo client cache */
export const getChannel = ({ client, channelId }) =>
  client.readFragment({
    id: `Channel:${channelId}`,
    fragment: CORE_CHANNELS_FIELDS,
    fragmentName: "CoreChannelFields",
  });
