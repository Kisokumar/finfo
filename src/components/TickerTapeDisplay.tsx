import React, { Children, ReactNode } from "react";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export default function TickerTapeDisplay(props: any) {
  const numberOfSlides = Children.count(props.children);

  const scrollAnimation = keyframes`
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(${props.slideWidth}px * ${numberOfSlides} * -1));
    }
  `;

  const CarouselWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    width: calc((${props.slidesInView} / ${props.slideWidth}));
  `;

  const CarouselSlide = styled.div`
    animation: ${scrollAnimation} ${props.iterationTime}s linear infinite;
    display: flex;
    flex-direction: column;

    margin: 0px 10px;
    flex: 0 0 auto;
    width: ${props.slideWidth}px;

    &:hover {
      * {
        transform: translateY(-5px);
        transition-duration: 500ms;
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
      .slide {
        animation-play-state: paused;
      }
    }
  `;

  return (
    <>
      <Carousel>
        <CarouselWrapper>
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
        </CarouselWrapper>
      </Carousel>
    </>
  );
}
