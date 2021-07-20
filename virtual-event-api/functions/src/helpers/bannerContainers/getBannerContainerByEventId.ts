const admin =  require('firebase-admin');

const getBannerContainerByBannerContainerId = async (
  eventId: string,
) => {
  const db = admin.firestore();
  const bannerContainersSnapshot = await db.collection('bannerContainers').where('eventId', '==', eventId).get();
  const evnetBannerContainerData = await bannerContainersSnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  return evnetBannerContainerData;
};

export default getBannerContainerByBannerContainerId;
