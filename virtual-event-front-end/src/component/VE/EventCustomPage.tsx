import React, {
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AppBar from './AppBar';
import StyledCircularProgress from '../common/StyledCircularProgress';
import AnnouncementListener from './AnnouncementListener';

const StyledIframe = styled.iframe`
    width: 100%;
    height: 100%;
`;

const EventCustomPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [fetching, setFetching] = useState(true);
  const [customPageLink, setCustomPageLink] = useState('');
  useEffect(() => {
    axios.get(`https://us-central1-virtual-event-67e38.cloudfunctions.net/event?event_id=${eventId}`)
      .then(({ data }) => {
        setCustomPageLink(data.data.customPage);
        setFetching(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [eventId]);

  return (
    <>
      <AnnouncementListener eventId={eventId} />
      <AppBar eventId={eventId} />
      {fetching ? (
        <StyledCircularProgress />
      ) : (
        <StyledIframe src={customPageLink} title="custom page" />
      )}
    </>
  );
};

export default EventCustomPage;
