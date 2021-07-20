const admin =  require('firebase-admin');

// enum GET_EVENT_ERROR {
//   // eslint-disable-next-line no-unused-vars
//   INVALID_EVENT,
//   INVALID_REQUEST,
// }

const addEventByEventDomain = async (
  event: any,
) => {
  const db = admin.firestore();
  const eventsRef = db.collection('events');
  const eventData = await eventsRef.add({
    ...event,
    lobby: {
      backgroundImageUrl: '',
    }
  });
  return {
    id: eventData.id,
    ...event
  }
};

export default addEventByEventDomain;
