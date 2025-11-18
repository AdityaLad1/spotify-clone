console.log("Lets write JS");

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

const main = async () => {
  let songs = await getSongs();
  console.log(songs);
  let songUL = document
    .querySelector(".songsList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      ` <li>
                <img class="invert" src="./images/music.svg" alt="Music icon">
                <div class="info">

                  <div>${song
                    .replaceAll("-", " ")
                    .replaceAll(".mp3", "")
                    .replaceAll("%20", "")
                    .replaceAll("Copy", "")}</div>
                  <div>Anonymous</div>
                </div>
                <div class="playNow">
                  <span>Play Now</span>
                  <img class="invert" src="./images/playSong.svg" alt="Play Button">
                </div>
              </li>`;
  }
  //   var audio = new Audio(allSongs[0]);
  //   audio.play();
};
main();
