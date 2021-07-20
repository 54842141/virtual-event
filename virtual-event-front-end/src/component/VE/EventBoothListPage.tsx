import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import AppBar from './AppBar';
import StyledCircularProgress from '../common/StyledCircularProgress';
import AnnouncementListener from './AnnouncementListener';

const BoothListContainer = styled.div`
  width: 100%;
  max-width: 1080px;
  height: 100%;
  over-flow: auto;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
`;

const BoothItem = styled(Link)`
  width: 250px;
  max-wdith: 250px;
  max-height: 250px;
  padding: 16px;
  border: 1px solid #dedede;
  border-radius: 8px;
  margin: 8px;
  text-align: center;
  color: black;
  text-decoration: none;
  &:visited {
    color: black;
  }
`;

const EventBoothListPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [boothList, setBoothList] = useState([]);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    axios.get(`https://us-central1-virtual-event-67e38.cloudfunctions.net/event/booth?event_id=${eventId}`)
      .then(({ data }) => {
        setBoothList(sortBy(data.data, ['order'] as any));
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
        <BoothListContainer>
          {boothList.map((booth: any) => (
            <BoothItem key={booth.id} to={`/events/${eventId}/booths/${booth.id}`}>
              {booth.name ?? booth.name}
            </BoothItem>
          ))}
        </BoothListContainer>
      )}
    </>
  );
};

export default EventBoothListPage;
