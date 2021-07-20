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
import EventLobbyEditor from '../EventLobbyEditor';
import StyledDrawer from '../StyledDrawer';

const EventDetailsPageContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
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

const AnnouncementContainer = styled.div`
  margin-top: 8px;
`;

const timeZoneNameList = moment.tz.names();

interface formDataType {
  eventName: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  customPage: string;
}

const EventDetailsPage = () => {
  const [formData, setFormData] = useState<formDataType| null>({
    eventName: '',
    startTime: '',
    endTime: '',
    timeZone: '',
    customPage: '',
  });
  const [announcement, setAnnouncement] = useState('');
  const [announcementSuccess, setAnnouncementSuccess] = useState(false);
  const { eventId } = useParams<{ eventId: string }>();

  useEffect(() => {
    axios.get(`https://us-central1-virtual-event-67e38.cloudfunctions.net/event?event_id=${eventId}`)
      .then(({ data }) => {
        if (data.success) {
          setFormData(data.data);
        }
      });
  }, [eventId]);

  const submitFormData = useCallback(async () => {
    await axios.put(`https://us-central1-virtual-event-67e38.cloudfunctions.net/event?event_id=${eventId}`, {
      ...formData,
    }).then(({ data }) => {
      console.log(data);
      // if (data.success) {

      // }
    });
  }, [formData, eventId]);

  const makeAnnoucement = useCallback(async () => {
    console.log(eventId);
    await axios.post('https://us-central1-virtual-event-67e38.cloudfunctions.net/announcements', {
      eventId,
      announcement,
    }).then(({ data }) => {
      if (data.success) {
        setAnnouncement('');
        setAnnouncementSuccess(true);
      }
    });
  }, [announcement, eventId]);
  return (
    <EventDetailsPageContainer>
      <StyledDrawer />
      <FormContainer>
        <h4>Update Event</h4>
        <StyledFormControl>
          <InputLabel htmlFor="event-name">Event Name</InputLabel>
          <Input
            id="event-name"
            // aria-describedby="event-name"
            value={formData?.eventName}
            onChange={({ target: { value } }) => {
              setFormData((prev) => ({
                ...prev,
                name: value,
              } as formDataType));
            }}
          />
        </StyledFormControl>
        <StyledFormControl>
          <TextField
            label="Start Time"
            type="datetime-local"
            value={formData?.startTime}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={({ target: { value } }) => {
              setFormData((prev) => ({
                ...prev,
                startTime: value,
              } as formDataType));
            }}
          />
        </StyledFormControl>
        <StyledFormControl>
          <TextField
            label="End Time"
            type="datetime-local"
            value={formData?.endTime}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={({ target: { value } }) => {
              setFormData((prev) => ({
                ...prev,
                endTime: value,
              } as formDataType));
            }}
          />
        </StyledFormControl>
        <StyledFormControl>
          <InputLabel htmlFor="time-zome">Time Zone</InputLabel>
          <Select
            value={formData?.timeZone}
            onChange={({ target: { value } }) => {
              setFormData((prev) => ({
                ...prev,
                timeZone: value as string,
              } as formDataType));
            }}
          >
            {timeZoneNameList.map((tz) => (
              <MenuItem key={tz} value={tz}>{tz}</MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        <StyledFormControl>
          <TextField
            id="time-custom-page"
            label="Custom Page Url"
            value={formData?.customPage}
            onChange={({ target: { value } }) => {
              setFormData((prev) => ({
                ...prev,
                customPage: value,
              } as formDataType));
            }}
          />
        </StyledFormControl>
        <ButtonGroup>
          <Button onClick={submitFormData}>Update</Button>
        </ButtonGroup>
        <AnnouncementContainer>
          <StyledFormControl>
            <TextField
              id="time-custom-page"
              label="announcement message"
              value={announcement}
              onChange={({ target: { value } }) => {
                setAnnouncement(value);
              }}
            />
          </StyledFormControl>
          <ButtonGroup>
            <Button onClick={makeAnnoucement}>Make Announcement</Button>
            {announcementSuccess && 'Success'}
          </ButtonGroup>
        </AnnouncementContainer>
      </FormContainer>
    </EventDetailsPageContainer>
  );
};

export default EventDetailsPage;
