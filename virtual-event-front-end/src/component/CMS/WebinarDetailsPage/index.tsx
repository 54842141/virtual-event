import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  TextField,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import moment from 'moment-timezone';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StyledCircularProgress from '../../common/StyledCircularProgress';
import StyledDrawer from '../StyledDrawer';

const EventDetailsPageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const FormContainer = styled.div`
  max-width: 760px;
  height: 100%;
  margin: auto;
  
`;

const StyledFormControl = styled(FormControl)`
  &.MuiFormControl-root {
    width: 100%;
  }
`;

interface WebinarType {
  name: string;
  startTime: string;
  endTime: string;
  url: string;
}

const WebinarDetailsPage = () => {
  const [webinarData, setWebinarData] = useState<any>({});
  const { id, eventId } = useParams<{ id: string, eventId: string }>();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setFetching(true);
    axios.get(`https://us-central1-virtual-event-67e38.cloudfunctions.net/webinar?event_id=${eventId}&webinar_id=${id}`)
      .then(({ data }) => {
        if (data.success) {
          setWebinarData(data.data);
        }
      }).finally(() => {
        setFetching(false);
      });
  }, [id, eventId]);

  const submitWebinarData = useCallback(async () => {
    await axios.put(`https://us-central1-virtual-event-67e38.cloudfunctions.net/webinar?event_id=${eventId}&webinar_id=${id}`, {
      ...webinarData,
    }).then(({ data }) => {
      console.log(data);
      // if (data.success) {

      // }
    });
  }, [eventId, id, webinarData]);
  return (
    <EventDetailsPageContainer>
      <StyledDrawer />
      {fetching ? (
        <StyledCircularProgress />
      ) : (
        <FormContainer>
          <h4>Update Webinar</h4>
          <StyledFormControl>
            <TextField
              id="webinar-name"
              label="Name"
              value={webinarData.name}
              onChange={({ target: { value } }) => {
                setWebinarData((prev: any) => ({
                  ...prev,
                  name: value,
                }));
              }}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="webinar-start-time"
              label="Webinar Start Time"
              type="datetime-local"
              value={webinarData.startTime}
              onChange={({ target: { value } }) => {
                setWebinarData((prev: any) => ({
                  ...prev,
                  startTime: value,
                }));
              }}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="webinar-end-time"
              type="datetime-local"
              label="Webinar End Time"
              value={webinarData.endTime}
              onChange={({ target: { value } }) => {
                setWebinarData((prev: any) => ({
                  ...prev,
                  endTime: value,
                }));
              }}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="webinar-url"
              label="Webinar Link"
              value={webinarData.url}
              onChange={({ target: { value } }) => {
                setWebinarData((prev: any) => ({
                  ...prev,
                  url: value,
                }));
              }}
            />
          </StyledFormControl>
          <ButtonGroup>
            <Button onClick={submitWebinarData}>Update</Button>
          </ButtonGroup>
        </FormContainer>

      )}
    </EventDetailsPageContainer>
  );
};

export default WebinarDetailsPage;
