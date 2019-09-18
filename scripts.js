/**
 *
 * Fading image generator by Bryan Snyder
 * scripts file
 * no License needed at all :)
 * credit to Iheanyi Ekechukwu for the lesson
 *
 */

 // variables
const canvasNode = document.getElementById("canvas");

const context = canvasNode.getContext("2d");

let firstImageInput = document.getElementById("first-image");

let secondImageInput = document.getElementById("second-image");

const switchButton = document.getElementById("switch-button");

const downloadButton = document.getElementById("download-button");

let firstImage = new Image();
let secondImage = new Image();


// functions
function updateCanvas() {
  // Clear the canvas and re-draw our elements.
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#FFFFFF";

  if (!!firstImage.src) {
    drawFirstImage();
  }

  if (!!secondImage.src) {
    drawSecondImage();
  }
}

function drawFirstImage() {
  // Draw First iMage, regular opacity
  context.save();
  context.drawImage(firstImage, 0, 0, 295, 295);

  // Draw Top Right Image, 25% opacity.
  context.globalAlpha = 0.75;
  context.drawImage(firstImage, 305, 0, 295, 295);
  // Draw Bottom Right Image, 50% opacity.
  context.globalAlpha = 0.5;
  context.drawImage(firstImage, 0, 305, 295, 295);
  context.restore();
}

function drawSecondImage() {
  context.save();
  // Bottom Right Image, 1 opacity.
  context.drawImage(secondImage, 305, 305, 295, 295);
  // Top Right Image, 0.50 opacity;
  context.globalAlpha = 0.25;
  context.drawImage(secondImage, 305, 0, 295, 295);
  // Bottom Left Image, 0.5
  context.globalAlpha = 0.5;
  context.drawImage(secondImage, 0, 305, 295, 295);
  context.restore();
}

function handleImageChange(imageObj, evt) {
  const { files } = evt.target;
  const firstFile = files[0];

  const reader = new FileReader();

  reader.onload = (img => {
    // When a file is read, we want to update the source of the image object.
    return e => {
      const { result: imageFile } = e.target;
      // Set the image object's source to this
      imageObj.src = imageFile;
    };
  })(firstFile);
  reader.readAsDataURL(firstFile);
}


function switchImages() {
  const firstImageCopy = firstImage.cloneNode();
  const secondImageCopy = secondImage.cloneNode();

  const firstInputCopy = firstImageInput.cloneNode();
  const secondInputCopy = secondImageInput.cloneNode();
  firstImage = secondImageCopy;
  secondImage = firstImageCopy;
  updateCanvas();
  initialize();
}


function downloadCanvas(evt) {
  downloadButton.href = canvasNode.toDataURL();
  downloadButton.download = "myNewMeme.png";
}


function initialize() {
  firstImageInput.addEventListener(
    "change",
    handleImageChange.bind(this, firstImage)
  );

  secondImageInput.addEventListener(
    "change",
    handleImageChange.bind(this, secondImage)
  );
  switchButton.addEventListener("click", switchImages);
  firstImage.onload = updateCanvas;
  secondImage.onload = updateCanvas;
}

function loadDefaults() {
  firstImage.src ="";
  secondImage.src ="";
}

initialize();
loadDefaults();
