const API_KEY = "AIzaSyCKHnH7eRDlsORRP8pTXY2lpyf9ls80dAk";
const CHANNEL_ID = "UCTF1owTJAGN4OtNpSrf267Q"; // Replace with your OLDAD channel ID

async function fetchLatestLive() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}&order=date&maxResults=1`;
  const response = await fetch(url);
  const data = await response.json();

  const liveDiv = document.getElementById("live-video");

  if (data.items && data.items.length > 0) {
    const videoId = data.items[0].id.videoId;
    liveDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`;
  } else {
    liveDiv.innerHTML = "No live video currently.";
  }
}

async function fetchLatestShort() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=1&q=short`;
  const response = await fetch(url);
  const data = await response.json();

  const shortDiv = document.getElementById("short-video");

  if (data.items && data.items.length > 0) {
    const videoId = data.items[0].id.videoId;
    shortDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`;
  } else {
    shortDiv.innerHTML = "No shorts available.";
  }
}

// Profile button
document.addEventListener("DOMContentLoaded", () => {
  const profileBtn = document.getElementById("profileBtn");
  profileBtn.addEventListener("click", () => {
    window.open("https://codmunity.gg/profile/OLDAD_", "_blank");
  });

  const loadoutsBtn = document.getElementById("loadoutsBtn");
  loadoutsBtn.addEventListener("click", () => {
    window.open("https://codmunity.gg/profile/OLDAD_", "_blank");
  });

  fetchLatestLive();
  fetchLatestShort();
});
