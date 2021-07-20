import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import StyledCircularProgress from '../common/StyledCircularProgress';
import AnnouncementListener from './AnnouncementListener';

import AppBar from './AppBar';

const WebinarContainer = styled.div`
  width: 100%;
  max-width: 760px;
  margin: auto;
  padding: 16px;
`;

const WebinarName = styled.div`
  padding: 8px 0;
`;

const WebinarPlayerContainer = styled.div`
  width: 100%;
`;

interface Webinar {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  url: string;
}

const EventWebinarDetailPage = () => {
  const { webinarId, eventId } = useParams<{webinarId: string, eventId: string}>();
  const [webianr, setWebianr] = useState<Webinar>({} as Webinar);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    setFetching(true);
    axios.get(`https://us-central1-virtual-event-67e38.cloudfunctions.net/webinar?event_id=${eventId}&webinar_id=${webinarId}`)
      .then(({ data }) => {
        if (data.success) {
          setWebianr(data.data);
        }
      })
      .finally(() => {
        setFetching(false);
      });
  }, [webinarId, eventId]);
  return (
    <>
      <AnnouncementListener eventId={eventId} />
      <AppBar eventId={eventId} />
      {fetching ? (
        <StyledCircularProgress />
      ) : (
        <WebinarContainer>
          <WebinarName>
            {webianr.name}
          </WebinarName>
          <WebinarPlayerContainer>
            <ReactPlayer
              url={webianr.url}
              width="100%"
              height="100%"
            />
          </WebinarPlayerContainer>
          <div>
            {`Start Time: ${webianr.startTime}`}
          </div>
          <div>
            {`End Time: ${webianr.endTime}`}
          </div>
        </WebinarContainer>
      )}
    </>
  );
};

export default EventWebinarDetailPage;
