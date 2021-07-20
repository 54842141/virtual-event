const admin =  require('firebase-admin');

// enum GET_EVENT_ERROR {
//   // eslint-disable-next-line no-unused-vars
//   INVALID_EVENT,
//   INVALID_REQUEST,
// }

const addWebinarByEventId = async (
  webinar: any,
) => {
  const db = admin.firestore();
  const webinarsRef = db.collection('webinars');
  const webinarData = await webinarsRef.add({
    ...webinar,
  });
  return {
    id: webinarData.id,
    ...webinar
  }
};

export default addWebinarByEventId;
