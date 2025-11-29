console.log("Lets write JS");
let currentSong = new Audio()

let songs;
let currFolder;
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";

  let mins = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);

  // Add leading 0 if needed
  if (mins < 10) mins = "0" + mins;
  if (secs < 10) secs = "0" + secs;

  return `${mins}:${secs}`;
}


const getSongs = async (folder) => {
  currFolder = folder;
  let a = await fetch(`http://127.0.0.1:3000/${currFolder}/`);
  const response = await a.text();
  // console.log(response)
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  songs = [];
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("%5Csongs%5C")[1].split("cs%5C")[1]);
    }
  }
   let songUL = document
    .querySelector(".songsList")
    .getElementsByTagName("ul")[0];
    songUL.innerHTML=""
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
  
  Array.from(document.querySelectorAll(".songsList li")).forEach(li => {
  li.addEventListener("click", () => {
    let real = li.querySelector(".realname").innerText;
    playMusic(real);
  });
});
};

const playMusic = async (track,pause = false) => {
  // var audio = new Audio("/songs/"+track);
  // currentSong.src="/songs/"+track
  currentSong.src=`/${currFolder}/`+track
    // audio.play();
    if(!pause){
      currentSong.play()
      // play.src="./images/playSong.svg"
      play.src="./images/pause.svg"


    }
    document.querySelector(".songinfo").innerHTML=track.replaceAll("-", " ")
      .replaceAll(".mp3", "")
      .replaceAll("%20", " ")
      .replaceAll("Copy", "");
    document.querySelector(".songtime").innerHTML="00:00"

}

const main = async () => {
 await getSongs("songs/mcs");
  playMusic(songs[0],true)
  // console.log(songs);
 

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

document.querySelector(".seekbar").addEventListener("click",e=>{
  // console.log()
    document.querySelector(".circle").style.left = (e.offsetX/e.target.getBoundingClientRect().width)*100+"%"
    currentSong.currentTime= ((currentSong.duration)*(e.offsetX/e.target.getBoundingClientRect().width)*100)/100
})

document.querySelector(".hamburger").addEventListener("click",()=>{
  document.querySelector(".leftContainer").style.left = "0";
})

document.querySelector(".close").addEventListener("click",()=>{
  document.querySelector(".leftContainer").style.left = "-100%";
})

previous.addEventListener("click",()=>{
  console.log('Previous song')

  console.log(currentSong.src.split("/").slice(-1))
  console.log(songs)

  let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
  console.log(index)
  if((index - 1)>=0){
    playMusic(songs[index-1])
  }  
})
next.addEventListener("click",()=>{
  console.log('Previous song')

  console.log(currentSong.src.split("/").slice(-1))
  console.log(songs)

  let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
  console.log(index)
  if((index + 1)<= songs.length-1){
    playMusic(songs[index+1])
  }  
})

document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
  console.log(e)
  currentSong.volume=parseInt(e.target.value)/100
  console.log(e.target.value)
})

Array.from(document.getElementsByClassName("entireCard")).forEach(e=>{
  e.addEventListener("click",async (item ) => {
    // console.log(await getSongs(`songs/${item.currentTarget.dataset.folder}`))
    songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
    // item.currentTarget.dataset.folder
  })
})


};
main();
