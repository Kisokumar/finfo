import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";

import { UseColorModeValue } from "../Hooks";

/**
 * Displays popover with link button
 *
 * @param {object} props - The component props.
 * @param {ReactChildren} props.children - children to render
 * @returns {JSX.Element}
 */

<InfoPopover />;

export default function InfoPopover(props: any) {
  return (
    <Flex justify={"center"}>
      <Popover>
        <PopoverTrigger>
          <Button
            w={props.buttonWidth}
            h={props.buttonHeight}
            textColor={props.titleColor}
            fontWeight={props.textWidth}
          >
            {props.buttonLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          borderColor={"gray.600"}
          p={props.contentPadding}
          ml={8}
          mt={0}
          bg={UseColorModeValue("gray.700", "gray.900")}
        >
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{props.title}</PopoverHeader>
          <PopoverBody>{props.children}</PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
