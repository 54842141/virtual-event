import React, {
  FC,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ReactHtmlParser from 'react-html-parser';
import firebase from '../common/Firebase';
import { addViewedAnnouncements } from '../../model/viewedAnnouncements';

const StyledModel = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const ModelContent = styled.div`
  width: 100%;
  max-width: 760px;
  background-color: white;
  padding: 16px;
`;

interface AnnouncementListenerProps {
  eventId: string;
}

interface AnnouncementType {
  id: string;
  eventId: string;
  message: string;
}

const AnnouncementListener: FC<AnnouncementListenerProps> = ({ eventId }) => {
  const [announcement, setAnnouncement] = useState<AnnouncementType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const viewedAnnouncements = useSelector((state: any) => state.viewedAnnouncements);
  const dispatch = useDispatch();
  const state = useSelector((asd: any) => asd);
  useEffect(() => {
    const query = firebase
      .collection('announcements')
      .where('eventId', '==', eventId);
    const observer = query.onSnapshot(
      async (querySnapshot) => {
        const newAnnouncement = querySnapshot.docChanges()
          .filter((change) => change.type === 'added')
          .filter((change) => !viewedAnnouncements?.includes(change.doc.id))
          .map((change) => ({
            id: change.doc.id,
            ...change.doc.data(),
          }))[0] as AnnouncementType;

        setAnnouncement(newAnnouncement);
        if (newAnnouncement) {
          setIsOpen(true);
        }
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      },
    );
    return (() => {
      observer();
    });
  }, [eventId, viewedAnnouncements]);

  const onClose = useCallback(() => {
    setIsOpen(false);
    dispatch(addViewedAnnouncements(announcement?.id));
  }, [announcement, dispatch]);

  return (
    <StyledModel
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={() => onClose()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <ModelContent>
          {ReactHtmlParser(announcement?.message as string)}
        </ModelContent>
      </Fade>
    </StyledModel>
  );
};

export default AnnouncementListener;
