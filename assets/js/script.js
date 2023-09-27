let quizData = []; // Array to store quiz data
// Declare currentQuiz at a higher scope
let currentQuiz = null;
// Define the winnersArray variable
let winnersArray = [];
// Initialize qty attempts
let attempt = -1;
// Initialize a timer variable
let timer = 0;
let timerInterval;
// Reference to the timer spinner element
const timerSpinner = document.querySelector(".timer-spinner");
// Flag to track whether the timer spinner is visible
let isTimerSpinnerVisible = true;
// updateTimerDisplay();

// Add an event listener to the "Start" and "Skip" button
var startQuizButton = document.getElementById("start-quiz-button");
startQuizButton.addEventListener("click", startQuiz);
var nextQuizButton = document.getElementById("next-button");
nextQuizButton.addEventListener("click", takeAturn);
// Add an event listener for the "Stop Quiz" button
const stopQuizButton = document.getElementById("stop-button");
stopQuizButton.addEventListener("click", stopQuiz);

// Function to start the quiz
function startQuiz() {
  // Start the timer when the user proceeds to the next question
  startTimer();

  // Increment attempts when starting a new quiz
  attempt++;

  // Hide the start page "statistic-window"
  let statisticWindow = document.getElementById("statistic-window");
  statisticWindow.style.display = "none";

  // Show quiz area
  let quizField = document.getElementById("quiz-field");
  quizField.style.display = "flex";

  // Set right and wrong counts to 0
  const rightCountElement = document.getElementById("right-count");
  const wrongCountElement = document.getElementById("wrong-count");

  rightCountElement.textContent = "0";
  wrongCountElement.textContent = "0";

  // Display new question
  const randomQuestion = getRandomQuestion(englishWords);
  currentQuiz = displayQuestion(randomQuestion);
  currentQuiz.attempt = attempt;
  quizData.push(currentQuiz);
}

// Function to finish the quiz
function stopQuiz() {
  // Stop the timer when the user stops the quiz
  stopTimer();

  // Calculate the total time spent for the current attempt
  const totalTimeSpent = quizData.reduce((totalTime, quiz) => {
    if (quiz.attempt === attempt) {
      totalTime += quiz.spentTime;
    }
    return totalTime;
  }, 0);

  // Show the page "statistic-window"
  let statisticWindow = document.getElementById("statistic-window");
  statisticWindow.style.display = "block";

  // Hide quiz area
  let quizField = document.getElementById("quiz-field");
  quizField.style.display = "none";

  // Access the winners' table element's tbody
  const winnersTable = document.querySelector(".winners-table tbody");

  // Calculate the total number of correct answers for the current attempt
  const totalCorrectAnswers = quizData.reduce((total, quiz) => {
    const correctAnswers = quiz.answers.filter(
      (answer) =>
        answer.isCorrect && answer.isUserChoice && quiz.attempt === attempt
    ).length;
    return total + correctAnswers;
  }, 0);

  // Add the total data to the array
  if (totalCorrectAnswers > 0) {
    winnersArray.push({
        place: 0, // Initialize with 0, will be updated later
        attempt: attempt, // Calculate attempts value
        scores: totalCorrectAnswers,
        timeSpent: totalTimeSpent,
      });
  }

  // Get the data from the winners table (excluding the first row)
  const winnersTableData = Array.from(winnersTable.rows)
    .slice(1)
    .map((row) => {
      const [place, attempt, scores, timeSpent] = row.cells;
      return {
        place: Number(place.textContent),
        attempt: attempt.textContent.trim(), // Use trim to remove leading/trailing whitespace
        scores: Number(scores.textContent),
        timeSpent: Number(timeSpent.textContent), // Corrected property name
      };
    });

  // Merge the data from the winners table into the winnersArray
  winnersTableData.forEach((data) => {
    const existingWinner = winnersArray.find(
      (winner) => winner.attempt === data.attempt
    );
    if (existingWinner) {
      // Update the place if a matching entry exists
      existingWinner.place = data.place;
    }
  });

  // Sort the array by scores in descending order and, if scores are equal, by time spent in ascending order
  winnersArray.sort((a, b) => {
    if (a.scores !== b.scores) {
      return b.scores - a.scores;
    } else {
      return a.timeSpent - b.timeSpent;
    }
  });

  // Update the 'place' values based on the sorted order
  winnersArray.forEach((winner, index) => {
    winner.place = index + 1;
  });

  // Populate the winners table HTML based on the sorted array
  winnersTable.innerHTML = "";
  winnersArray.forEach((winner, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${winner.place}</td>
            <td>${getAttemptString(winner.attempt)}</td>
            <td>${winner.scores}</td>
            <td>${winner.timeSpent}</td>
        `;
    // Add the .highlight class to the first three rows
    if (index < 3) {
        row.classList.add('highlight');
    }
    winnersTable.appendChild(row);
  });

  // Restore default background for quizsquare
  const quizsquareFieldElement = document.querySelector(".quizsquare");
  quizsquareFieldElement.style.background = "rgba(39, 34, 34, 0.7)";
}

function getAttemptString(index) {
  const attemptStrings = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
    "eleventh",
    "twelfth",
    "thirteenth",
    "fourteenth",
    "fifteenth",
    "sixteenth",
    "eighteenth",
    "nineteenth",
    "twentieth",
    "twenty-first",
  ]; // Add more as needed
  return attemptStrings[index] || "first";
}

function updateAttemptsInTable(winnersTable, attempts) {
  winnersTable.querySelectorAll("tr").forEach((row, index) => {
    const attemptsCell = row.querySelector("td:nth-child(2)");
    if (attemptsCell) {
      attemptsCell.textContent = getAttemptString(index + 1);
    }
  });
}

// Function to next turn in the quiz
function takeAturn() {
  addSpentTimeToLastAttempt();
  
  timer = 31; // restore timert value to 30 sec


// Check if any answer option is selected
const selectedOption = document.querySelector('input[name="answer-option"]:checked');

  if (!selectedOption) {
      // If no answer option is selected, consider it as an incorrect answer
      const wrongCountElement = document.getElementById('wrong-count');
      const wrongCount = parseInt(wrongCountElement.textContent) + 1;
      wrongCountElement.textContent = wrongCount;
  }

  // check last answer
  checkLastAnswer();
  // Display new question
  const randomQuestion = getRandomQuestion(englishWords);
  currentQuiz = displayQuestion(randomQuestion);
  currentQuiz.attempt = attempt;
  currentQuiz.spentTime = 0;

  quizData.push(currentQuiz);
}

// add spentTime by question
function addSpentTimeToLastAttempt() {
  quizData[quizData.length - 1].spentTime = 30 - timer;
}

// check last answer
function checkLastAnswer() {
  const lastQuiz = quizData[quizData.length - 1]; // Get the last quiz data

  if (lastQuiz) {
    const answers = lastQuiz.answers;
    const lastUserAnswer = answers.find((answer) => answer.isUserChoice);

    if (lastUserAnswer) {
      if (lastUserAnswer.isCorrect) {
        // User's answer is correct
        const rightCountElement = document.getElementById("right-count");
        const rightCount = parseInt(rightCountElement.textContent) + 1;
        rightCountElement.textContent = rightCount;
      } else {
        // User's answer is incorrect
        const wrongCountElement = document.getElementById("wrong-count");
        const wrongCount = parseInt(wrongCountElement.textContent) + 1;
        wrongCountElement.textContent = wrongCount;
      }
    }
  }
}

// Function to get a random question
function getRandomQuestion(englishWords) {
  // Get all word keys
  const wordKeys = Object.keys(englishWords);

  // Randomly select a word key
  const randomWordKey = wordKeys[Math.floor(Math.random() * wordKeys.length)];

  // Get the word object for the selected key
  const wordObject = englishWords[randomWordKey];

  // Get a random word-type object from the "word-types" array
  const randomWordType =
    wordObject["word-types"][
      Math.floor(Math.random() * wordObject["word-types"].length)
    ];

  // Get a random definition object from the "definitions" array
  const randomDefinition =
    randomWordType.definitions[
      Math.floor(Math.random() * randomWordType.definitions.length)
    ];

  // Construct the question object
  const question = {
    word: randomWordKey,
    wordType: randomWordType["word-type"],
    definition: randomDefinition.definition,
    translations: randomDefinition.translate,
    imageUrl: wordObject.image_url,
    soundUrl: wordObject.sound_url,
    cefrLevel: wordObject.cefr.level,
    cefrTitle: wordObject.cefr.title,
  };

  return question;
}

// Function to display the question
function displayQuestion(question) {
  // Get DOM elements
  const quizTaskElement = document.querySelector(".quiz-task");
  const wordTypeElement = document.querySelector(".word-type");
  const wordDefinitionElement = document.querySelector(".word-definition");
  // Reference to the timer spinner element
  const timerSpinner = document.querySelector(".timer-spinner");
  // Set timer background in default color
  timerSpinner.style.backgroundColor = 'rgba(51, 51, 51, 0.7)';
  timerSpinner.style.color = 'white';

  // Update question elements
  quizTaskElement.textContent = "Guess the word by definition:";
  wordTypeElement.textContent = question.wordType;
  wordDefinitionElement.textContent = question.definition;

  // Clear any previous answer options
  const answersListElement = document.querySelector(".answers-list");
  answersListElement.innerHTML = "";

  // Create an array to hold answer options (translations)
  const answerOptions = [];

  // Add the correct answer to the array
  answerOptions.push({
    answer: question.word,
    isCorrect: true,
    isUserChoice: false,
  });

  // Add two incorrect answers to the array
  while (answerOptions.length < 3) {
    // Get an array of keys (words) from englishWords
    const wordKeys = Object.keys(englishWords);

    // Select a random key from the array
    const randomKey = wordKeys[Math.floor(Math.random() * wordKeys.length)];

    // Make sure it's not the same as the correct answer
    if (randomKey !== question.word) {
      answerOptions.push({
        answer: randomKey,
        isCorrect: false,
        isUserChoice: false,
      });
    }
  }

  // Randomly shuffle the answer options
  const shuffledOptions = shuffleArray(answerOptions);

  // Add answer options to the DOM
  shuffledOptions.forEach((option) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const audioElement = document.createElement("audio");
    const audioSourceElement = document.createElement("source");
    const audioButtonPlayElement = document.createElement("button");

    input.type = "radio";
    input.className = "answer-option";
    input.name = "audio-option";
    input.value = option.answer;

    label.textContent = option.answer;

    audioElement.className = "audio-container";
    audioElement.controls = false;
    audioSourceElement.src = ""; // You can set the source as needed
    
    audioElement.appendChild(audioSourceElement);
  
    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(audioElement);

    li.appendChild(audioButtonPlayElement);

    answersListElement.appendChild(li);

    // Add an event listener to track user's choice
    input.addEventListener("change", () => {
        option.isUserChoice = input.checked;
    
        // Stop any previously playing audio
        const allAudioElements = document.querySelectorAll(".word-audio");
        allAudioElements.forEach((audioElement) => {
            audioElement.pause();
        });
    
        // Find the selected word in englishWords
        const selectedWord = englishWords[option.answer];
    
        if (selectedWord) {
        // Play audio for the selected word
        audioSourceElement.src = selectedWord.sound_url;

        audioButtonPlayElement.onclick = function() { // add button play for pronunciation of the word 
          document.getElementById(option.answer).play();
        };
        // audioButtonPlayElement.textContent = "Play";
        audioButtonPlayElement.id = option.answer;
        audioButtonPlayElement.className = 'play-sound-button';

        audioElement.id = option.answer;
        audioElement.classList.add("audio-container");
        // audioElement.style.width = "0px";
        // audioElement.style.display = "none";
        audioElement.load(); // Load the audio
        audioElement.play(); // Play the audio
        }
    });

    // const quizsquareFieldElement = document.querySelector(".quizsquare");
    // quizsquareFieldElement.style.background = `rgba(0, 188, 212, 0.7) url(${question.imageUrl}) no-repeat center center/contain`;
    // quizsquareFieldElement.style.opacity = 0.9;
    const imageFieldElement = document.querySelector(".word-image");
    imageFieldElement.src = question.imageUrl;
    // imageFieldElement.style.opacity = 0.3;

    // Add an event listener to track user's choice
    input.addEventListener("change", () => {
      option.isUserChoice = input.checked;
    });

    // Add event listener for audio playback when a radio tone is selected
    const radioButtons = document.querySelectorAll('.answer-option');
  });

  // Add the currentQuiz object to the quizData array
  currentQuiz = {
    question: question.definition,
    answers: answerOptions,
    scores: 0, // Initialize scores for this quiz
    timeSpent: 0,
  };

  return currentQuiz;
}

// Function to shuffle an array randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to update the timer display
function updateTimerDisplay() {
  const timerDisplay = document.querySelector(".timer-spinner");
  timerDisplay.textContent = `${timer}`;
}

// Function to start the timer
function startTimer() {
  timer = 30; // Set the initial time to 30 seconds
  updateTimerDisplay(); // Update the timer display with the initial time

  timerInterval = setInterval(() => {
    --timer; // Decrement the timer
    updateTimerDisplay(); // Update the timer display

    // Check if the timer has reached 0
    if (timer < 0) {
      // Time's up, do something (e.g., handle it as you need)
      stopTimer(); // Stop the timer when it reaches 0
      stopQuiz(); // Stop quiz
    } else if (timer <= 10) {
      // If the timer is 10 seconds or less, change the background color to red and make it flash
      timerSpinner.style.backgroundColor = isTimerSpinnerVisible
        ? "red"
        : "white";
      timerSpinner.style.color = isTimerSpinnerVisible ? "white" : "red";

      // Toggle the flag to control visibility
      isTimerSpinnerVisible = !isTimerSpinnerVisible;
    }
  }, 1000);
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}
