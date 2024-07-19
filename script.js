const songs = [
    './Song/Ammage Adare.mp3',
    './Song/Anantha U ahasa mamai.mp3',
    './Song/Divi gamane.mp3',
    './Song/Edakale Nurthi.mp3',
    './Song/Kola Kamata.mp3',
    './Song/Met Bosat.mp3',
    './Song/Piya pataka liyala.mp3',
    './Song/Rahase horahin.mp3',
    './Song/Senehas Aranata.mp3',
    './Song/Senehasa ella.mp3',
    './Song/Shudhatmayanani.mp3',
    './Song/Sihina Atarin.mp3'
    // Add paths to your songs here
];
const SongNames = [
    'Ammage Adare',
    'Anantha U ahasa mamai',
    'Divi gamane',
    'Edakale Nurthi',
    'Kola Kamata',
    'Met Bosat',
    'Piya pataka liyala',
    'Rahase horahin',
    'Senehas Aranata',
    'Senehasa ella',
    'Shudhatmayanani',
    'Sihina Atarin'
    // Add names of your songs here
];

const playPause = [
    './PlayerControls/play.png',
    './PlayerControls/pause.png'
]

let currentSongIndex = 0;
const audioPlayer = document.getElementById('audioPlayer');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const playButton = document.getElementById('playButton');
const progressBar = document.getElementById('song-progress');
const playButtonImg = document.getElementById('playButtonImg');
const volumeSlider = document.getElementById('volumeSlider');

function changeTitle() {
    document.getElementById('song-title').innerHTML = "<b>" + SongNames[currentSongIndex] + "</b>";
}

// Function to update the progress bar range
function updateProgressBar() {
    progressBar.max = audioPlayer.duration;
    progressBar.value = audioPlayer.currentTime;
}

// Function to play the current song
function playSong(index) {
    audioPlayer.src = songs[index];
    audioPlayer.play();
}

// Change play/pause button image
function changePlayPause() {
    if (audioPlayer.paused) {
        playButtonImg.src = playPause[0];
    } else {
        playButtonImg.src = playPause[1];
    }
}

// Change song volume
function changeVolume() {
    audioPlayer.volume = volumeSlider.value / 100;
}

// Event listener for the volume slider
volumeSlider.addEventListener('input', changeVolume);

// Event listener for the Next button
nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
    changeTitle();
});

// Event listener for the Previous button
prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
    changeTitle();
});

// Event listener for the Play/Pause button
playButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    changePlayPause();
});

// Event listener to update progress bar when song is playing
audioPlayer.addEventListener('timeupdate', () => {
    progressBar.value = audioPlayer.currentTime;
});

// Event listener to update progress bar range and duration display when metadata is loaded
audioPlayer.addEventListener('loadedmetadata', () => {
    updateProgressBar();
});

// Event listener to seek the song when progress bar is changed
progressBar.addEventListener('change', () => {
    audioPlayer.currentTime = progressBar.value;
    audioPlayer.play();
    changePlayPause();
});

// Run function to change the song and play it
playSong(currentSongIndex);
changeTitle();

// Change volume slider value
volumeSlider.value = audioPlayer.volume * 100;

// Stop autoplay initially
audioPlayer.pause();

changePlayPause();



/////////////////////////////////////////////////////////////////////////

// Video Player


const videos = [
    './video/1.mp4',
    './video/2.mp4',
    './video/3.mp4',
    './video/4.mp4',
    './video/5.mp4'
];

let currentVideoIndex = 0;
const videoPlayer = document.getElementById('headerVideoPlayer');
const source = videoPlayer.getElementsByTagName('source')[0];
const vprevButton = document.getElementById('videoPrev');
const vnextButton = document.getElementById('videoNext');

function changeVideo() {
    source.src = videos[currentVideoIndex];
    videoPlayer.load();
}

function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    changeVideo();
}

function prevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    changeVideo();
}

vprevButton.addEventListener('click', prevVideo);
vnextButton.addEventListener('click', nextVideo);

function checkVideoEnd() {
    if (videoPlayer.currentTime >= videoPlayer.duration-1) {
        nextVideo();
    }
}

setInterval(checkVideoEnd, 500); // Check every second if the video has ended

changeVideo();
