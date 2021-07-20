const admin =  require('firebase-admin');

enum GET_EVENT_ERROR {
  // eslint-disable-next-line no-unused-vars
  INVALID_EVENT,
  INVALID_REQUEST,
}

const getEventByEventDomain = async (
  eventId: string
) => {
  const db = admin.firestore();
  const eventsRef = db.collection('events').doc(eventId);
  const eventDoc = await eventsRef.get();
  if (eventDoc.empty) {
    throw new Error(GET_EVENT_ERROR.INVALID_EVENT.toString());
  }
  const eventData = eventDoc.data();
  const bannerData = await db.collection('bannerContainers').where('eventId', '==', eventDoc.id).get();
  const bannerContainer = await Promise.all(bannerData.docs.map(async (doc: any) => {
    const bannerRef = await db.collection('banners').where('bannerContainerId', '==', doc.id).get();
    const banners = await Promise.all(bannerRef.docs.map(async (banner: any) => ({
      id: banner.id,
      ...banner.data(),
    })));
    const result = await {
      id: doc.id,
      ...doc.data(),
      banners,
    };
    console.log(result);
    return result;
  }
  ));
  console.log(bannerContainer);
  // const eventRef = eventDoc.ref;
  // const bannerAssetsCollectionSnapshot = await eventRef.collection('bannerAssets').get();
  // if (!bannerAssetsCollectionSnapshot.empty) {
  //   const bannerAssetsDocs = bannerAssetsCollectionSnapshot.docs;
  //   bannerAssetData = await Promise.all(bannerAssetsDocs?.map(async (bannerAssetsDoc) => {
  //     const bannerAssetCollectionSnapShot = await bannerAssetsDoc.ref.collection('bannerAsset').get();
  //     const bannerAssetDatas = bannerAssetCollectionSnapShot.docs.map(bannerAsset => bannerAsset.data());
  //     return {
  //       ...bannerAssetsDoc.data(),
  //       bannerAsset: bannerAssetDatas
  //     }
  //   }));
  // }
  return {
    ...eventData,
    lobby: {
      ...eventData.lobby,
      bannerContainer,
    },
  };
};

export default getEventByEventDomain;
