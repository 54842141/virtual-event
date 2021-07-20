const admin =  require('firebase-admin');

interface bannerContainerType {
  eventId: string,
  announcement: string,
}

const addBannerByBannerContainerId = async ({
  eventId,
  announcement,
}: bannerContainerType) => {
  const db = admin.firestore();
  const announcementsRef = db.collection('announcements');
  const announcementsData = await announcementsRef.add({
    eventId,
    message: announcement,
  });
  return {
    id: announcementsData.id,
    eventId,
    announcement,
    message: announcement,
  }
};

export default addBannerByBannerContainerId;
