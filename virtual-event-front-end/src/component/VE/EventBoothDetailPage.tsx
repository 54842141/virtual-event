import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import AppBar from './AppBar';
import StyledCircularProgress from '../common/StyledCircularProgress';
import AnnouncementListener from './AnnouncementListener';

const BoothDetailContainer = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 16px;
  margin: auto;
`;

const BoothName = styled.div`
  font-size: 2em;
`;

const BoothInfoContainer = styled.div`
  width: 100%;
  padding: 16px;
`;

const BoothInfoLabel = styled.div``;

const BootnInfoContent = styled.div`
  padding: 0 8px;
`;

interface Booth {
  boothName: string;
  email: string;
  website: string;
  desciption: string;
  contentHtml: string;
}

const EventBoothDetailPage = () => {
  const { eventId, boothId } = useParams<{ eventId: string, boothId: string}>();
  const [booth, setBooth] = useState<Booth>({} as Booth);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    setFetching(true);
    axios.get(`https://us-central1-virtual-event-67e38.cloudfunctions.net/booth?event_id=${eventId}&booth_id=${boothId}`)
      .then(({ data }) => {
        if (data.success) {
          setBooth(data.data);
        }
      }).finally(() => {
        setFetching(false);
      });
  }, [boothId, eventId]);

  return (
    <>
      <AnnouncementListener eventId={eventId} />
      <AppBar eventId={eventId} />
      {
        fetching ? (
          <StyledCircularProgress />
        ) : (
          <BoothDetailContainer>
            <BoothName>
              {booth.boothName}
            </BoothName>
            <BoothInfoContainer>
              {booth.email && (
                <>
                  <BoothInfoLabel>
                    Email:
                  </BoothInfoLabel>
                  <BootnInfoContent>
                    {booth.email}
                  </BootnInfoContent>
                </>
              )}
            </BoothInfoContainer>
            <BoothInfoContainer>
              {booth.website && (
                <>
                  <BoothInfoLabel>
                    Website:
                  </BoothInfoLabel>
                  <BootnInfoContent>
                    {booth.website}
                  </BootnInfoContent>
                </>
              )}
            </BoothInfoContainer>
            <BoothInfoContainer>
              {booth.desciption && (
                <>
                  <BoothInfoLabel>
                    Desciption:
                  </BoothInfoLabel>
                  <BootnInfoContent>
                    {booth.desciption}
                  </BootnInfoContent>
                </>
              )}
              {booth.contentHtml && (ReactHtmlParser(booth.contentHtml))}
            </BoothInfoContainer>
          </BoothDetailContainer>
        )
      }
    </>
  );
};

export default EventBoothDetailPage;
