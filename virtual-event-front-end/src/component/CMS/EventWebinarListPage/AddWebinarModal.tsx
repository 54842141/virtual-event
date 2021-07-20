import React, {
  FC,
  useState,
  useCallback,
  useRef,
} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  Input,
  Modal,
  Button,
  Backdrop,
  Fade,
  Card,
  CardActions,
  CardContent,
  Typography,
  TextField,
} from '@material-ui/core';

const StyledFormControl = styled(FormControl)`
  &.MuiFormControl-root {
    width: 100%;
  }
`;

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 760px;
  height: 100%;
  max-height: 500px;
`;

interface AddWebinarModalProps {
  eventId: string;
  isShowWebinarModal: boolean;
  hideWebinarModal: () => void;
  setWebinarList: any;
}

interface WebinarType {
  name: string;
  startTime: string;
  endTime: string;
  url: string;
}

const AddWebinarModal: FC<AddWebinarModalProps> = ({
  eventId,
  isShowWebinarModal,
  hideWebinarModal,
  setWebinarList,
}) => {
  const [webinarData, setWebinarData] = useState({} as WebinarType);
  const [isCreating, setIsCreating] = useState(false);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);
  const createdMessageRef = useRef<any>();
  const createWebinar = useCallback(async () => {
    setIsCreating(true);
    axios.post(`https://us-central1-virtual-event-67e38.cloudfunctions.net/webinar?event_id=${eventId}`, {
      eventId,
      ...webinarData,
    })
      .then(({ data }) => {
        if (data.success) {
          setDisplaySuccessMessage(true);
          setWebinarList((prev: any) => [...prev, data.data]);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsCreating(false);
      });
  }, [eventId, webinarData]);

  return (
    <StyledModal
      open={isShowWebinarModal}
      onClose={hideWebinarModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isShowWebinarModal}>
        <StyledCard>
          <CardContent>
            <StyledFormControl>
              <InputLabel htmlFor="webinar-name">Webinar Name</InputLabel>
              <Input
                id="webinar-name"
                aria-describedby="webinar-name"
                value={webinarData.name}
                onChange={({ target: { value } }) => {
                  setWebinarData((prev) => ({
                    ...prev,
                    name: value,
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
                  setWebinarData((prev) => ({
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
                  setWebinarData((prev) => ({
                    ...prev,
                    endTime: value,
                  }));
                }}
              />
            </StyledFormControl>
            <StyledFormControl>
              <InputLabel htmlFor="webinar-desciption">Webinar URL</InputLabel>
              <Input
                id="webinar-desciption"
                aria-describedby="webinar-desciption"
                value={webinarData.url}
                onChange={({ target: { value } }) => {
                  setWebinarData((prev) => ({
                    ...prev,
                    url: value,
                  }));
                }}
              />
            </StyledFormControl>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={createWebinar}
              disabled={isCreating}
            >
              {isCreating ? 'Creating' : 'Create'}
            </Button>
            <Fade in={displaySuccessMessage}>
              <Typography ref={createdMessageRef}>Webinar Created!</Typography>
            </Fade>
          </CardActions>
        </StyledCard>
      </Fade>
    </StyledModal>
  );
};

export default AddWebinarModal;
