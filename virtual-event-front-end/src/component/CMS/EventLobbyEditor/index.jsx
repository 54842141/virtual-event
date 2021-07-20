import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DragResizeContainer from 'react-drag-resize';
import BannerList from './BannerList';
import StyledCircularProgress from '../../common/StyledCircularProgress';
import StyledDrawer from '../StyledDrawer';

const EventLobbyEditorWrapper = styled.div`
  width: 100%;
  max-width: 760px;
  margin: auto;
`;

const EventLobbyEditorTitle = styled.div`
  font-size: 1.5em;
  padding: 16px;
`;

const StyledButton = styled(Button)`
  margin: 8px;
`;

const EventLobbyEditorContainer = styled.div`
  width: 760px;
  height: 427.5px;
  border: 1px solid black;
  background-image: url(${({ url }) => url});
  background-size: 100% 100%;
  position: relative;
`;

const BannerContainer = styled.div`
  width: 100%;
  height: 100%;
  posistion: absolute;
  border: 3px solid white;

  &:hover {
    border: 3px solid white;
  }
`;

const canResizable = (isResize) => (
  {
    top: isResize,
    right: isResize,
    bottom: isResize,
    left: isResize,
    topRight: isResize,
    bottomRight: isResize,
    bottomLeft: isResize,
    topLeft: isResize,
  }
);

const isResize = true;

const Event = {
  name: '',
  startTime: '',
  endTime: '',
  timeZone: '',
  lobby: {
    backgroundImageUrl: '',
  },
};

const EventLobbyEditor = () => {
  const { eventId } = useParams();
  const [isCreating, setIsCreating] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [event, setEvent] = useState(Event);
  const [layout, setLayout] = useState([]);
  const [selectedBannerContainer, setSelectedBannerContainer] = useState('');

  useEffect(() => {
    axios.get(`https://us-central1-virtual-event-67e38.cloudfunctions.net/event?event_id=${eventId}`)
      .then(({ data }) => {
        if (data.success) {
          setEvent(data.data);
        }
      });
  }, [eventId]);

  useEffect(() => {
    axios.get(`https://us-central1-virtual-event-67e38.cloudfunctions.net/event/bannerContainer?event_id=${eventId}`)
      .then(({ data }) => {
        const { data: containers } = data;
        setLayout(containers.map((container) => (
          {
            id: container.id,
            key: container.id,
            x: container.x * 760,
            y: container.y * 427.5,
            width: container.width * 760,
            height: container.height * 427.5,
            zIndex: container.zIndex,
          }
        )));
        setIsFetching(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [eventId]);

  const addBannerContainer = useCallback(() => {
    axios.post(`https://us-central1-virtual-event-67e38.cloudfunctions.net/bannerContainer?event_id=${eventId}`, {
      eventId,
    })
      .then(({ data }) => {
        if (data.success) {
          setLayout((prev) => {
            const newState = [...prev];
            const { data: container } = data;
            newState.push({
              id: container.id,
              key: container.id,
              x: 760 * container.top,
              y: 427.5 * container.left,
              width: container.width * 760,
              height: container.height * 427.5,
              zIndex: 1,
            });
            return newState;
          });
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsCreating(false);
      });
  }, [eventId]);

  const onLayoutChange = useCallback(async ({ srcElement: { id } }, { x, y }) => {
    setIsSaving(true);
    setLayout((prev) => (
      prev.map((it) => {
        if (it.id === id) {
          return {
            ...it,
            x,
            y,
          };
        }
        return it;
      })
    ));
    await axios.put(`https://us-central1-virtual-event-67e38.cloudfunctions.net/bannerContainer?event_id=${eventId}&banner_container_id=${id}`, {
      x: x / 760,
      y: y / 427.5,
    })
      .then(({ data }) => {
        console.log(data);
      })
      .finally(() => {
        setIsSaving(false);
      });
  }, [eventId, setLayout]);

  const onResizeStop = useCallback(async (e, direction, { firstChild: { id } }, d) => {
    setIsSaving(true);
    const targetElement = layout.find(({ id: targetId }) => id === targetId);
    setLayout((prev) => (
      prev.map((it) => {
        if (it.id === id) {
          return {
            ...it,
            width: targetElement.width + d.width,
            height: targetElement.height + d.height,
          };
        }
        return it;
      })
    ));
    await axios.put(`https://us-central1-virtual-event-67e38.cloudfunctions.net/bannerContainer?event_id=${eventId}&banner_container_id=${id}`, {
      width: (targetElement.width + d.width) / 760,
      height: (targetElement.height + d.height) / 427.5,
    })
      .then(({ data }) => {
        console.log(data);
      })
      .finally(() => {
        setIsSaving(false);
      });
  }, [eventId, layout]);

  const setUrl = useCallback(async (value) => {
    setEvent((prev) => ({
      ...prev,
      lobby: {
        ...prev.lobby,
        backgroundImageUrl: value,
      },
    }));
  }, []);

  const updateLobby = useCallback(async () => {
    await axios.put(`https://us-central1-virtual-event-67e38.cloudfunctions.net/event?event_id=${eventId}`, {
      lobby: {
        backgroundImageUrl: event.lobby.backgroundImageUrl,
      },
    }).then(({ data }) => {
      if (data.success) {
        console.log(data);
      }
    });
  }, [eventId, event?.lobby?.backgroundImageUrl]);

  return (
    <EventLobbyEditorWrapper>
      <StyledDrawer />
      <EventLobbyEditorTitle>
        Lobby Settings
      </EventLobbyEditorTitle>
      <TextField
        fullWidth
        value={event.lobby.backgroundImageUrl}
        label="Background Image Url"
        onChange={({ target: { value } }) => setUrl(value)}
      />
      <StyledButton
        color="primary"
        variant="contained"
        onClick={updateLobby}
      >
        Save
      </StyledButton>
      <EventLobbyEditorTitle>
        Lobby Editor
      </EventLobbyEditorTitle>
      <StyledButton
        color="primary"
        variant="contained"
        onClick={addBannerContainer}
        disabled={isCreating}
      >
        Add Container
      </StyledButton>
      <EventLobbyEditorContainer url={event.lobby.backgroundImageUrl}>
        {isSaving && <StyledCircularProgress />}
        {layout.length > 0 && (
        <DragResizeContainer
          className="resize-container"
          resizeProps={{
            minWidth: 10,
            minHeight: 10,
            enable: canResizable(isResize),
            onResizeStop,

          }}
          layout={layout}
          dragProps={{
            disabled: false,
            onStop: onLayoutChange,
          }}
        >
          {layout.length > 0 && layout.map(({ id }) => (
            <BannerContainer
              key={id}
              id={id}
              className="child-container border"
              onClick={() => setSelectedBannerContainer(id)}
            />
          ))}
        </DragResizeContainer>
        )}
        {selectedBannerContainer && (
          <BannerList
            eventId={eventId}
            bannerContainerId={selectedBannerContainer}
          />
        )}
      </EventLobbyEditorContainer>
    </EventLobbyEditorWrapper>
  );
};

export default EventLobbyEditor;
