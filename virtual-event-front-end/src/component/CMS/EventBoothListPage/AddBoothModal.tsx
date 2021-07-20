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
interface AddBoothModalProps {
  eventId: string;
  isShowBoothModal: boolean;
  hideBoothModal: () => void;
  setBoothList: any;
}

interface BoothType {
  name: string;
  email: string;
  website: string;
  desciption: string;
}

const AddBoothModal: FC<AddBoothModalProps> = ({
  eventId,
  isShowBoothModal,
  hideBoothModal,
  setBoothList,
}) => {
  const [boothData, setBoothData] = useState({} as BoothType);
  const [isCreating, setIsCreating] = useState(false);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);
  const createdMessageRef = useRef<any>();
  const createBooth = useCallback(async () => {
    setIsCreating(true);
    axios.post(`https://us-central1-virtual-event-67e38.cloudfunctions.net/booth?event_id=${eventId}`, {
      eventId,
      ...boothData,
    })
      .then(({ data }) => {
        if (data.success) {
          setDisplaySuccessMessage(true);
          setBoothList((prev: any) => [...prev, data.data]);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsCreating(false);
      });
  }, [eventId, boothData, setBoothList]);

  return (
    <StyledModal
      open={isShowBoothModal}
      onClose={hideBoothModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isShowBoothModal}>
        <StyledCard>
          <CardContent>
            <StyledFormControl>
              <InputLabel htmlFor="booth-name">Booth Name</InputLabel>
              <Input
                id="booth-name"
                aria-describedby="booth-name"
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
              <InputLabel htmlFor="booth-email">Booth Email</InputLabel>
              <Input
                id="booth-email"
                aria-describedby="booth-email"
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
              <InputLabel htmlFor="booth-website">Booth Website</InputLabel>
              <Input
                id="booth-website"
                aria-describedby="booth-website"
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
              <InputLabel htmlFor="booth-desciption">Booth Desciption</InputLabel>
              <Input
                id="booth-desciption"
                aria-describedby="booth-desciption"
                value={boothData.desciption}
                onChange={({ target: { value } }) => {
                  setBoothData((prev) => ({
                    ...prev,
                    desciption: value,
                  }));
                }}
              />
            </StyledFormControl>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={createBooth}
              disabled={isCreating}
            >
              {isCreating ? 'Creating' : 'Create'}
            </Button>
            <Fade in={displaySuccessMessage}>
              <Typography ref={createdMessageRef}>Booth Created!</Typography>
            </Fade>
          </CardActions>
        </StyledCard>
      </Fade>
    </StyledModal>
  );
};

export default AddBoothModal;
