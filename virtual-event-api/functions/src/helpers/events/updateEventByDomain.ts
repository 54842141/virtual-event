const admin = require('firebase-admin');

enum UPDATE_EVENT_ERROR {
  // eslint-disable-next-line no-unused-vars
  INVALID_EVENT,
  WRITE_FAIL,
  INVALID_REQUEST,
}

const updateEventByDomain = async (eventId: string, data: Record<string, any>) => {
  const db = admin.firestore();
  const eventRef = db.collection('events').doc(eventId);
  const eventDoc = await eventRef.get();
  if (eventDoc.empty) {
    throw new Error(UPDATE_EVENT_ERROR.INVALID_EVENT.toString());
  }
  try {
    await eventRef.set({ ...data }, { merge: true });
    return data
  } catch (e) {
    console.log(e);
    throw new Error(UPDATE_EVENT_ERROR.WRITE_FAIL.toString());
  }
};

export default updateEventByDomain;
