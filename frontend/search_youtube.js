const https = require('https');

const searchYT = (query) => {
  return new Promise((resolve) => {
    const q = encodeURIComponent(query);
    https.get(`https://www.youtube.com/results?search_query=${q}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const regex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
        let match;
        const ids = [];
        while ((match = regex.exec(data)) !== null) {
          ids.push(match[1]);
        }
        // Filter out shorts and channel IDs if possible, but just take the first unique one that looks like a video
        resolve(ids[0] || 'NOT_FOUND');
      });
    }).on('error', () => resolve('ERROR'));
  });
};

const queries = {
  1: { EN: "how to use UPI in english tutorial", HI: "UPI kaise use kare hindi", MR: "UPI marathi mahiti" },
  2: { EN: "how to identify scam calls", HI: "scam call se kaise bache", MR: "scam calls marathi info" },
  3: { EN: "how to spot fake websites", HI: "fake website kaise pehchane", MR: "fake website marathi" },
  4: { EN: "how to use whatsapp for beginners", HI: "whatsapp kaise chalaye", MR: "whatsapp kase vaprache marathi" },
  5: { EN: "how to search on google", HI: "google par search kaise kare", MR: "google search kase karayche" },
  6: { EN: "android phone settings explained", HI: "phone ki setting kaise kare", MR: "mobile settings marathi mahiti" },
  7: { EN: "how to fill online forms safely", HI: "online form kaise bhare", MR: "online form marathi" },
  8: { EN: "gmail tutorial for beginners", HI: "email kaise bhejte hain", MR: "email marathi mahiti" }
};

async function run() {
  const results = {};
  for (const lesson in queries) {
    results[lesson] = {};
    for (const lang in queries[lesson]) {
      const id = await searchYT(queries[lesson][lang]);
      results[lesson][lang] = id;
    }
  }
  console.log(JSON.stringify(results, null, 2));
}
run();
