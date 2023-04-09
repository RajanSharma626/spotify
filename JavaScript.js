// ------------Variables----------
let songIndex = 0;
let audioElement = new Audio('audio/1.mp3');
let masterplay = document.getElementById('masterplay');
let progressBar = document.getElementById('progressBar');
let title = document.getElementById('title');
let playerPoster = document.getElementById('player-poster');
let songitems = Array.from(document.getElementsByTagName('songs'));

let songs = [
    { songName: "Blinding Lights <div class='subtitle'> The Weeknd</div>", path: "/audio/1.mp3", cover: "/img/blindibg-lights.jpg" },
    { songName: "On My Way <div class='subtitle'> Alan Walker</div>", path: "/audio/2.mp3", cover: "/img/onMyWay.jpg" },
    { songName: "Night Change <div class='subtitle'> One Direction</div>", path: "/audio/3.mp3", cover: "/img/four.jpg" },
    { songName: "Kalesh Chori <div class='subtitle'> DG IMMORTALS</div>", path: "/audio/4.mp3", cover: "/img/kaleshChori.jpg" },
    { songName: "As You Are <div class='subtitle'> The Weeknd</div>", path: "/audio/5.mp3", cover: "/img/As You Are.jpeg" },
    { songName: "Darkside <div class='subtitle'> Alan Walker</div>", path: "/audio/6.mp3", cover: "/img/DarkSide.jpg" },
    { songName: "Through the Dark <div class='subtitle'> One Direction</div>", path: "/audio/7.mp3", cover: "/img/midnight memories.jpg" },
    { songName: "Pathaan <div class='subtitle'> Vishal-Shekhar</div>", path: "/audio/8.mp3", cover: "/img/pathaan.jpg" },
    { songName: "I Was Never There <div class='subtitle'> The Weeknd</div>", path: "/audio/9.mp3", cover: "/img/i was never.jpg" },
    { songName: "Alone <div class='subtitle'> Alan Walker</div>", path: "/audio/10.mp3", cover: "/img/Alone.png" },
    { songName: "Friends <div class='subtitle'> Anni-Merie </div>", path: "/audio/11.mp3", cover: "/img/friends.jpg" },
    { songName: "Another World <div class='subtitle'> One Direction </div>", path: "/audio/12.mp3", cover: "/img/up all night.jpg" },
    { songName: "Khushi Jab Bhi Teri <div class='subtitle'> Jubin Nautiyal </div>", path: "/audio/13.mp3", cover: "/img/Khushi-Jab-Bhi-Teri.jpg" },
    { songName: "Ishq Sufiyana <div class='subtitle'> Krishna N. Sharma </div>", path: "/audio/14.mp3", cover: "/img/Ishq-Sufiyana.jpg" },
    { songName: "Chaand Baaliyan <div class='subtitle'> Aditya A. </div>", path: "/audio/15.mp3", cover: "/img/Chaand-baaliyan.jpg" },
    { songName: "Kooch Na Karin <div class='subtitle'> Azhar Abbas </div>", path: "/audio/16.mp3", cover: "/img/koochNaKarin.jpg" },

];

songitems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].cover;
    element.getElementsByClassName('name')[0].innerHTML = songs[i].songName;

});
//-------------Audio PLayer control--------------
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('bi-play-circle-fill')
        masterplay.classList.add('bi-pause-circle-fill')
    } else {
        audioElement.pause();
        masterplay.classList.remove('bi-pause-circle-fill')
        masterplay.classList.add('bi-play-circle-fill')
    }
})
//------------Event Listener----

let start = document.getElementById('start');
let end = document.getElementById('end');

audioElement.addEventListener('timeupdate', () => {
    let mint = Math.floor(audioElement.duration / 60);
    let sec = Math.floor(audioElement.duration % 60);

    if (sec < 10) {
        sec = `0${sec}`;
    }
    end.innerHTML = `${mint}:${sec}`;


    let curMint = Math.floor(audioElement.currentTime / 60);
    let curSec = Math.floor(audioElement.currentTime % 60);
    if (curSec < 10) {
        curSec = `0${curSec}`;
    }

    start.innerHTML = `${curMint}:${curSec}`;

    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    progressBar.value = progress;
})

let vol = document.getElementById('volume');
let volume_icon = document.getElementById('volume_icon');
volume.addEventListener('change', () => {
    if (vol.value == 0) {
        volume_icon.classList.remove('bi-volume-down');
        volume_icon.classList.add('bi-volume-mute');

    }
    if (vol.value > 0) {

        volume_icon.classList.remove('bi-volume-mute');
        volume_icon.classList.add('bi-volume-down');
    }

    audioElement.volume = vol.value / 100;
})

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('p-btn')).forEach((element) => {
        element.classList.remove('bi-pause-circle-fill');
        element.classList.add('bi-play-circle-fill');
    })
}

Array.from(document.getElementsByClassName('p-btn')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays()
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        audioElement.src = `audio/${songIndex + 1}.mp3`;
        title.innerHTML = songs[songIndex].songName;
        playerPoster.src = songs[songIndex].cover;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('bi-play-circle-fill');
        masterplay.classList.add('bi-pause-circle-fill');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 15) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    audioElement.src = `audio/${songIndex + 1}.mp3`;
    title.innerHTML = songs[songIndex].songName;
    playerPoster.src = songs[songIndex].cover;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('bi-play-circle-fill');
    masterplay.classList.add('bi-pause-circle-fill');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex < 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `audio/${songIndex + 1}.mp3`;
    title.innerHTML = songs[songIndex].songName;
    playerPoster.src = songs[songIndex].cover;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('bi-play-circle-fill');
    masterplay.classList.add('bi-pause-circle-fill');
})



