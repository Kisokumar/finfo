import React from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

/**
 * Component that fades in and out (to show error usually)
 *
 * @param {object} props - The component props.
 * @param {string} props.children - The name to use in the greeting message.
 * @returns {JSX.Element} props.child wrapped in styled component (fading in and out).
 */
export default function Breathe(props: any): JSX.Element {
  const fadeInOut = keyframes`
0% { opacity: 0.3; }
50% { opacity: 1; }
100% { opacity: 0.3; }
`;

  const Container = styled.div`
    animation: ${fadeInOut} 3s cubic-bezier(0.52, 0.26, 0.24, 1) infinite;
  `;
  const child = React.Children.only(props.children);
  return <Container>{child}</Container>;
}
