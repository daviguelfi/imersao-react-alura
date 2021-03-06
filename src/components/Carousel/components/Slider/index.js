import React from 'react';
import SlickSlider from 'react-slick';
import styled from 'styled-components';

const Container = styled.ul`
  padding: 0;
  margin: 0;
  .slick-prev,
  .slick-next {
    z-index: 50;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 30px;
    height: 150px;
    transform: initial;
    color: red;
    &:before {
      font-size: 30px;
    }
  }

  .slick-prev {
    left: 0;
    background: rgb(0, 0, 0, 0.5);
    border-radius: 10px;
  }
  .slick-next {
    right: 16px;
    background: rgb(0, 0, 0, 0.5);
    border-radius: 10px;
  }
`;

export const SliderItem = styled.li`
  margin-right: 16px;
  img {
    margin: 16px;
    width: 298px;
    height: 197px;
    object-fit: cover;
  }
`;

// eslint-disable-next-line react/prop-types
const Slider = ({ children }) => (
  <Container>
    <SlickSlider
      {...{
        dots: false,
        infinite: false,
        speed: 300,
        centerMode: false,
        variableWidth: true,
        adaptiveHeight: true,
      }}
    >
      {children}
    </SlickSlider>
  </Container>
);

export default Slider;
