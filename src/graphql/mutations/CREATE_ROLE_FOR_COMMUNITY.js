import { gql } from "@apollo/client";
import { CORE_ROLE_FIELDS } from "../fragments/CORE_ROLE_FIELDS";

export const CREATE_ROLE_FOR_COMMUNITY = gql`
  ${CORE_ROLE_FIELDS}
  mutation CREATE_ROLE_FOR_COMMUNITY(
    $communityId: ID!
    $roleInput: RoleInput
    $ruleDataInputs: [IndexerRuleDataInput]
  ) {
    createRoleForCommunity(
      communityId: $communityId
      roleInput: $roleInput
      ruleDataInputs: $ruleDataInputs
    ) {
      code
      success
      message
      role {
        ...CoreRoleFields
        community {
          _id
          tokenId
        }
      }
    }
  }
`;
