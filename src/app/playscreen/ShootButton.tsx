import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }
  100% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
`;

// Styled Components
const ShootButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
  overflow: hidden;
  background-size: 300% 300%;
  backdrop-filter: blur(1rem);
  transition: 0.5s;
  animation: ${gradientAnimation} 5s ease infinite;
  border: double 4px transparent;
  background-image: linear-gradient(#212121, #212121),
    linear-gradient(137.48deg, #ffdb3b 10%, #fe53bb 45%, #8f51ea 67%, #0044ff 87%);
  background-origin: border-box;
  background-clip: content-box, border-box;

//   &:hover {
//     transform: scale(1.1);
//   }

  &:active {
    border: double 4px #fe53bb;
    background-origin: border-box;
    background-clip: content-box, border-box;
    animation: none;
  }
`;

const ContainerStars = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: 0.5s;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;

  ${ShootButtonWrapper}:hover & {
    z-index: 1;
    background-color: #212121;
  }
`;

const GlowContainer = styled.div`
  position: absolute;
  display: flex;
  width: 12rem;
`;

const Circle = styled.div`
  width: 100%;
  height: 30px;
  filter: blur(2rem);
  animation: ${pulseAnimation} 4s infinite;
  z-index: -1;

  &:nth-of-type(1) {
    background: rgba(254, 83, 186, 0.636);
  }

  &:nth-of-type(2) {
    background: rgba(142, 81, 234, 0.704);
  }

  ${ShootButtonWrapper}:active & {
    background: #fe53bb;
  }
`;

const StrongText = styled.strong`
  z-index: 2;
  font-family: 'Avalors Personal Use';
  font-size: 20px;
  letter-spacing: 5px;
  color: #ffffff;
  text-shadow: 0 0 4px white;
`;

const Stars = styled.div`
  position: relative;
  background: transparent;
  width: 200rem;
  height: 200rem;

  &::after {
    content: '';
    position: absolute;
    top: -10rem;
    left: -100rem;
    width: 100%;
    height: 100%;
    animation: animStarRotate 90s linear infinite;
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -50%;
    width: 170%;
    height: 500%;
    animation: animStar 60s linear infinite;
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
    opacity: 0.5;
  }
`;

const ShootButton = () => {
  return (
    <ShootButtonWrapper type="button">
      <StrongText>Shoot</StrongText>
      <ContainerStars>
        <Stars />
      </ContainerStars>
      <GlowContainer>
        <Circle />
        <Circle />
      </GlowContainer>
    </ShootButtonWrapper>
  );
};

export default ShootButton;
