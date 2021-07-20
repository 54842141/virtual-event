import * as functions from 'firebase-functions';
import getBooth from './getBooth';
import addBooth from './addBooth';
import updateBooth from './updateBooth';
import deleteBooth from './deleteBooth';
import reorderBooth from './reorderBooth';

const express = require('express');;
const cors = require('cors');;
const app = express();

app.use(cors({origin: '*'}));

app.get('/*', getBooth);
app.post('/*', addBooth);
app.put('/', updateBooth);
app.put('/reorder', reorderBooth);
app.delete('/*', deleteBooth);

export default functions.runWith({
  timeoutSeconds: 60,
  memory: '1GB',
}).https.onRequest(app);
