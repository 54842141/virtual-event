import React, { FC } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import StyledLink from './StyledLink';

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const VideoPlayerContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

const StyledRedirect = styled(StyledLink)`
  width: 100%;
  height: 100%;
  display: block;
`;

interface BannerSwitchProps {
 banner: any
}

const BannerSwitch: FC<BannerSwitchProps> = ({ banner }) => {
  const { id } = useParams<{ id: string }>();
  switch (banner.type) {
    case 'IMAGE': {
      const imageComponent = <StyledImage src={banner.src} />;
      if (banner.redirectUrl) {
        if (banner.externalLink) {
          return (
            <a href={banner.externalLinkRedirectUrl}>
              {imageComponent}
            </a>
          );
        }
        return (
          <StyledRedirect to={`/events/${id}/${banner.redirectUrl}`}>
            {imageComponent}
          </StyledRedirect>
        );
      }
      return imageComponent;
    }
    case 'VIDEO': {
      return (
        <VideoPlayerContainer>
          <ReactPlayer
            url={banner.src}
            id={banner.src}
            width="100%"
            height="100%"
          />
        </VideoPlayerContainer>
      );
    }
    case 'IFRAME': {
      return <StyledIframe src={banner.src} title={banner.id} />;
    }
    default: {
      return null;
    }
  }
};

export default BannerSwitch;
