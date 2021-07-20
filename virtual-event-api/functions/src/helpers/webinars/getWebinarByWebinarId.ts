const admin =  require('firebase-admin');

enum GET_BOOTH_ERROR {
  // eslint-disable-next-line no-unused-vars
  INVALID_BOOTH,
  BOOTH_NOT_FIND,
  INVALID_REQUEST,
}

const getWebinarByWebinarId = async (
  eventId: string,
  webinarId: string
) => {
  const db = admin.firestore();
  const webinarRef = db.collection('webinars').doc(webinarId);
  const webinarDoc = await webinarRef.get();
  if (webinarDoc.empty) {
    throw new Error(GET_BOOTH_ERROR.INVALID_BOOTH.toString());
  }
  const webinarData = webinarDoc.data();
  if (webinarData.eventId !== eventId) {
    throw new Error(GET_BOOTH_ERROR.BOOTH_NOT_FIND.toString());
  }
  return webinarData;
};

export default getWebinarByWebinarId;
