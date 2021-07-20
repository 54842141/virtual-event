const admin =  require('firebase-admin');

const getBannersByBannerContainerId = async (
  bannerContainerId: string,
) => {
  const db = admin.firestore();
  const bannerContainersSnapshot = await db.collection('banners').where('bannerContainerId', '==', bannerContainerId).get();
  const evnetBannerContainerData = await bannerContainersSnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  return evnetBannerContainerData;
};

export default getBannersByBannerContainerId;
