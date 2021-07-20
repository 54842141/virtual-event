import * as functions from 'firebase-functions';
import getEvent from './getEvent';
import addEvent from './addEvent';
import updateEvent from './updateEvent';
import getAllBooth from './getAllBooth';
import getAllWebinar from './getAllWebinar';
import getBannerContainers from './getBannerContainers';

const express = require('express');;
const cors = require('cors');;
const app = express();

app.use(cors({origin: '*'}));

app.get('/', getEvent);
app.get('/booth', getAllBooth);
app.get('/webinar', getAllWebinar);
app.get('/bannerContainer', getBannerContainers);
app.post('/*', addEvent);
app.put('/*', updateEvent);
// app.delete('/*', deleteEvent);

export default functions.runWith({
  timeoutSeconds: 60,
  memory: '1GB',
}).https.onRequest(app);
