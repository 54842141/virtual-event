const admin =  require('firebase-admin');

interface bannerContainerType {
  bannerContainerId: string,
  type: string,
  src: string,
  redirectUrl: string;
  externalLink: boolean;
}

const addBannerByBannerContainerId = async ({
  bannerContainerId,
  type = '',
  src = '',
  redirectUrl = '',
  externalLink = false,
}: bannerContainerType) => {
  const db = admin.firestore();
  const bannerContainersRef = db.collection('banners');
  const bannerRef = await db.collection('banners').where('bannerContainerId', '==', bannerContainerId).get();
  const order = bannerRef.docs.length
  const bannerContainerData = await bannerContainersRef.add({
    bannerContainerId,
    type,
    src,
    redirectUrl,
    externalLink,
    order,
  });
  return {
    id: bannerContainerData.id,
    bannerContainerId,
    type,
    src,
    redirectUrl,
    externalLink,
    order,
  }
};

export default addBannerByBannerContainerId;
