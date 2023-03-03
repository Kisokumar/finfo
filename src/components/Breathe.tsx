// src/components/breathe.js
import React from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export default function BreathingComponent(props: any) {
  const fadeInOut = keyframes`
0% { opacity: 0.3; }
50% { opacity: 1; }
100% { opacity: 0.3; }
`;

  const Container = styled.div`
    // animation: ${fadeInOut} 3s cubic-bezier(0.86, 0.83, 0.32, 0.32) infinite;
    animation: ${fadeInOut} 3s cubic-bezier(0.52, 0.26, 0.24, 1) infinite;
  `;
  const child = React.Children.only(props.children);
  return <Container>{child}</Container>;
}
