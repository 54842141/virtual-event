import { Request, Response, RequestHandler } from 'express';
import updateWebinartByEventId from '../../helpers/webinars/updateWebinarByWebinarId'
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

const updateWebinar: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const eventId = req.query.event_id || req.params.eventId;
    const webinarId = req.query.webinar_id || req.params.webinar_id;
    if (eventId && webinarId) {
      const newData = await updateWebinartByEventId(eventId.toString(), webinarId.toString(), req.body);
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

export default updateWebinar;