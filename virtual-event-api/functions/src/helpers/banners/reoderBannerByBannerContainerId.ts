const admin = require('firebase-admin');

enum UPDATE_BOOTH_ERROR {
  // eslint-disable-next-line no-unused-vars
  INVALID_BOOTH,
  WRITE_FAIL,
  INVALID_REQUEST,
}

const reoderBannerByBannerContainerId = async (bannerContainerId: string,  data: Record<string, any>) => {
  const db = admin.firestore();
  const bannerContainerRef = db.collection('banners').where('bannerContainerId', '==', bannerContainerId);
  const bannerContainerDoc = await bannerContainerRef.get();
  if (bannerContainerDoc.empty) {
    throw new Error(UPDATE_BOOTH_ERROR.INVALID_BOOTH.toString());
  }
  try {
    bannerContainerDoc.docs.forEach(async (doc: any) => {
      const index = data.bannerIds.indexOf(doc.id) || 0;
      console.log(doc.id, index)
      await doc.ref.set({ order: index }, { merge: true })
    });
  
    return data;
  } catch (e) {
    console.log(e);
    throw new Error(UPDATE_BOOTH_ERROR.WRITE_FAIL.toString());
  }
};

export default reoderBannerByBannerContainerId;
