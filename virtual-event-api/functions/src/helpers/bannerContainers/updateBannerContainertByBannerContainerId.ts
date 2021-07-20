const admin = require('firebase-admin');

enum UPDATE_BOOTH_ERROR {
  // eslint-disable-next-line no-unused-vars
  INVALID_BOOTH,
  WRITE_FAIL,
  INVALID_REQUEST,
}

const updateBannerContainertByEventId = async (eventId: string, bannerContainerId: string, data: Record<string, any>) => {
  const db = admin.firestore();
  const bannerContainerRef = db.collection('bannerContainers').doc(bannerContainerId);
  const bannerContainerDoc = await bannerContainerRef.get();
  if (bannerContainerDoc.empty || bannerContainerDoc.data().eventId !== eventId) {
    throw new Error(UPDATE_BOOTH_ERROR.INVALID_BOOTH.toString());
  }
  try {
    await bannerContainerRef.set({ ...data }, { merge: true });
    return data;
  } catch (e) {
    console.log(e);
    throw new Error(UPDATE_BOOTH_ERROR.WRITE_FAIL.toString());
  }
};

export default updateBannerContainertByEventId;
