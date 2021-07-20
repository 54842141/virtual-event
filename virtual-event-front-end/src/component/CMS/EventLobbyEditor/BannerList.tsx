import React, {
  FC,
  useEffect,
  useState,
  useCallback,
} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import _SortBy from 'lodash/sortBy';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import BannerEditModal from './BannerEditModal';

const BannerListConatiner = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
`;

const BannerItem = styled.div`
  width: 100%;
  padding: 16px;
  border: 1px solid #484848;
  display: flex;
  justify-content: space-between;
`;

interface BannerListProps {
  eventId: string;
  bannerContainerId: string;
}

interface Banner {
  id: string;
  bannerContainerId: string;
  type: string;
  src: string;
  redirectUrl: string;
  externalLink: boolean;
  order: number;
}

const BannerList: FC<BannerListProps> = ({
  eventId, bannerContainerId,

}) => {
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [banners, setBanners] = useState<Banner[]>([]);
  useEffect(() => {
    if (eventId && bannerContainerId) {
      axios.get(`https://us-central1-virtual-event-67e38.cloudfunctions.net/banner?banner_container_id=${bannerContainerId}`)
        .then(({ data }) => {
          if (data.success) {
            console.log(data.data);
            console.log(data.data.sort((a: Banner, b: Banner) => (a.order ?? 0) < (b.order ?? 0)));
            setBanners(_SortBy(data.data, ['order']));
          }
        });
    }
  }, [eventId, bannerContainerId]);

  const addBanner = useCallback(() => {
    axios.post('https://us-central1-virtual-event-67e38.cloudfunctions.net/banner', {
      bannerContainerId,
    })
      .then(({ data }) => {
        if (data.success) {
          setBanners((prev) => ([...prev, data.data]));
        }
      });
  },
  [bannerContainerId]);

  const deleteBanner = useCallback(async (bannerId) => {
    await axios.delete(`https://us-central1-virtual-event-67e38.cloudfunctions.net/banner?banner_container_id=${bannerContainerId}&banner_id=${bannerId}`)
      .then(({ data }) => {
        console.log(data);
        setBanners((prev) => prev.filter(({ id }) => bannerId !== id));
      });
  }, [bannerContainerId, setBanners]);

  const reorderBanners = useCallback(async (bannerIds) => {
    await axios.put(`https://us-central1-virtual-event-67e38.cloudfunctions.nets/banner/reorder?banner_container_id=${bannerContainerId}`, {
      bannerIds,
    }).then(({ data }) => {
      console.log(data);
    });
  }, [bannerContainerId]);

  const onDragEnd = useCallback(async ({ destination, source }) => {
    if (destination && source) {
      setBanners((prev: Banner[]) => {
        const newBanners = [...prev];
        const target = { ...prev[source.index] };
        newBanners.splice(source.index, 1);
        newBanners.splice(destination.index, 0, target);
        const bannerIds = newBanners.map(({ id }) => id);
        reorderBanners(bannerIds);
        return newBanners;
      });
    }
  }, []);
  return (
    <BannerListConatiner>
      {selectedBanner && (
        <BannerEditModal
          bannerContainerId={bannerContainerId}
          banner={selectedBanner}
          setSelectedBanner={setSelectedBanner}
          setBanners={setBanners}
          eventId={eventId}
        />
      )}
      <Button
        color="primary"
        variant="contained"
        onClick={addBanner}
      >
        Add Banner
      </Button>
      <DragDropContext onDragEnd={(result: DropResult) => { console.log(result); onDragEnd(result); }}>
        <Droppable droppableId="banner-list" type="BANNER">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {banners.map((banner: Banner, index: number) => (
                <Draggable key={banner.id} draggableId={banner.id} index={index}>
                  {(draggableprovided) => (
                    <div
                      ref={draggableprovided.innerRef}
                      {...draggableprovided.draggableProps}
                      {...draggableprovided.dragHandleProps}
                    >
                      <BannerItem>
                        {banner.id}
                        <div>
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => setSelectedBanner(banner)}
                          >
                            Edit
                          </Button>
                          <IconButton onClick={() => deleteBanner(banner.id)} color="secondary">
                            <CloseIcon />
                          </IconButton>
                        </div>
                      </BannerItem>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

    </BannerListConatiner>
  );
};

export default BannerList;
