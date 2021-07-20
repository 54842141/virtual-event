const admin =  require('firebase-admin');

const getWebinarByEventId = async (
  eventId: string,
) => {
  const db = admin.firestore();
  const webinarsSnapshot = await db.collection('webinars').where('eventId', '==', eventId).get();
  const evnetWebinarData = await webinarsSnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  return evnetWebinarData;
};

export default getWebinarByEventId;
