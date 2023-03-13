import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useRef } from "react";

import { SearchIcon } from "@chakra-ui/icons";
import { UseColorModeValue } from "../Hooks";

export enum FieldType {
  NUM = "num",
  ALPHA = "alpha",
  ALPHANUM = "alphanum",
}

interface InputFieldProps {
  getter: number | string | undefined;
  setter: React.Dispatch<React.SetStateAction<string | undefined>>;
  placeholder?: string;
  type?: FieldType;
}

export default function StatefulNumberInput({
  setter,
  getter,
  placeholder,
  type,
}: InputFieldProps) {
  const inputRef = useRef<HTMLInputElement>();
  const [stateValue, setStateValue] = [getter, setter];
  const handleInputChange = () => {
    const newValue: string | undefined = inputRef.current?.value;

    if (type === "num") {
      const regex = new RegExp("^[0-9]*\\.?[0-9]*$");
      if (regex.test(String(newValue))) {
        setStateValue(newValue);
      }
    } else if (type === "alpha") {
      const regex = new RegExp("^[a-zA-Z]*$");
      if (regex.test(String(newValue))) {
        setStateValue(newValue);
      }
    } else if (type === "alphanum") {
      const regex = new RegExp("^[a-zA-Z0-9]*$");
      if (regex.test(String(newValue))) {
        setStateValue(newValue);
      }
    }
  };

  return (
    <Flex flexGrow={1} p={2} flexDir={["column-reverse", "row"]}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon />
        </InputLeftElement>
        <Input
          type={"number"}
          inputMode={"numeric"}
          value={String(stateValue)}
          onChange={handleInputChange}
          borderColor={UseColorModeValue("gray.300", "gray.700")}
          focusBorderColor={UseColorModeValue("purple.900", "gray.600")}
          placeholder={placeholder || "Placeholder"}
          // ref={inputRef}
        />
      </InputGroup>
    </Flex>
  );
}
