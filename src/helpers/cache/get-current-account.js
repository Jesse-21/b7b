import { GET_CURRENT_ACCOUNT } from "../../graphql/queries/GET_CURRENT_ACCOUNT";
import { PRIVATE_ACCOUNT_FIELDS } from "../../graphql/fragments/PRIVATE_ACCOUNT_FIELDS.js";

/** Get current account from apollo client cache */
export const getCurrentAccount = ({ client }) =>
  client.readQuery({
    query: GET_CURRENT_ACCOUNT,
  });

export const getCurrentAccountById = ({ client, id }) => {
  return client.readFragment({
    id: `Account:${id}`,
    fragment: PRIVATE_ACCOUNT_FIELDS,
    fragmentName: "PrivateAccountFields",
  });
};
