import { Icon } from "@chakra-ui/react";

export const Image = (props) => {
  return (
    <Icon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
        <path
          fill="currentColor"
          d="M23.75 2H1.25A1.25 1.25 0 000 3.25v18.5A1.25 1.25 0 001.25 23h22.5A1.25 1.25 0 0025 21.75V3.25A1.25 1.25 0 0023.75 2zM7.5 6A2.5 2.5 0 115 8.5 2.5 2.5 0 017.5 6zM4 18s.78-5.16 3.19-5.16c2.05 0 2.75 3.78 4.78.76 2.27-3.38 3.93-7.68 9 4.4z"
        ></path>
      </svg>
    </Icon>
  );
};
