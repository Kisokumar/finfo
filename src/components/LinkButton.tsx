import { Box, VisuallyHidden, useColorModeValue } from "@chakra-ui/react";

import Link from "next/link";
import { ReactNode } from "react";

export const LinkButton = ({
  href,
  children,
  label,
}: {
  href: string;
  children: ReactNode;
  label: string;
}) => {
  return (
    <Box
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"lg"}
      padding={4}
      marginX={2}
      h={8}
      cursor={"pointer"}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <Link href={href}>{children}</Link>
      <VisuallyHidden>{label}</VisuallyHidden>
    </Box>
  );
};

//     <chakra.button
//       as={"a"}
//       href={href}
//     >
//       <VisuallyHidden>{label}</VisuallyHidden>
//       {children}
//     </chakra.button>
