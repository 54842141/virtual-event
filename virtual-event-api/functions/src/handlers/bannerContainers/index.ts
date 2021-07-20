import * as functions from 'firebase-functions';
import getBannerContainer from './getBannerContainer';
import addBannerContainer from './addBannerContainer';
import updateBannerContainer from './updateBannerContainer';
import deleteBannerContainer from './deleteBannerContainer';

const express = require('express');;
const cors = require('cors');;
const app = express();

app.use(cors({origin: '*'}));

app.get('/*', getBannerContainer);
app.post('/*', addBannerContainer);
app.put('/*', updateBannerContainer);
app.delete('/*', deleteBannerContainer);

export default functions.runWith({
  timeoutSeconds: 60,
  memory: '1GB',
}).https.onRequest(app);
