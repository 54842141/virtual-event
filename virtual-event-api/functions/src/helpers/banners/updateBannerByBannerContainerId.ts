const admin = require('firebase-admin');

enum UPDATE_BOOTH_ERROR {
  // eslint-disable-next-line no-unused-vars
  INVALID_BOOTH,
  WRITE_FAIL,
  INVALID_REQUEST,
}

const updateBannerByBannerContainerId = async (bannerContainerId: string, bannerId: string,  data: Record<string, any>) => {
  const db = admin.firestore();
  const bannerContainerRef = db.collection('banners').doc(bannerId);
  const bannerContainerDoc = await bannerContainerRef.get();
  if (bannerContainerDoc.empty || bannerContainerDoc.data().bannerContainerId !== bannerContainerId) {
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

export default updateBannerByBannerContainerId;
