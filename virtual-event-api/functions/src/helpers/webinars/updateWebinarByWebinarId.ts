const admin = require('firebase-admin');

enum UPDATE_BOOTH_ERROR {
  // eslint-disable-next-line no-unused-vars
  INVALID_BOOTH,
  WRITE_FAIL,
  INVALID_REQUEST,
}

const updateWebinartByEventId = async (eventId: string, webinarId: string, data: Record<string, any>) => {
  const db = admin.firestore();
  const webinarRef = db.collection('webinars').doc(webinarId);
  const webinarDoc = await webinarRef.get();
  if (webinarDoc.empty || webinarDoc.data().eventId !== eventId) {
    throw new Error(UPDATE_BOOTH_ERROR.INVALID_BOOTH.toString());
  }
  try {
    await webinarRef.set({ ...data }, { merge: true });
    return data;
  } catch (e) {
    console.log(e);
    throw new Error(UPDATE_BOOTH_ERROR.WRITE_FAIL.toString());
  }
};

export default updateWebinartByEventId;
