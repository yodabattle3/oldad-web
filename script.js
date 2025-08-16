document.getElementById("year").textContent = new Date().getFullYear();

const API_KEY = "AIzaSyCKHnH7eRDlsORRP8pTXY2lpyf9ls80dAk";
const CHANNEL_ID = "UCb0pJgZ8H2T6k9w7sY6fTSg"; // OLDAD_ channel ID

async function fetchLatestVideos() {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`);
    const data = await response.json();

    let latestLive = null;
    let latestShort = null;

    data.items.forEach(item => {
      if(item.id.kind === "youtube#video") {
        if(item.snippet.liveBroadcastContent === "live" && !latestLive) {
          latestLive = item.id.videoId;
        }
        if(item.snippet.title.toLowerCase().includes("short") && !latestShort) {
          latestShort = item.id.videoId;
        }
      }
    });

    const liveContainer = document.getElementById("latest-live");
    const shortContainer = document.getElementById("latest-short");

    liveContainer.innerHTML = latestLive
      ? `<iframe src="https://www.youtube.com/embed/${latestLive}" allowfullscreen></iframe>`
      : "No live currently.";

    shortContainer.innerHTML = latestShort
      ? `<iframe src="https://www.youtube.com/embed/${latestShort}" allowfullscreen></iframe>`
      : "No shorts found.";

  } catch(err) {
    console.error(err);
    document.getElementById("latest-live").textContent = "Error loading live video.";
    document.getElementById("latest-short").textContent = "Error loading short.";
  }
}

// Fetch on load
fetchLatestVideos();

// Auto-update every 60 seconds
setInterval(fetchLatestVideos, 60000);
