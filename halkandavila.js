
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
  "./halkandavila/images/1.JPG",
  "./halkandavila/images/2.JPG",
  "./halkandavila/images/3.JPG",
  "./halkandavila/images/4.JPG",
  "./halkandavila/images/5.JPG",
  "./halkandavila/images/6.JPG",
  "./halkandavila/images/7.JPG",
  "./halkandavila/images/8.JPG",
  "./halkandavila/images/9.JPG"
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