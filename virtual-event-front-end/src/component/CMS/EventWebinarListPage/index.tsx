import React, {
  FC,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import AddWebinarModal from './AddWebinarModal';
import StyledDrawer from '../StyledDrawer';
import StyledLink from '../../common/StyledLink';

const EventWebinarListPageContainer = styled.div`
  width: 100%;
  max-width: 760px;
  margin: auto;
`;

const WebinarListTitle = styled.div`
  font-size: 1.5em;
  padding: 16px;
`;

const StyledButton = styled(Button)`
  margin: 8px;
`;

const WebinarItem = styled.div`
  border: 1px solid #484848;
  border-radius: 4px;
  padding: 16px;
  margin: 8px;
`;

const EventWebinarListPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [webinarList, setWebinarList] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [isShowWebinarModal, setIsShowWebinarModal] = useState(false);
  useEffect(() => {
    axios.get(`https://us-central1-virtual-event-67e38.cloudfunctions.net/event/webinar?event_id=${eventId}`)
      .then(({ data }) => {
        console.log(moment);
        console.log(data.data);
        setWebinarList(data.data.sort((a: any, b: any) => (moment(a.startTime).isAfter(moment(b.startTime)) ? -1 : 1)));
        setFetching(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [eventId]);

  const displayWebinarModel = useCallback(() => { setIsShowWebinarModal(true); }, [setIsShowWebinarModal]);
  const hideWebinarModal = useCallback(() => { setIsShowWebinarModal(false); }, [setIsShowWebinarModal]);
  return (
    <>
      <StyledDrawer />
      <EventWebinarListPageContainer>
        <AddWebinarModal
          eventId={eventId}
          isShowWebinarModal={isShowWebinarModal}
          hideWebinarModal={hideWebinarModal}
          setWebinarList={setWebinarList}
        />
        <WebinarListTitle>Webinar List</WebinarListTitle>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={displayWebinarModel}
        >
          Add New Webinar
        </StyledButton>
        {fetching ? 'Fetching Webinar Info'
          : webinarList.map((webinar: any) => (
            <StyledLink to={`/cms/events/${eventId}/webinars/${webinar.id}`}>
              <WebinarItem>
                {webinar.name || 'Not Named'}
              </WebinarItem>
            </StyledLink>
          ))}
      </EventWebinarListPageContainer>
    </>
  );
};

export default EventWebinarListPage;
