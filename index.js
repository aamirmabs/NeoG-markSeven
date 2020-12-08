// setting up elements
var pirateGIF = document.getElementById("pirate-gif");
var inputBox = document.getElementById("translate-input-box");
var translateBtn = document.getElementById("translate-btn");
var resetBtn = document.getElementById("reset-btn");
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
  "Bob ",
  "Carl ",
  "Dave ",
  "Donny ",
  "Jerry ",
  "Jorge ",
  "Kevin ",
  "Lance ",
  "Mark ",
  "Paul ",
  "Phil ",
  "Steve ",
  "Stuart ",
  "Tom ",
  "Tim ",
];
var pirateNameSetLength = pirateNameSet.length;
var pirateNameSetCount = 0;

var pirateGIFSet = [
  "https://media.giphy.com/media/YAlhwn67KT76E/giphy.gif",
  "https://media.giphy.com/media/spHCUbRqG4cjS/giphy.gif",
  "https://media.giphy.com/media/TXJiSN8vCERuE/giphy.gif",
  "https://media.giphy.com/media/6onMzNPjtFeCI/giphy.gif",
  "https://media.giphy.com/media/J4mwzGaDrRw3u/giphy.gif",
  "https://media.giphy.com/media/uYSzR3wKSe5y/giphy.gif",
  "https://media.giphy.com/media/XJ6A5OISSyWze/giphy.gif",
  "https://media.giphy.com/media/oTMjNu3HjDvWw/giphy.gif",
  "https://media.giphy.com/media/mQG72ZjcBFlwA/giphy.gif",
  "https://media.giphy.com/media/1m7gwmBHRRlK/giphy.gif",
  "https://media.giphy.com/media/OQeIIv41G9JU4/giphy.gif",
  "https://media.giphy.com/media/xZx7ht7MH8Wqs/giphy.gif",
  "https://media.giphy.com/media/aeM2gVUiP4WZ2/giphy.gif",
  "https://media.giphy.com/media/l3HBbltOYjoNq/giphy.gif",
  "https://media.giphy.com/media/l3HBbltOYjoNq/giphy.gif",
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

function reset() {
  showResetSuccessMsg();

  inputBox.value = inputBoxOG;
  pirateSaysText.innerHTML = pirateSaysOG;
  output.innerHTML = outputOG;

  // changing the images
  pirateGIF.src = pirateGIFSet[pirateGIFSetCount];
  pirateGIFSetCount++;

  setNextPirateSaysImg();

  // check if counters need to be reset
  if (pirateGIFSetCount == pirateGIFSetLength) {
    pirateGIFSetCount = 0;
  }

  setTimeout(function () {
    hideResetSuccessMsg();
  }, 4000);
}

// setting up API string
var url = "https://api.funtranslations.com/translate/pirate.json";
// Tanay's API for testing
// var url = "https://lessonfourapi.tanaypratap.repl.co/translate/yoda.json";

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
resetBtn.addEventListener("click", reset);
