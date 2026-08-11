const WEDDING_DATE = new Date("2027-02-16T09:00:00+07:00");

const openButton = document.getElementById("openInvitation");
openButton.addEventListener("click", () => {
  document.body.classList.remove("locked");
  document.getElementById("blessing")?.scrollIntoView({behavior:"smooth"});
  document.querySelector(".blessing").scrollIntoView({behavior:"smooth"});
});

function updateCountdown(){
  const diff = WEDDING_DATE - new Date();
  const safe = Math.max(0, diff);
  const s = Math.floor(safe/1000);
  const days = Math.floor(s/86400);
  const hours = Math.floor((s%86400)/3600);
  const minutes = Math.floor((s%3600)/60);
  const seconds = s%60;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");
}
updateCountdown(); setInterval(updateCountdown,1000);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");
const musicStatus = document.getElementById("musicStatus");
musicButton.addEventListener("click", async ()=>{
  try{
    if(music.paused){ await music.play(); musicStatus.textContent="music on"; musicButton.textContent="Ⅱ"; }
    else { music.pause(); musicStatus.textContent="music off"; musicButton.textContent="♪"; }
  }catch(e){
    musicStatus.textContent="add music.mp3";
  }
});

document.querySelectorAll(".copy-btn").forEach(btn=>{
  btn.addEventListener("click", async ()=>{
    await navigator.clipboard.writeText(btn.dataset.copy);
    const old=btn.textContent; btn.textContent="Copied ✓";
    setTimeout(()=>btn.textContent=old,1500);
  });
});

document.getElementById("rsvpForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  document.getElementById("formNote").textContent =
    "Demo mode: connect this form to Google Forms before publishing.";
});

const wishes = document.getElementById("wishList");
const wishText = document.getElementById("wishText");
document.getElementById("wishButton").addEventListener("click",()=>{
  const text = wishText.value.trim();
  if(!text) return;
  const item = document.createElement("div");
  item.className="wish";
  item.innerHTML="<b>With love</b>"+text.replace(/[<>&]/g,m=>({"<":"&lt;",">":"&gt;","&":"&amp;"}[m]));
  wishes.prepend(item);
  wishText.value="";
});
