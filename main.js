console.log("Lets write JS");
let currentSong = new Audio()
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";

  let mins = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);

  // Add leading 0 if needed
  if (mins < 10) mins = "0" + mins;
  if (secs < 10) secs = "0" + secs;

  return `${mins}:${secs}`;
}


const getSongs = async () => {
  let a = await fetch("http://127.0.0.1:3000/songs/");
  const response = await a.text();
  // console.log(response)
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("%5Csongs%5C")[1]);
    }
  }
  return songs;
};

const playMusic = async (track) => {
  // var audio = new Audio("/songs/"+track);
  currentSong.src="/songs/"+track
    // audio.play();
    currentSong.play()
    play.src="./images/pause.svg"
    document.querySelector(".songinfo").innerHTML=track.replaceAll("-", " ")
      .replaceAll(".mp3", "")
      .replaceAll("%20", " ")
      .replaceAll("Copy", "");
    document.querySelector(".songtime").innerHTML="00:00"

}

const main = async () => {
  let songs = await getSongs();
  // console.log(songs);
  let songUL = document
    .querySelector(".songsList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    let cleanName = song
      .replaceAll("-", " ")
      .replaceAll(".mp3", "")
      .replaceAll("%20", " ")
      .replaceAll("Copy", "");
  songUL.innerHTML += `
  <li>
    <img class="invert" src="./images/music.svg">

    <div class="info">
      <div class="realname" style="display:none">${song}</div>
      <div class="displayname">${cleanName}</div>
      <div>Anonymous</div>
    </div>

    <div class="playNow">
      <span>Play Now</span>
      <img class="invert" src="./images/playSong.svg">
    </div>
  </li>`;

  }
  // Array.from(document.querySelector(".songsList").getElementsByTagName("li")).forEach(e  => {
  //   // console.log(e.getElementsByTagName("div")[0])
  //   e.addEventListener("click",element=>{

  //     console.log(e.querySelector(".info").firstElementChild.innerHTML)
  //     playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
  //   })
    
  // });
  //   
  Array.from(document.querySelectorAll(".songsList li")).forEach(li => {
  li.addEventListener("click", () => {
    let real = li.querySelector(".realname").innerText;
    playMusic(real);
  });
});

play.addEventListener("click",()=>{
  if(currentSong.paused)
  {
    currentSong.play()
    play.src="./images/pause.svg"
  }else{
    currentSong.pause()
    play.src="./images/playSong.svg"
  }
})

currentSong.addEventListener("timeupdate",()=>{
  console.log(currentSong.currentTime, currentSong.duration)

  document.querySelector(".songtime").innerHTML=`${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`

  document.querySelector(".circle").style.left = (currentSong.currentTime/ currentSong.duration)*100 +"%"
})

// document.querySelector(".seekBar")


};
main();
