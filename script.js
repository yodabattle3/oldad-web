const API_KEY = "AIzaSyCKHnH7eRDlsORRP8pTXY2lpyf9ls80dAk";
const CHANNEL_ID = "UCBxqKrvEf45YwruFdbZQslQ";

// Latest live video
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

// Latest short video (<60s)
async function fetchLatestShort() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=10&key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  const shortDiv = document.getElementById("short-video");

  if (data.items && data.items.length > 0) {
    for (let item of data.items) {
      const videoId = item.id.videoId;
      const detailsRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`);
      const detailsData = await detailsRes.json();
      const duration = detailsData.items[0].contentDetails.duration;

      const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
      let minutes = match[1] ? parseInt(match[1]) : 0;
      let seconds = match[2] ? parseInt(match[2]) : 0;
      const totalSeconds = minutes * 60 + seconds;

      if (totalSeconds <= 60) {
        shortDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`;
        return;
      }
    }
    shortDiv.innerHTML = "No shorts available.";
  } else {
    shortDiv.innerHTML = "No videos found.";
  }
}

// Buttons
document.addEventListener("DOMContentLoaded", () => {
  const profileBtns = [document.getElementById("profileBtn"), document.getElementById("profileBtnHero")];
  const loadoutBtns = [document.getElementById("loadoutsBtn"), document.getElementById("loadoutsBtnHero")];

  profileBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      window.open("https://codmunity.gg/profile/OLDAD_", "_blank");
    });
  });

  loadoutBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      window.open("https://codmunity.gg/profile/OLDAD_", "_blank");
    });
  });

  fetchLatestLive();
  fetchLatestShort();

  // Auto-refresh every 5 minutes
  setInterval(() => {
    fetchLatestLive();
    fetchLatestShort();
  }, 300000); // 300,000ms = 5 minutes
});
