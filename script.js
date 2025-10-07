const moods = {
relaxed: ["Freddoccino", "cats1", "idk", "cats2", "bun", "gilmore"],
awake: ["red-bull", "Dj", "week", "memes", "beethoven", "soundtrack2"],
inspired: ["red-bull", "soundtrack1", "vacation", "efi", "beethoven", "shadows"],
bday: ["beer", "Dj", "idk", "angela", "wet", "gossip"],
crazy: ["red-bull", "soundtrack1", "now", "angela", "wild", "soundtrack2"],
fighter: ["orange-juice", "live", "now", "memes", "bun", "shadows"]
};




const moodTitles = {
relaxed: "Χαλαρή LOO",
awake: "LOO σε αγρυπνία",
inspired: "Εμπνευσμένη LOO",
bday: "B-day LOO",
crazy: "LOO σε παροξυσμό",
fighter: "Εμπόλεμη ζώνη LOO"
};




// Use URLs for testing; replace with your local paths later
const moodImages = {
relaxed: "images/relaxed.png",
awake: "images/awake.png",
inspired: "images/inspired.png",
bday: "images/bday.png",
crazy: "images/crazy.png",
fighter: "images/fighter.png"
};




// --- Elements ---
const form = document.getElementById("loo-quiz");
const title = document.getElementById("title");
const description = document.getElementById("description");
const resultContainer = document.getElementById("result-container");
const resultImage = document.getElementById("result-image");
const resultText = document.getElementById("result-text");
const clickSound = document.getElementById("click-sound");
const submitAgain = document.getElementById("submit-again");
// --- Audio ---
const meowSound = new Audio("meow.mp3");  // play on page load
const resultSounds = {
  relaxed: new Audio("relaxed.mp3"),
  awake: new Audio("awake.mp3"),
  inspired: new Audio("inspired.mp3"),
  bday: new Audio("bday.mp3"),
  crazy: new Audio("crazy.mp3"),
  fighter: new Audio("fighter.mp3")
};

// --- Submit handler ---
form.addEventListener("submit", (e) => {
e.preventDefault();
const submitAgain = document.getElementById("submit-again");


// Collect answers
const answers = [
  document.getElementById("drink").value,
  document.getElementById("job").value,
  document.getElementById("sick").value,
  document.getElementById("post").value,
  document.getElementById("hair").value,
  document.getElementById("series").value
];

// Determine best mood
let bestMood = "relaxed";
let highestScore = -1;
for (const mood in moods) {
  const score = answers.filter(a => moods[mood].includes(a)).length;
  if (score > highestScore) {
    highestScore = score;
    bestMood = mood;
  }
}

// Hide quiz
form.style.display = "none";
title.style.display = "none";
description.style.display = "none";

// Set result content
resultImage.src = moodImages[bestMood];
resultText.textContent = moodTitles[bestMood];
const congratsText = document.getElementById("congrats-text");
congratsText.textContent = "Congrats! Είσαι η...";
congratsText.classList.add("active");
if (resultSounds[bestMood]) {
  resultSounds[bestMood].currentTime = 0;
  resultSounds[bestMood].play().catch(err => console.log(err));
}

// Show result with fade-in
resultContainer.style.display = "flex"; // ensure visible
void resultContainer.offsetWidth;       // force reflow
resultContainer.classList.add("active");
});
submitAgain.addEventListener("click", () => {
    if (meowSound) {
    try {
      meowSound.currentTime = 0;  // restart the sound
      meowSound.play();
    } catch (err) {
      console.log(err);
    }
  }
  // Reset visibility
  form.style.display = "block";
  title.style.display = "block";
  description.style.display = "block";
  resultContainer.classList.remove("active");
  congratsText.classList.remove("active");
  // Clear result content
  resultImage.src = "";
  resultText.textContent = "";
});

