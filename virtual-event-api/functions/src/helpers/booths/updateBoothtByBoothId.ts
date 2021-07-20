const admin = require('firebase-admin');

enum UPDATE_BOOTH_ERROR {
  // eslint-disable-next-line no-unused-vars
  INVALID_BOOTH,
  WRITE_FAIL,
  INVALID_REQUEST,
}

const updateBoothtByEventId = async (eventId: string, boothId: string, data: Record<string, any>) => {
  const db = admin.firestore();
  const boothRef = db.collection('booths').doc(boothId);
  const boothDoc = await boothRef.get();
  if (boothDoc.empty || boothDoc.data().eventId !== eventId) {
    throw new Error(UPDATE_BOOTH_ERROR.INVALID_BOOTH.toString());
  }
  try {
    await boothRef.set({ ...data }, { merge: true });
    return data;
  } catch (e) {
    console.log(e);
    throw new Error(UPDATE_BOOTH_ERROR.WRITE_FAIL.toString());
  }
};

export default updateBoothtByEventId;
