import React, { useState, useCallback } from 'react';
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

const timeZoneNameList = moment.tz.names();

interface formDataType {
  eventName: string
  startTime: string
  endTime: string
  timeZone: string
}

const CreateEventForm = () => {
  const [formData, setFormData] = useState<formDataType>({} as formDataType);
  const [eventId, setEventId] = useState('');
  const submitFormData = useCallback(async () => {
    await axios.post('https://us-central1-virtual-event-67e38.cloudfunctions.net/event', {
      ...formData,
    }).then(({ data }) => {
      if (data.success) {
        setEventId(data.data.id);
      }
    });
  }, [formData]);
  return (
    <FormContainer>
      <h4>Create Event</h4>
      <StyledFormControl>
        <InputLabel htmlFor="event-name">Event Name</InputLabel>
        <Input
          id="event-name"
          aria-describedby="event-name"
          onChange={({ target: { value } }) => {
            setFormData((prev) => ({
              ...prev,
              eventName: value,
            }));
          }}
        />
      </StyledFormControl>
      <StyledFormControl>
        <TextField
          label="Start Time"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={({ target: { value } }) => {
            setFormData((prev) => ({
              ...prev,
              startTime: value,
            }));
          }}
        />
      </StyledFormControl>
      <StyledFormControl>
        <TextField
          label="End Time"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={({ target: { value } }) => {
            setFormData((prev) => ({
              ...prev,
              endTime: value,
            }));
          }}
        />
      </StyledFormControl>
      <StyledFormControl>
        <InputLabel htmlFor="time-zome">Time Zone</InputLabel>
        <Select
          onChange={({ target: { value } }) => {
            setFormData((prev) => ({
              ...prev,
              timeZone: value as string,
            }));
          }}
        >
          {timeZoneNameList.map((tz) => (
            <MenuItem value={tz}>{tz}</MenuItem>
          ))}
        </Select>
      </StyledFormControl>
      <ButtonGroup>
        <Button onClick={submitFormData}>Create</Button>
      </ButtonGroup>
      {
        eventId && (
          <p>
            Event CMS Link:
            <a
              href={`http://${document.location.hostname}/cms/events/${eventId}`}
              target="_blank"
              rel="noreferrer"
            >
              {`${document.location.hostname}/cms/events/${eventId}`}
            </a>
          </p>
        )
      }
    </FormContainer>
  );
};
export default CreateEventForm;
