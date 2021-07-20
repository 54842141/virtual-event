const admin =  require('firebase-admin');

// enum GET_EVENT_ERROR {
//   // eslint-disable-next-line no-unused-vars
//   INVALID_EVENT,
//   INVALID_REQUEST,
// }

interface bannerContainerType {
  eventId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

const addBannerPositionByEventId = async ({
  eventId = '',
  x = 0,
  y = 0,
  width = 0.3,
  height = 0.2,
  zIndex = 1,
  
}: bannerContainerType) => {
  const db = admin.firestore();
  const bannerContainersRef = db.collection('bannerContainers');
  const bannerContainerData = await bannerContainersRef.add({
    eventId,
    x,
    y,
    width,
    height,
    zIndex,
  });
  return {
    id: bannerContainerData.id,
    eventId,
    x,
    y,
    width,
    height,
    zIndex,
  }
};

export default addBannerPositionByEventId;
