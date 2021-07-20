const admin =  require('firebase-admin');
import { v4 as uuidv4 } from 'uuid';
// enum GET_EVENT_ERROR {
//   // eslint-disable-next-line no-unused-vars
//   INVALID_EVENT,
//   INVALID_REQUEST,
// }

const addBoothByEventId = async (
  booth: any,
) => {
  const db = admin.firestore();
  const boothsRef = db.collection('booths');
  const accessToken = uuidv4();
  const boothData = await boothsRef.add({
    ...booth,
    accessToken,
  });
  return {
    id: boothData.id,
    ...booth,
    accessToken,
  }
};

export default addBoothByEventId;
