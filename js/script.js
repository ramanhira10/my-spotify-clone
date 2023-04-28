console.log('Welcome to Spotify');

let songIndex = 1;
let isPreviousDisabled = true;
let isNextDisabled = true;

let audioElement = new Audio(`/songs/${songIndex}.mp3`);

let masterPlay = document.getElementById('masterPlay');
let previous = document.getElementById('previous');
let next = document.getElementById('next');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

let myProgressBar = document.getElementById('myProgressBar');

let songItemPlayCollection = Array.from(document.getElementsByClassName('song-item-play'));
let songItemsCollection = Array.from(document.getElementsByClassName('song-item'));

let songs = [{
    songName: 'Let me love you',
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg"
}, {
    songName: 'Don\'t be so stupid',
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg"
}, {
    songName: 'Para Para Paradise',
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg"
}, {
    songName: 'Promiscuous girl',
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg"
}, {
    songName: 'Take it or leave it',
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg"
}];

masterSongName.innerText = songs[0].songName;

songItemsCollection.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('song-name')[0].innerText = songs[i].songName;
});

/** Handle play/pause click */
masterPlay.addEventListener('click', evt => {
    isPreviousDisabled = false;
    isNextDisabled = false;
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.innerHTML = '<i class="fa-solid fa-2x fa-circle-pause"></i>';
        
    } else {
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.innerHTML = '<i class="fa-solid fa-2x fa-play-circle"></i>';
    }
});

previous.addEventListener('click', evt => {
    if (!isPreviousDisabled) {
        songIndex = songIndex < 1 ? 5 : (songIndex - 1);
        const filePath = `songs/${songIndex}.mp3`
        masterSongName.innerText = songs[songIndex - 1].songName;
        audioElement.src = filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.innerHTML = '<i class="fa-solid fa-2x fa-circle-pause"></i>';
    }
});

next.addEventListener('click', evt => {
    if (!isNextDisabled) {
        songIndex = songIndex > 5 ? 1 : (songIndex + 1);
        const filePath = `songs/${songIndex}.mp3`
        masterSongName.innerText = songs[songIndex - 1].songName;

        audioElement.src = filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.innerHTML = '<i class="fa-solid fa-2x fa-circle-pause"></i>';
    }
});

/** Listen to Events */
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration ) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

songItemPlayCollection.forEach(element => {
    element.addEventListener('click', evt => {
        // change the current clicked element to pause and change all others for play icon
        index = evt.target.parentElement.id;
        songIndex = index.toString().substring(index.toString().length - 1, index.toString().length);
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
    })
});