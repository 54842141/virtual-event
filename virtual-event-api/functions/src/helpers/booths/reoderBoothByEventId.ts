const admin = require('firebase-admin');

enum UPDATE_BOOTH_ERROR {
  // eslint-disable-next-line no-unused-vars
  INVALID_BOOTH,
  WRITE_FAIL,
  INVALID_REQUEST,
}

const reoderBoothByEventId = async (eventId: string,  data: Record<string, any>) => {
  const db = admin.firestore();
  const boothRef = db.collection('booths').where('eventId', '==', eventId);
  const boothDoc = await boothRef.get();
  if (boothDoc.empty) {
    throw new Error(UPDATE_BOOTH_ERROR.INVALID_BOOTH.toString());
  }
  try {
    boothDoc.docs.forEach(async (doc: any) => {
      const index = data.boothIds.indexOf(doc.id) || 0;
      await doc.ref.set({ order: index }, { merge: true })
    });
  
    return data;
  } catch (e) {
    console.log(e);
    throw new Error(UPDATE_BOOTH_ERROR.WRITE_FAIL.toString());
  }
};

export default reoderBoothByEventId;
