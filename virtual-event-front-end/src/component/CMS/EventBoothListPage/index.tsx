import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import axios from 'axios';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import sortBy from 'lodash/sortBy';
import AddBoothModal from './AddBoothModal';
import StyledDrawer from '../StyledDrawer';
import StyledCircularProgress from '../../common/StyledCircularProgress';
import StyledLink from '../../common/StyledLink';

const EventBoothListPageContainer = styled.div`
  width: 100%;
  max-width: 760px;
  margin: auto;
`;

const BoothListTitle = styled.div`
  font-size: 1.5em;
  padding: 16px;
`;

const BoothListContainer = styled.div`
  width: 100%;
  over-flow: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const BoothListItem = styled.div`
  border: 1px solid #484848;
  padding: 16px;
`;

const StyledButton = styled(Button)`
  margin: 8px;
`;

interface Booth {
  id: string;
}

const EventBoothListPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [boothList, setBoothList] = useState<Booth[]>([]);
  const [fetching, setFetching] = useState(true);
  const [isShowBoothModal, setIsShowBoothModal] = useState(false);
  useEffect(() => {
    axios.get(`https://us-central1-virtual-event-67e38.cloudfunctions.net/event/booth?event_id=${eventId}`)
      .then(({ data }) => {
        setBoothList(sortBy(data.data, ['order']));
        setFetching(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [eventId]);

  const displayBoothModel = useCallback(() => { setIsShowBoothModal(true); }, [setIsShowBoothModal]);
  const hideBoothModal = useCallback(() => { setIsShowBoothModal(false); }, [setIsShowBoothModal]);

  const reoderBooth = useCallback(async (boothIds) => {
    await axios.put(`https://us-central1-virtual-event-67e38.cloudfunctions.net/booth/reorder?event_id=${eventId}`, {
      boothIds,
    }).then(({ data }) => {
      console.log(data);
    });
  }, [eventId]);

  const onDragEnd = useCallback(async ({ destination, source }) => {
    if (destination && source) {
      setBoothList((prev: any) => {
        const newBoothList = [...prev];
        const target = { ...prev[source.index] };
        newBoothList.splice(source.index, 1);
        newBoothList.splice(destination.index, 0, target);
        const boothIds = newBoothList.map(({ id }) => id);
        reoderBooth(boothIds);
        return newBoothList;
      });
    }
  }, []);

  return (
    <div>
      <StyledDrawer />
      <AddBoothModal
        eventId={eventId}
        isShowBoothModal={isShowBoothModal}
        hideBoothModal={hideBoothModal}
        setBoothList={setBoothList}
      />
      <EventBoothListPageContainer>
        <BoothListTitle>Booth List</BoothListTitle>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={displayBoothModel}
        >
          Add New Booth
        </StyledButton>
        <BoothListContainer>
          {fetching ? (
            <StyledCircularProgress />
          ) : (
            <DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result)}>
              <Droppable droppableId="booth-list" type="BOOTH">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {boothList.map((booth: any, index: number) => (
                      <Draggable key={booth.id} draggableId={booth.id} index={index}>
                        {(draggableprovided) => (
                          <div
                            ref={draggableprovided.innerRef}
                            {...draggableprovided.draggableProps}
                            {...draggableprovided.dragHandleProps}
                          >
                            <BoothListItem>
                              <StyledLink to={`/cms/events/${eventId}/booths/${booth.id}?access_token=${booth.accessToken}`}>
                                {booth.name ?? 'Not Named'}
                              </StyledLink>
                            </BoothListItem>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </BoothListContainer>
      </EventBoothListPageContainer>
    </div>
  );
};

export default EventBoothListPage;
