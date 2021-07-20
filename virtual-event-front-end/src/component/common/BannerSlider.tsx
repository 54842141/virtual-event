import React, { FC } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import BannerSwitch from './BannerSwitch';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const StyledCarousel = styled(Carousel)`
  width: 100%;
  height: 100%;
  min-height: 100%;

  &.carousel-root .carousel {
    height: 100%;
  }
  
  &.carousel .slider {
    height: 100%;
  }

  &.carousel-root .carousel .slider-wrapper {
    height: 100%;
  }
  
  &.carousel-root .carousel .slider-wrapper .slider {
    height: 100%;
  }
  &.carousel-root .carousel .slide iframe {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;

interface SliderProps {
  banners: any[]
}

const BannerSlider: FC<SliderProps> = ({ banners }) => (
  <StyledCarousel
    infiniteLoop
    autoPlay
    interval={3000}
    showArrows={false}
    showStatus={false}
    showIndicators={false}
    showThumbs={false}
  >
    {banners.map((banner) => (
      <BannerSwitch key={banner.id} banner={banner} />
    ))}
  </StyledCarousel>
);

export default BannerSlider;
