import * as functions from 'firebase-functions';
import addAnnoucement from './addAnnoucement';

const express = require('express');;
const cors = require('cors');;
const app = express();

app.use(cors({origin: '*'}));

app.post('/*', addAnnoucement);

export default functions.runWith({
  timeoutSeconds: 60,
  memory: '1GB',
}).https.onRequest(app);
