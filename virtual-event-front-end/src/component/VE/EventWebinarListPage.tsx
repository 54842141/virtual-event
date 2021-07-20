import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import AppBar from './AppBar';
import StyledLink from '../common/StyledLink';
import StyledCircularProgress from '../common/StyledCircularProgress';
import AnnouncementListener from './AnnouncementListener';

const WebinarListContainer = styled.div`
  width: 100%;
  max-width: 760px;
  height: 100%;
  over-flow: auto;
  margin: auto;
`;

const WebinarItem = styled.div`
  width: 100%;
  padding: 16px;
  margin: 8px 0;
  border: 1px solid #dedede;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WebinarName = styled.div`
  
`;

const WebinarStatus = styled.div<{ status: string }>`
  padding: 8px;
  border-radius: 4px;
  color: white;
  background-color: ${({ status }) => {
    switch (status) {
      case 'Coming': {
        return '#cca001';
      }
      case 'Live': {
        return 'green';
      }
      case 'End': {
        return 'red';
      }
      default: return null;
    }
  }}
`;

interface Webinar {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  url: string;
}

interface EventWebinarListItemProps {
  eventId: string;
  webinar: any;
}

enum STATUS {
  BEFORE = 'Coming',
  NOW = 'Live',
  AFTER = 'Ended',
}

const EventWebinarListItem: FC<EventWebinarListItemProps> = ({ eventId, webinar }) => {
  const startTime = moment(webinar.startTime);
  const endTime = moment(webinar.endTime);
  const now = moment();
  let status = '';
  if (now.isAfter(startTime) && now.isBefore(endTime)) {
    status = STATUS.NOW;
  }
  if (now.isBefore(startTime)) {
    status = STATUS.BEFORE;
  }
  if (now.isAfter(endTime)) {
    status = STATUS.AFTER;
  }

  return (
    <StyledLink to={`/events/${eventId}/webinars/${webinar.id}`}>
      <WebinarItem>
        <WebinarName>{webinar.name}</WebinarName>
        <WebinarStatus status={status}>
          {status}
        </WebinarStatus>
      </WebinarItem>
    </StyledLink>
  );
};

const EventWebinarListPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [webinarList, setWebinarList] = useState([]);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    axios.get(`https://us-central1-virtual-event-67e38.cloudfunctions.net/event/webinar?event_id=${eventId}`)
      .then(({ data }) => {
        setWebinarList(data.data.sort((a: any, b: any) => (moment(a.startTime).isAfter(moment(b.startTime)) ? -1 : 1)));
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
        <WebinarListContainer>
          {webinarList.map((webinar: Webinar) => (
            <EventWebinarListItem key={webinar.id} eventId={eventId} webinar={webinar} />
          ))}
        </WebinarListContainer>
      )}
    </>
  );
};

export default EventWebinarListPage;
