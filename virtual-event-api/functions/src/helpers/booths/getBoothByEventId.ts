const admin =  require('firebase-admin');

const getBoothByBoothId = async (
  eventId: string,
) => {
  const db = admin.firestore();
  const boothsSnapshot = await db.collection('booths').where('eventId', '==', eventId).get();
  const evnetBoothData = await boothsSnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  return evnetBoothData;
};

export default getBoothByBoothId;
