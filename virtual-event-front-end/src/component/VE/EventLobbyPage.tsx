import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import BannerSlider from '../common/BannerSlider';
import AppBar from './AppBar';
import AnnouncementListener from './AnnouncementListener';

const LobbyContainer = styled.div<{ url: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${({ url }) => url});
  background-size: 100% 100%;
  position: relative;
`;

const BannerContainer = styled.div<{ width: number, height: number, x: number, y: number}>`
  width: ${({ width }) => `calc(${width} * 100vw)`};
  height: ${({ height }) => `calc(${height} * 100vh)`};
  position: absolute;
  top: ${({ y }) => `calc(${y} * 100vh)`};
  left: ${({ x }) => `calc(${x} * 100vw)`};
  border: 2px solid #fff;
`;

interface Event {
  name: string
  startTime: string
  endTime: string
  timeZone: string
  lobby: {
    backgroundImageUrl: string;
    bannerContainer: any[];
  }
}

const EventLobbyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event>({} as Event);
  useEffect(() => {
    axios.get(`https://us-central1-virtual-event-67e38.cloudfunctions.net/event?event_id=${id}`)
      .then(({ data }) => {
        if (data.success) {
          setEvent({
            ...data.data,
            lobby: {
              ...data.data.lobby,
              bannerContainer: sortBy(data.data.lobby.bannerContainer, ['order']),
            },
          });
        }
      });
  }, [id]);

  return (
    <>
      <AnnouncementListener eventId={id} />
      <AppBar eventId={id} />
      <LobbyContainer url={event?.lobby?.backgroundImageUrl}>
        {event?.lobby?.bannerContainer?.map((container) => (
          <BannerContainer
            key={container.id}
            width={container.width}
            height={container.height}
            x={container.x}
            y={container.y}
          >
            <BannerSlider banners={container.banners} />
          </BannerContainer>
        ))}
      </LobbyContainer>
    </>
  );
};

export default EventLobbyPage;
