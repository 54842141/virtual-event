const admin =  require('firebase-admin');

enum GET_BOOTH_ERROR {
  // eslint-disable-next-line no-unused-vars
  INVALID_BOOTH,
  BOOTH_NOT_FIND,
  INVALID_REQUEST,
}

const getBannerContainerByBannerContainerId = async (
  bannerContainerId: string,
  bannerId: string,
) => {
  const db = admin.firestore();
  const bannerContainerRef = db.collection('banners').doc(bannerId);
  const bannerContainerDoc = await bannerContainerRef.get();
  if (bannerContainerDoc.empty) {
    throw new Error(GET_BOOTH_ERROR.INVALID_BOOTH.toString());
  }
  const bannerContainerData = bannerContainerDoc.data();
  if (bannerContainerData.bannerContainerId !== bannerContainerId) {
    throw new Error(GET_BOOTH_ERROR.BOOTH_NOT_FIND.toString());
  }
  bannerContainerRef.delete();
  return bannerContainerData;
};

export default getBannerContainerByBannerContainerId;
