import { Box, VisuallyHidden, useColorModeValue } from "@chakra-ui/react";

import Link from "next/link";
import { ReactNode } from "react";

export const LinkButton = ({
  href,
  children,
  label,
  newTab,
}: {
  href: string;
  children: ReactNode;
  label: string;
  newTab: boolean;
}) => {
  return (
    <Link href={href} target={newTab ? "_blank" : ""}>
      <Box
        bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
        rounded={"lg"}
        p={4}
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
        {children}
        <VisuallyHidden>{label}</VisuallyHidden>
      </Box>
    </Link>
  );
};

//     <chakra.button
//       as={"a"}
//       href={href}
//     >
//       <VisuallyHidden>{label}</VisuallyHidden>
//       {children}
//     </chakra.button>
