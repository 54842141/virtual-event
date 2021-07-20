const admin =  require('firebase-admin');

enum GET_BOOTH_ERROR {
  // eslint-disable-next-line no-unused-vars
  INVALID_BOOTH,
  BOOTH_NOT_FIND,
  INVALID_REQUEST,
}

const getBoothByBoothId = async (
  eventId: string,
  boothId: string
) => {
  const db = admin.firestore();
  const boothRef = db.collection('booths').doc(boothId);
  const boothDoc = await boothRef.get();
  if (boothDoc.empty) {
    throw new Error(GET_BOOTH_ERROR.INVALID_BOOTH.toString());
  }
  const boothData = boothDoc.data();
  if (boothData.eventId !== eventId) {
    throw new Error(GET_BOOTH_ERROR.BOOTH_NOT_FIND.toString());
  }
  return boothData;
};

export default getBoothByBoothId;
