const API_KEY = "AIzaSyCKHnH7eRDlsORRP8pTXY2lpyf9ls80dAk";
const CHANNEL_ID = "UCBxqKrvEf45YwruFdbZQslQ";

let shortsSlides = [];
let currentShortIndex = 0;

// Latest live
async function fetchLatestLive() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}&order=date&maxResults=1`;
  const res = await fetch(url);
  const data = await res.json();
  const liveDiv = document.getElementById("live-video");
  if(data.items && data.items.length>0){
    const videoId = data.items[0].id.videoId;
    liveDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`;
  } else { liveDiv.innerHTML = "No live video currently."; }
}

// Latest shorts
async function fetchLatestShorts() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=20&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  const carousel = document.getElementById("shorts-carousel");
  carousel.innerHTML = "";
  shortsSlides=[];

  for(let item of data.items){
    const videoId=item.id.videoId;
    const detailsRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`);
    const detailsData = await detailsRes.json();
    const duration = detailsData.items[0].contentDetails.duration;
    const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
    const minutes = match[1]?parseInt(match[1]):0;
    const seconds = match[2]?parseInt(match[2]):0;
    const totalSeconds = minutes*60+seconds;
    if(totalSeconds<=60){
      const slide = document.createElement("div");
      slide.classList.add("short-slide");
      slide.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`;
      carousel.appendChild(slide);
      shortsSlides.push(slide);
    }
  }
  if(shortsSlides.length>0) shortsSlides[0].classList.add("active");
  else carousel.innerHTML="No shorts available.";
}

function showShort(index){
  shortsSlides.forEach((slide,i)=>slide.classList.toggle("active", i===index));
}

document.addEventListener("DOMContentLoaded",()=>{
  const profileBtns = [document.getElementById("profileBtn"), document.getElementById("profileBtnHero")];
  const loadoutBtns = [document.getElementById("loadoutsBtn"), document.getElementById("loadoutsBtnHero")];

  profileBtns.forEach(btn=>btn.addEventListener("click",()=>window.open("https://codmunity.gg/profile/OLDAD_","_blank")));
  loadoutBtns.forEach(btn=>btn.addEventListener("click",()=>window.open("https://codmunity.gg/profile/OLDAD_","_blank")));

  document.getElementById("prev-short").addEventListener("click",()=>{if(shortsSlides.length===0)return; currentShortIndex=(currentShortIndex-1+shortsSlides.length)%shortsSlides.length; showShort(currentShortIndex);});
  document.getElementById("next-short").addEventListener("click",()=>{if(shortsSlides.length===0)return; currentShortIndex=(currentShortIndex+1)%shortsSlides.length; showShort(currentShortIndex);});

  fetchLatestLive();
  fetchLatestShorts();

  setInterval(()=>{ fetchLatestLive(); fetchLatestShorts(); }, 300000);

  // Particles.js
  particlesJS("particles-js", {
    particles: {
      number:{value:80,density:{enable:true,value_area:800}},
      color:{value:"#ffffff"},
      shape:{type:"circle"},
      opacity:{value:0.1,random:true},
      size:{value:3,random:true},
      line_linked:{enable:true,distance:150,color:"#ffffff",opacity:0.1,width:1},
      move:{enable:true,speed:1,direction:"none",random:true,straight:false,out_mode:"out"}
    },
    interactivity:{detect_on:"canvas",events:{onhover:{enable:true,mode:"repulse"},onclick:{enable:true,mode:"push"}},modes:{repulse:{distance:100},push:{particles_nb:4}}},
    retina_detect:true
  });
});
