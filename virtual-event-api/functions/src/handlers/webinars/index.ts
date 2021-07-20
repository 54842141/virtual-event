import * as functions from 'firebase-functions';
import getWebinar from './getWebinar';
import addWebinar from './addWebinar';
import updateWebinar from './updateWebinar';
import deleteWebinar from './deleteWebinar';

const express = require('express');;
const cors = require('cors');;
const app = express();

app.use(cors({origin: '*'}));

app.get('/*', getWebinar);
app.post('/*', addWebinar);
app.put('/*', updateWebinar);
app.delete('/*', deleteWebinar);

export default functions.runWith({
  timeoutSeconds: 60,
  memory: '1GB',
}).https.onRequest(app);
