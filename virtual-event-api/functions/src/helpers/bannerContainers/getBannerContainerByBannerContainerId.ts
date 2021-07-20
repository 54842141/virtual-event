const admin =  require('firebase-admin');

enum GET_BOOTH_ERROR {
  // eslint-disable-next-line no-unused-vars
  INVALID_BOOTH,
  BOOTH_NOT_FIND,
  INVALID_REQUEST,
}

const getBannerContainerByBannerContainerId = async (
  eventId: string,
  bannerContainerId: string
) => {
  const db = admin.firestore();
  const bannerContainerRef = db.collection('bannerContainers').doc(bannerContainerId);
  const bannerContainerDoc = await bannerContainerRef.get();
  if (bannerContainerDoc.empty) {
    throw new Error(GET_BOOTH_ERROR.INVALID_BOOTH.toString());
  }
  const bannerContainerData = bannerContainerDoc.data();
  if (bannerContainerData.eventId !== eventId) {
    throw new Error(GET_BOOTH_ERROR.BOOTH_NOT_FIND.toString());
  }
  const bannersSnapshot = await db.collection('banners').where('bannerContainerId', '==', bannerContainerId).get();
  const banners = bannersSnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  return {
    ...bannerContainerData,
    banners,
  };
};

export default getBannerContainerByBannerContainerId;
