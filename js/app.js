const play = document.querySelector(".fa-circle-play");
const prev = document.querySelector(".fa-backward-step");
const next = document.querySelector(".fa-forward-step");
const img = document.querySelector("img");
const title = document.querySelector(".card-title");
const singer = document.querySelector(".card-text");
const volumeInput = document.querySelector("#customRange1");
const collapseList = document.querySelector(".list-group");
const progressBar = document.querySelector(".progress-bar");
const durationEnd = document.querySelector(".d-end");
const durationStart = document.querySelector(".d-start");
const inputRange = document.querySelector("#skip");

const musicPlayer = new MusicPlayer(musicList);
let audio = document.querySelector("audio");


const initCollapseList = () =>
{
    let musicsHtml = ``;
    for(let music of musicList)
    {
        musicsHtml =  `<li class="list-group-item ${musicPlayer.getCurrentMusic().title == music.title ? 'active' : ''}">${music.title}</li>`;
        collapseList.insertAdjacentHTML("beforeend",musicsHtml);
    }
    
}


const prepareMusic = () =>
{
    let music = musicPlayer.getCurrentMusic();
    audio.src = "mp3/" + music.audio;
    img.src = "img/"+ music.img;
    title.textContent = music.title;
    singer.textContent = music.singer;
}

const pauseMusic = () => 
{
    audio.pause();
    play.className = 'fa-solid fa-circle-play fa-3x'
}

const playMusic = () =>
{
    audio.play();
    play.className = 'fa-solid fa-circle-pause fa-3x'
}

play.addEventListener("click", () => {
    
    play.classList.contains("fa-circle-play") ?
    playMusic() : pauseMusic();
  

});

prev.addEventListener("click", ()=>
{
    musicPlayer.prev();
    prepareMusic();
    playMusic();
    setActive();
    
    
});

next.addEventListener("click", ()=>
{
    musicPlayer.next();
    prepareMusic();
    playMusic();
    setActive();
});

volumeInput.addEventListener("input", () =>
{
    audio.volume = volumeInput.value / 100;
});
audio.addEventListener("loadedmetadata", ()=>
{
    duration = calculateDuration(audio.duration);
    durationEnd.textContent = duration;
});
audio.addEventListener("timeupdate",(e)=>{
    durationStart.textContent = calculateDuration(audio.currentTime);
    progressBar.style.width = calculateWidthPerc() + "%";
    
});


let calculateWidthPerc = () => {
   return 100 * audio.currentTime / audio.duration;
}

function calculateDuration(time)
{
    let minute = Math.floor(time/60);
    let second = Math.floor(time % 60);
    return second < 10 ? minute + "." + "0" + second : minute + "." + second;
}


function setActive()
{
    document.querySelector(".active").classList.remove("active");
    for(let musicItem of collapseList.children)
    {
        if(musicPlayer.getCurrentMusic().title == musicItem.textContent)
        {
            musicItem.classList.add("active");
        }
    } 
}



initCollapseList();
prepareMusic();
