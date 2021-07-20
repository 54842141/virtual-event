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
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { useParams, useLocation } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import StyledCircularProgress from '../../common/StyledCircularProgress';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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

interface boothDataType {
  name: string;
  email: string;
  website: string;
  desciption: string;
}

const useQuery = () => (
  new URLSearchParams(useLocation().search)
);

const BoothDetailsPage = () => {
  const [boothData, setBoothData] = useState<boothDataType>({} as boothDataType);
  const { id, eventId } = useParams<{ id: string, eventId: string }>();
  const [fetching, setFetching] = useState(true);
  const [authFailed, setAuthFailed] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const accessToken = useQuery().get('access_token');

  useEffect(() => {
    setFetching(true);
    axios.get(`https://us-central1-virtual-event-67e38.cloudfunctions.net/booth?event_id=${eventId}&booth_id=${id}`)
      .then(({ data }) => {
        if (data.success) {
          const { data: event } = data;
          if (event.accessToken === accessToken) {
            const contentBlock = htmlToDraft(event.contentHtml ?? '');
            if (contentBlock) {
              const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
              setEditorState(EditorState.createWithContent(contentState));
            }
            setBoothData(event);
          } else {
            setAuthFailed(true);
          }
        }
      }).finally(() => {
        setFetching(false);
      });
  }, [id, eventId, accessToken]);

  const submitBoothData = useCallback(async () => {
    console.log(editorState);
    await axios.put(`https://us-central1-virtual-event-67e38.cloudfunctions.net/booth?event_id=${eventId}&booth_id=${id}`, {
      contentHtml: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      ...boothData,
    }).then(({ data }) => {
      console.log(data);
      // if (data.success) {

      // }
    });
  }, [eventId, id, boothData, editorState]);

  if (authFailed) {
    return 'Auth Failed';
  }
  if (fetching) {
    return <StyledCircularProgress />;
  }
  return (
    <EventDetailsPageContainer>
      <FormContainer>
        <h4>Update Booth</h4>
        <StyledFormControl>
          <TextField
            id="booth-name"
            label="Name"
            value={boothData.name}
            onChange={({ target: { value } }) => {
              setBoothData((prev) => ({
                ...prev,
                name: value,
              }));
            }}
          />
        </StyledFormControl>
        <StyledFormControl>
          <TextField
            id="booth-email"
            label="Booth Email"
            value={boothData.email}
            onChange={({ target: { value } }) => {
              setBoothData((prev) => ({
                ...prev,
                email: value,
              }));
            }}
          />
        </StyledFormControl>
        <StyledFormControl>
          <TextField
            id="booth-website"
            label="Booth Website"
            value={boothData.website}
            onChange={({ target: { value } }) => {
              setBoothData((prev) => ({
                ...prev,
                website: value,
              }));
            }}
          />
        </StyledFormControl>
        <StyledFormControl>
          <TextField
            id="booth-desciption"
            label="Booth Desciption"
            value={boothData.desciption}
            onChange={({ target: { value } }) => {
              setBoothData((prev) => ({
                ...prev,
                desciption: value,
              }));
            }}
          />
        </StyledFormControl>
        <StyledFormControl>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={(updatedState) => setEditorState(updatedState)}
          />
        </StyledFormControl>
        <ButtonGroup>
          <Button onClick={submitBoothData}>Update</Button>
        </ButtonGroup>
      </FormContainer>
    </EventDetailsPageContainer>
  );
};

export default BoothDetailsPage;
