import addWebinarByEventId from '../../helpers/webinars/addWebinarByEventId';
import { Request, Response, RequestHandler } from 'express';
import setResponse from '../../helpers/setResponse';

enum GET_EVENT_ERROR {
  // eslint-disable-next-line no-unused-vars
  INVALID_EVENT,
  INVALID_REQUEST,
}

// const getEventErrorMessage = {
//   [GET_EVENT_ERROR.INVALID_EVENT]: 'The event you are trying to get is invalid.',
//   [GET_EVENT_ERROR.INVALID_REQUEST]: 'The server received an invalida request. ',
// };

const addWebinar: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { eventId } = req.body
    if (eventId) {
      const eventData = await addWebinarByEventId(req.body);
      if (eventData) {
        setResponse(res, 200, eventData);
      } else {
        throw new Error(GET_EVENT_ERROR.INVALID_REQUEST.toString());
      }
    } else {
      throw new Error(GET_EVENT_ERROR.INVALID_REQUEST.toString());
    }
  } catch (e) {
    if (e.message in GET_EVENT_ERROR) {
      res.status(400).send({
        // message: getEventErrorMessage[e.message],
      });
    } else {
      console.error(e);
      res.status(500).json({
        message: 'An internal error has occurred.',
      });
    }
  }
};

export default addWebinar;
