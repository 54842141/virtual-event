import { Response } from 'express';

const setResponse = (res: Response, status: number, data: any ) => {
  let success = true;
  if (status !== 200) {
    success = false;
  }
  res.status(status).json({
    success,
    data,
  })
}

export default setResponse;
