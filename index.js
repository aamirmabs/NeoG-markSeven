// setting up elements
var pirateGIF = document.getElementById("pirate-gif");
var inputBox = document.getElementById("translate-input-box");
var translateBtn = document.getElementById("translate-btn");
var resetBtn = document.getElementById("reset-btn");
var askResetBtn = document.getElementById("ask-reset-btn");
var resetMsg = document.getElementById("reset-msg");
var pirateSaysImg = document.getElementById("pirate-img");
var pirateSaysText = document.getElementById("pirate-says");
var output = document.getElementById("output");

// saving original values
var pirateGIFOG = pirateGIF.src;
var inputBoxOG = inputBox.value;
var pirateImgOG = pirateSaysImg.src;
console.log(pirateImgOG);
var pirateSaysOG = pirateSaysText.innerHTML;
var outputOG = output.innerHTML;

// setting up variables for tracking images and names
var pirateNameSet = [
  "Captain Bob ",
  "Captain Carl ",
  "Captain Dave ",
  "Captain Donny ",
  "Captain Jerry ",
  "Captain Jorge ",
  "Captain Kevin ",
  "Captain Lance ",
  "Captain Mark ",
  "Captain Paul ",
  "Captain Phil ",
  "Captain Steve ",
  "Captain Stuart ",
  "Captain Tom ",
  "Captain Tim ",
];
var pirateNameSetLength = pirateNameSet.length;
var pirateNameSetCount = 0;

var pirateGIFSet = [
  "https://media.giphy.com/media/9OZVbCmFSWPrnB3P8t/giphy.gif",
  "https://media.giphy.com/media/j58rgORGZjYGxBsFS8/giphy.gif",
  "https://media.giphy.com/media/hpWstKnxwfg3QHaBHe/giphy.gif",
  "https://media.giphy.com/media/h1zamufHlE00YnHC7t/giphy.gif",
  "https://media.giphy.com/media/ibqC2xeG4oN7RnG1ib/giphy.gif",
  "https://media.giphy.com/media/jUii5pJUNEIXqxghbV/giphy.gif",
  "https://media.giphy.com/media/L3KnfxSH66AmNdXG8S/giphy.gif",
  "https://media.giphy.com/media/lMg0qBGvh0Hu0AMLj4/giphy.gif",
  "https://media.giphy.com/media/h9i6KeMGniosU/giphy.gif",
  "https://media.giphy.com/media/YFGLhHE5WG4QCEr6zE/giphy.gif",
  "https://media.giphy.com/media/Lp4LTraj2QNeV1b6BL/giphy.gif",
  "https://media.giphy.com/media/SSmDlehhBmGvm/giphy.gif",
  "https://media.giphy.com/media/eJSD47AwilvqeE0aA3/giphy.gif",
  "https://media.giphy.com/media/LmrHCVQCIVr4qnRDbW/giphy.gif",
  "https://media.giphy.com/media/JQLtNJwlfnQ0S1frLd/giphy.gif",
];
var pirateGIFSetLength = pirateGIFSet.length;
var pirateGIFSetCount = 0;

var pirateSaysImgSet = [
  "/img/pirate0.png",
  "/img/pirate1.png",
  "/img/pirate2.png",
  "/img/pirate3.png",
  "/img/pirate4.png",
  "/img/pirate5.png",
  "/img/pirate6.png",
  "/img/pirate7.png",
  "/img/pirate8.png",
  "/img/pirate9.png",
];
var pirateSaysImgSetLength = pirateSaysImgSet.length;
var pirateSaysImgSetCount = 0;

// setting up functions
function getUserInput() {
  return encodeURI(inputBox.value);
}

function updateOutput(msg) {
  setNextPirateSaysImg();
  manageAskResetBtn();

  // updating pirate says message
  var newPirateSaysText =
    pirateNameSet[pirateNameSetCount] + "the Pirate says...";
  pirateNameSetCount++;
  if (pirateNameSetCount == pirateNameSetLength) {
    pirateNameSetCount = 0;
  }
  pirateSaysText.innerHTML = newPirateSaysText;

  // updating translated message
  var text = `"${msg}"`;
  output.innerText = text;
}

function manageAskResetBtn() {
  showAskResetBtn();
  setTimeout(function () {
    hideAskResetBtn();
  }, 5000);
}

function handleError(err) {
  console.log("Oops... there's an issue:");
  console.log(err);
}

// setting up helper functions
function setNextPirateSaysImg() {
  var origin = window.location.origin;
  var imgSrc = origin + pirateSaysImgSet[pirateSaysImgSetCount];
  pirateSaysImg.src = imgSrc;
  pirateSaysImgSetCount++;

  if (pirateSaysImgSetCount == pirateSaysImgSetLength) {
    pirateSaysImgSetCount = 0;
  }
}

function showResetSuccessMsg() {
  resetMsg.style.display = "block";
}

function hideResetSuccessMsg() {
  resetMsg.style.display = "none";
}

function showAskResetBtn() {
  askResetBtn.style.visibility = "visible";
}

function hideAskResetBtn() {
  askResetBtn.style.visibility = "hidden";
}

function changePirateGIF() {
  // changing the images
  pirateGIF.src = pirateGIFSet[pirateGIFSetCount];
  pirateGIFSetCount++;

  setNextPirateSaysImg();

  // check if counters need to be reset
  if (pirateGIFSetCount == pirateGIFSetLength) {
    pirateGIFSetCount = 0;
  }
}

function reset() {
  showResetSuccessMsg();

  inputBox.value = inputBoxOG;
  pirateSaysText.innerHTML = pirateSaysOG;
  output.innerHTML = outputOG;

  changePirateGIF();

  setTimeout(function () {
    hideResetSuccessMsg();
  }, 4000);
}

// setting up API string
// var url = "https://api.funtranslations.com/translate/pirate.json";
// Tanay's API for testing
var url = "https://lessonfourapi.tanaypratap.repl.co/translate/yoda.json";

var apiCallString = `${url}?text=${getUserInput()}`;

// setting up API fetch request
function fetchTranslation() {
  fetch(apiCallString)
    .then((response) => response.json())
    .then((jsonObj) => jsonObj.contents.translated)
    .then((translatedMsg) => updateOutput(translatedMsg))
    .catch((error) => handleError(error));
  // logic
  // use constructed api and fetch response
  // get JSON object from response
  // get translation string from JSON object
  // update the string in output region
}

// calling the API on click
translateBtn.addEventListener("click", fetchTranslation);

// wiring other event handlers
translateBtn.addEventListener("click", manageAskResetBtn);

resetBtn.addEventListener("click", reset);

askResetBtn.addEventListener("click", reset);
askResetBtn.addEventListener("click", changePirateGIF);
askResetBtn.addEventListener("click", hideAskResetBtn);
