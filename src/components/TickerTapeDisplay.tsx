import { Flex, useBreakpointValue } from "@chakra-ui/react";
import React, { Children, ReactNode } from "react";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export default function TickerTapeDisplay(props: any) {
  const width = useBreakpointValue(props.slideWidth);

  const numberOfSlides = Children.count(props.children);

  const scrollAnimation = keyframes`
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(${width}px * ${numberOfSlides} * -1));
    }
  `;

  const CarouselWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    // overflow: hidden;
    width: calc((${props.slidesInView} / ${width}));
  `;

  const CarouselSlide = styled.div`
    animation: ${scrollAnimation} ${props.iterationTime}s infinite linear;
    display: flex;
    flex-direction: column;
    margin: 10px 10px;
    flex: 0 0 auto;
    width: ${width}px;

    @media (hover: hover) {
      &:hover {
        div {
          transform: scale(1.02);
          transition-duration: 500ms;
        }
      }
    }
  `;

  const Carousel = styled.section`
    overflow: hidden;
    display: flex;

    justify-content: center;
    align-items: center;
    width: calc(2 * ${numberOfSlides});

    &:hover {
      .carouselSlides {
        background-color: rgba(45, 0, 23, 0.2);
      }
      .slide {
        animation-play-state: paused;
      }
    }
    @media (hover: hover) {
      &:hover {
        .carouselSlides {
          background-color: transparent;
        }
      }
    }
  `;

  return (
    <>
      <Carousel>
        <CarouselWrapper className="carouselSlides">
          <Flex dir="column">
            {props.children.map((child: ReactNode, idx: number) => {
              return (
                <CarouselSlide className="slide" key={idx}>
                  {child}
                </CarouselSlide>
              );
            })}
            {props.children.map((child: ReactNode, idx: number) => {
              return (
                <CarouselSlide className="slide" key={idx}>
                  {child}
                </CarouselSlide>
              );
            })}
          </Flex>
        </CarouselWrapper>
      </Carousel>
    </>
  );
}
