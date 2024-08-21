// Music player
const songs = [
  "./Song/Ammage Adare.mp3",
  "./Song/Anantha U ahasa mamai.mp3",
  "./Song/Divi gamane.mp3",
  "./Song/Edakale Nurthi.mp3",
  "./Song/Kola Kamata.mp3",
  "./Song/Met Bosat.mp3",
  "./Song/Piya pataka liyala.mp3",
  "./Song/Rahase horahin.mp3",
  "./Song/Senehas Aranata.mp3",
  "./Song/Senehasa ella.mp3",
  "./Song/Shudhatmayanani.mp3",
  "./Song/Sihina Atarin.mp3",
  // Add paths to your songs here
];
const SongNames = [
  "Ammage Adare",
  "Anantha U ahasa mamai",
  "Divi gamane",
  "Edakale Nurthi",
  "Kola Kamata",
  "Met Bosat",
  "Piya pataka liyala",
  "Rahase horahin",
  "Senehas Aranata",
  "Senehasa ella",
  "Shudhatmayanani",
  "Sihina Atarin",
  // Add names of your songs here
];

const playPause = ["./PlayerControls/play.svg", "./PlayerControls/pause.svg"];

let currentSongIndex = 0;
const mainPlayer = document.getElementById("mainPlayer");
const songTitle = document.getElementById("musicTitle");
const musicPlayer = document.getElementById("musicPlayer");
const musicControls = document.getElementById("musicControls");
const musicProgress = document.getElementById("musicProgress");
const musicPlay = document.getElementById("musicPlay");
const musicNext = document.getElementById("musicNext");
const musicPrev = document.getElementById("musicPrev");
const musicPlayImg = document.getElementById("musicPlayImg");
const musicVolumeRange = document.getElementById("musicVolumeRange");

musicPlay.src = playPause[0];
function changeSong() {
  mainPlayer.src = songs[currentSongIndex];
  songTitle.innerHTML = SongNames[currentSongIndex];
}
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  changeSong();
  mainPlayer.play();
  musicPlayImg.src = playPause[1];
}
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  changeSong();
  mainPlayer.play();
  musicPlayImg.src = playPause[1];
}
function playPauseSong() {
  if (mainPlayer.paused) {
    mainPlayer.play();
    musicPlayImg.src = playPause[1];
  } else {
    mainPlayer.pause();
    musicPlayImg.src = playPause[0];
  }
}

addEventListener("load", changeSong);
mainPlayer.pause();
musicNext.addEventListener("click", nextSong);
musicPrev.addEventListener("click", prevSong);
musicPlay.addEventListener("click", playPauseSong);

// volume

musicVolumeRange.value = mainPlayer.volume * 100;
function changeVolume() {
  mainPlayer.volume = musicVolumeRange.value / 100;
}

musicVolumeRange.addEventListener("change", changeVolume);

// Progress

function updateProgress() {
  musicProgress.value = (mainPlayer.currentTime / mainPlayer.duration) * 100;
}

mainPlayer.addEventListener("timeupdate", updateProgress);

musicProgress.addEventListener("change", () => {
  mainPlayer.currentTime = (musicProgress.value * mainPlayer.duration) / 100;
  if (mainPlayer.ended) {
    nextSong();
  }
  mainPlayer.play();
  musicPlayImg.src = playPause[1];
});

setInterval(function () {
  updateProgress();
}, 1000);

/////////////////////////////////////////////////////////////////////////

// Video Player

const videos = [
  "./video/1.mp4",
  "./video/2.mp4",
  "./video/3.mp4",
  "./video/4.mp4",
  "./video/5.mp4"
];

let currentVideoIndex = 0;
const videoPlayer = document.getElementById("headerVideoPlayer");
const source = videoPlayer.getElementsByTagName("source")[0];
const vprevButton = document.getElementById("videoPrev");
const vnextButton = document.getElementById("videoNext");

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

vprevButton.addEventListener("click", prevVideo);
vnextButton.addEventListener("click", nextVideo);

function checkVideoEnd() {
  if (videoPlayer.currentTime >= videoPlayer.duration - 1) {
    nextVideo();
  }
}

setInterval(checkVideoEnd, 500); // Check every second if the video has ended

changeVideo();

//Prewiew image

const img = document.getElementById("imagePreviewImg");
const closeBtn = document.getElementById("imagePreviewClose");
const prewWIndow = document.getElementById("imagePreview");
let scale = 1;
let isDragging = false;
let startX, startY, originX, originY;
let initialDistance = 0;
let initialScale = 1;

img.addEventListener("wheel", (e) => {
  e.preventDefault();
  scale += e.deltaY * -0.01;
  scale = Math.min(Math.max(0.5, scale), 3);
  img.style.transform = `scale(${scale})`;
});

img.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - img.offsetLeft;
  startY = e.pageY - img.offsetTop;
  originX = img.offsetLeft;
  originY = img.offsetTop;
  img.style.cursor = "grabbing";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  img.style.cursor = "grab";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    img.style.left = `${e.pageX - startX}px`;
    img.style.top = `${e.pageY - startY}px`;
  }
});

img.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    isDragging = true;
    startX = e.touches[0].pageX - img.offsetLeft;
    startY = e.touches[0].pageY - img.offsetTop;
    originX = img.offsetLeft;
    originY = img.offsetTop;
  } else if (e.touches.length === 2) {
    initialDistance = getDistance(e.touches[0], e.touches[1]);
    initialScale = scale;
  }
});

img.addEventListener("touchmove", (e) => {
  if (e.touches.length === 1 && isDragging) {
    e.preventDefault();
    img.style.left = `${e.touches[0].pageX - startX}px`;
    img.style.top = `${e.touches[0].pageY - startY}px`;
  } else if (e.touches.length === 2) {
    e.preventDefault();
    const currentDistance = getDistance(e.touches[0], e.touches[1]);
    scale = initialScale * (currentDistance / initialDistance);
    scale = Math.min(Math.max(0.5, scale), 3);
    img.style.transform = `scale(${scale})`;
  }
});

document.addEventListener("touchend", () => {
  isDragging = false;
});

function getDistance(touch1, touch2) {
  const dx = touch1.pageX - touch2.pageX;
  const dy = touch1.pageY - touch2.pageY;
  return Math.sqrt(dx * dx + dy * dy);
}

closeBtn.addEventListener("click", () => {
  prewWIndow.style.display = "none";
  img.style.left = 0;
  img.style.top = 0;
  img.style.transform = `scale(1)`;
  img.style.width = "100%";
});

// Images

const imgList = [
  "./image/1.jpg",
  "./image/2.jpg",
  "./image/3.jpg"
];

let currentImgIndex = 0;

const prgmImgs = document.getElementById("prgmImgs");

prgmImgs.src = imgList[currentImgIndex];

prgmImgs.addEventListener("click", () => {
  prewWIndow.style.display = "block";
  img.src = prgmImgs.src;
});

const imagesDots = document.getElementById("imagesDots");
let buttons = "";

for (let i = 0; i < imgList.length; i++) {
  buttons += "<button class='imageDot'" +" id=" + imgList[i]+ " name=" + i + "></button>";
}

imagesDots.innerHTML = buttons;

// Get all buttons with the class 'output-button'
const imageDot = document.querySelectorAll(".imageDot");

function changeDotSize(x){
    document.getElementById(x).style.scale = 1.5;
}

function retetButtons(){
    imageDot.forEach((imageDot) => {
        imageDot.style.scale = 1;
    });
}

function nextImg(){
    currentImgIndex = (currentImgIndex + 1) % imgList.length;
    prgmImgs.src = imgList[currentImgIndex];
    retetButtons();
    changeDotSize(imgList[currentImgIndex]);
}

function prevImg(){
    currentImgIndex = (currentImgIndex - 1 + imgList.length) % imgList.length;
    prgmImgs.src = imgList[currentImgIndex];
    retetButtons();
    changeDotSize(imgList[currentImgIndex]);
}

// Loop through each button and add a click event listener
imageDot.forEach((imageDot) => {
  imageDot.addEventListener("click", () => {
    retetButtons();
    prgmImgs.src = imageDot.id;
    changeDotSize(imageDot.id);
    currentImgIndex = imageDot.name;
  });
});

changeDotSize("./image/1.jpg");

setInterval(nextImg, 10000);

// Swipe functionality
let stX;

prgmImgs.addEventListener("touchstart", (e) => {
  stX = e.touches[0].clientX;
});

prgmImgs.addEventListener("touchend", (e) => {
  const enX = e.changedTouches[0].clientX;
  if (stX > enX + 50) {
    nextImg(); // Swipe left
  } else if (stX < enX - 50) {
    prevImg(); // Swipe right
  }
});