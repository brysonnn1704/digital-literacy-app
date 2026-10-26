let blobSdk = null;
try {
  blobSdk = require("@vercel/blob");
} catch (e) {}

const BLOB_FILENAME = "digisaathi-database.json";

async function fetchRemoteData() {
  if (!blobSdk || (!process.env.VERCEL && !process.env.BLOB_STORE_ID)) {
    return null;
  }
  try {
    const { list } = blobSdk;
    const { blobs } = await list({ prefix: BLOB_FILENAME });
    const match = blobs.find(b => b.pathname === BLOB_FILENAME);
    if (match && match.url) {
      // Add cache buster to get fresh data across serverless lambdas
      const res = await fetch(`${match.url}?t=${Date.now()}`);
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    }
  } catch (err) {
    console.warn("⚠️ Vercel Blob read notice:", err.message);
  }
  return null;
}

async function saveRemoteData(data) {
  if (!blobSdk || (!process.env.VERCEL && !process.env.BLOB_STORE_ID)) {
    return;
  }
  try {
    const { put } = blobSdk;
    await put(BLOB_FILENAME, JSON.stringify(data, null, 2), {
      access: "public",
      addRandomSuffix: false
    });
  } catch (err) {
    console.warn("⚠️ Vercel Blob write notice:", err.message);
  }
}

module.exports = {
  fetchRemoteData,
  saveRemoteData
};
