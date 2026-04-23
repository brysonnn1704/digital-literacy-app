const https = require('https');

const checkVideo = (id) => {
  return new Promise((resolve) => {
    https.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`, (res) => {
      resolve({ id, status: res.statusCode });
    }).on('error', () => resolve({ id, status: 'error' }));
  });
};

const ids = [
  'cl-u9Y3OBCE', '2vVFbHBRjSU', 'zH3v8X2YpT4', 
  'Y6N57e0TmoQ', '1vT2mPHbt0k', 'K9b5R2WvP1Y',
  'aO858HyFbKI', 'tQRYnxBiRuQ', 'M8q2V5ZcP3X',
  '8sQsu6oX9Sg', 'LP0yVFoIdIA', 'N7x4Z9QvC2B',
  'LVV_93mBfSU', 'mudNFCGF_PQ', 'P3y6B8VnK1M',
  'GJ4r86AZ2Xk', 'uYNEFJrpwXU', 'L5w2N8XtJ4D',
  'BU9YAd0pIvE', 'H2m9B4VpX1Q', 'T6x8N3ZqL2W',
  '2RmB-e8T_Cg', 'CldM92MqUdM', 'R4y9P7VbN5S'
];

async function run() {
  for (const id of ids) {
    const res = await checkVideo(id);
    console.log(`${res.id}: ${res.status}`);
  }
}
run();
