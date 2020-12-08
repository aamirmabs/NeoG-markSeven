// setting up elements
var minionGIF = document.getElementById("minion-gif");
var inputBox = document.getElementById("translate-input-box");
var translateBtn = document.getElementById("translate-btn");
var resetBtn = document.getElementById("reset-btn");
var resetMsg = document.getElementById("reset-msg");
var minionSaysImg = document.getElementById("minion-img");
var minionSaysText = document.getElementById("minion-says");
var output = document.getElementById("output");

// saving original values
var minionGIFOG = minionGIF.src;
var inputBoxOG = inputBox.value;
var minionImgOG = minionSaysImg.src;
console.log(minionImgOG);
var minionSaysOG = minionSaysText.innerHTML;
var outputOG = output.innerHTML;

// setting up variables for tracking images and names
var minionNameSet = [
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
var minionNameSetLength = minionNameSet.length;
var minionNameSetCount = 0;

var minionGIFSet = [
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
var minionGIFSetLength = minionGIFSet.length;
var minionGIFSetCount = 0;

var minionSaysImgSet = [
  "/img/minion0.png",
  "/img/minion1.png",
  "/img/minion2.png",
  "/img/minion3.png",
  "/img/minion4.png",
  "/img/minion5.png",
  "/img/minion6.png",
  "/img/minion7.png",
  "/img/minion8.png",
  "/img/minion9.png",
];
var minionSaysImgSetLength = minionSaysImgSet.length;
var minionSaysImgSetCount = 0;

// setting up functions
function getUserInput() {
  return encodeURI(inputBox.value);
}

function updateOutput(msg) {
  setNextMinionSaysImg();

  // updating minion says message
  var newMinionSaysText =
    minionNameSet[minionNameSetCount] + "the Minion says...";
  minionNameSetCount++;
  if (minionNameSetCount == minionNameSetLength) {
    minionNameSetCount = 0;
  }
  minionSaysText.innerHTML = newMinionSaysText;

  // updating translated message
  var text = `"${msg}"`;
  output.innerText = text;
}

function handleError(err) {
  console.log("Oops... there's an issue:");
  console.log(err);
}

// setting up helper functions
function setNextMinionSaysImg() {
  var origin = window.location.origin;
  var imgSrc = origin + minionSaysImgSet[minionSaysImgSetCount];
  minionSaysImg.src = imgSrc;
  minionSaysImgSetCount++;

  if (minionSaysImgSetCount == minionSaysImgSetLength) {
    minionSaysImgSetCount = 0;
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
  minionSaysText.innerHTML = minionSaysOG;
  output.innerHTML = outputOG;

  // changing the images
  minionGIF.src = minionGIFSet[minionGIFSetCount];
  minionGIFSetCount++;

  setNextMinionSaysImg();

  // check if counters need to be reset
  if (minionGIFSetCount == minionGIFSetLength) {
    minionGIFSetCount = 0;
  }

  setTimeout(function () {
    hideResetSuccessMsg();
  }, 4000);
}

// setting up API string
var url = "https://api.funtranslations.com/translate/minion.json";
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
