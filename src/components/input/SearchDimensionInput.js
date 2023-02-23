import React from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { IconButton } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";

export const SearchDimensionInput = ({ size, ...props }) => {
  const [value, setValue] = React.useState("");
  const onChange = React.useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setValue(e.target.value);
    },
    [setValue]
  );

  return (
    <>
      <InputGroup size={size}>
        <Input
          placeholder={"Search dimension"}
          value={value}
          onChange={onChange}
          type="text"
          {...props}
        />
        <InputRightElement>
          <IconButton
            size="md"
            icon={<SearchIcon />}
            as="a"
            href={`/#/d/${value}`}
          ></IconButton>
        </InputRightElement>
      </InputGroup>
    </>
  );
};
