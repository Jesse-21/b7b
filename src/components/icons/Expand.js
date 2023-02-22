import { Icon } from "@chakra-ui/icon";

export const Expand = (props) => {
  return (
    <Icon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792">
        <path
          fill="currentColor"
          d="M883 1056q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19H192q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23zm781-864v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10L919 759q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45z"
        ></path>
      </svg>
    </Icon>
  );
};
