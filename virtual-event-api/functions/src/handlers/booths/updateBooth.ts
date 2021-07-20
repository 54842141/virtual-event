import { Request, Response, RequestHandler } from 'express';
import updateBoothtByEventId from '../../helpers/booths/updateBoothtByBoothId'
import setResponse from '../../helpers/setResponse';
enum UPDATE_EVENT_ERROR {
  // eslint-disable-next-line no-unused-vars
  INVALID_EVENT,
  WRITE_FAIL,
  INVALID_REQUEST,
}

// const updateEventErrorMessage = {
//   [UPDATE_EVENT_ERROR.INVALID_EVENT]: 'The event you are trying to update is invalid.',
//   [UPDATE_EVENT_ERROR.INVALID_REQUEST]: 'The server received an invalid request',
//   [UPDATE_EVENT_ERROR.WRITE_FAIL]: 'Unable to write event data.',
// };

const updateBooth: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const eventId = req.query.event_id || req.params.eventId;
    const boothId = req.query.booth_id || req.params.booth_id;
    if (eventId && boothId) {
      const newData = await updateBoothtByEventId(eventId.toString(), boothId.toString(), req.body);
      setResponse(res, 200, newData);
    } else {
      throw new Error(UPDATE_EVENT_ERROR.INVALID_REQUEST.toString());
    }
  } catch (e) {
    if (e.message in UPDATE_EVENT_ERROR) {
      // setResponse(res, 400, { message: updateEventErrorMessage[e.message] })
    } else {
      console.error(e);
      setResponse(res, 500, { message: 'An internal error has occurred.'})
    }
  }
};

export default updateBooth;
