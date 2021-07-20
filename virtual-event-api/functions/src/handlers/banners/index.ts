import * as functions from 'firebase-functions';
import getBannerContainer from './getBanner';
import addBannerContainer from './addBanner';
import updateBannerContainer from './updateBanner';
import deleteBannerContainer from './deleteBanner';
import reorderBanner from './reorderBanner';

const express = require('express');;
const cors = require('cors');;
const app = express();

app.use(cors({origin: '*'}));

app.get('/*', getBannerContainer);
app.post('/*', addBannerContainer);
app.put('/', updateBannerContainer);
app.put('/reorder', reorderBanner);
app.delete('/*', deleteBannerContainer);

export default functions.runWith({
  timeoutSeconds: 60,
  memory: '1GB',
}).https.onRequest(app);
