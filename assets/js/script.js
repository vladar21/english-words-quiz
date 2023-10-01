let quizData = []; // Array to store quiz data
let englishWords = {};
// flag, that true if quiz start, and false - is stop or don't start yet
let is_quiz_start = false;
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

// Find sectionы you want to hide or show
let showStartWindow = document.getElementById("english-words-quiz");
let statisticWindow = document.getElementById("statistic-window");
let quizField = document.getElementById("quiz-field");
const rulesSection = document.getElementById("rules");
const settingsSection = document.getElementById("settings");

// Add an event listener to the "Start"
var startQuizButton = document.getElementById("start-quiz-button");
startQuizButton.addEventListener("click", startQuiz);

// Add an event listener to the back to start window
showStartWindow.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the link from navigating

  if (!is_quiz_start){
    // Hide the current sections and show the "statistic" section
    quizField.style.display = "none";
    statisticWindow.style.display = "block";
    rulesSection.style.display = "none";
    settingsSection.style.display = "none";
  }

  // Change background rules-link
  rulesLink.style.backgroundColor = '';
  settingsLink.style.backgroundColor = '';
});

// Find the "Rules" link by its ID
const rulesLink = document.getElementById("rules-link");
// Add a click event listener to the "Rules" link
rulesLink.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the link from navigating

  // Hide the current sections and show the "rules" section
  quizField.style.display = "none";
  statisticWindow.style.display = "none";
  rulesSection.style.display = "block";
  settingsSection.style.display = "none";

  // Change background rules-link
  rulesLink.style.backgroundColor = 'rgba(128, 124, 124, 0.7)';
  settingsLink.style.backgroundColor = '';
});

// Find the "Settings" link by its ID
const settingsLink = document.getElementById("settings-link");
// Add a click event listener to the "Settings" link
settingsLink.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the link from navigating

  // Hide the current sections and show the "rules" section
  quizField.style.display = "none";
  statisticWindow.style.display = "none";
  rulesSection.style.display = "none";
  settingsSection.style.display = "block";

  // Change background rules-link
  settingsLink.style.backgroundColor = 'rgba(128, 124, 124, 0.7)';
  const rulesLink = document.getElementById("rules-link");
  rulesLink.style.backgroundColor = '';

  // Add handler for reset button
  const resetButton = document.getElementById("resetSettingsDefault");
  resetButton.addEventListener("click", function () {
    initSettings();
  });

});

// init settings
initSettings();

// // Set the initial value for the word count slider
const wordCountSlider = document.getElementById("word-count-slider");

// add listener for change value of word count slider
wordCountSlider.addEventListener("change", applyChangeSettings);

// Set event listeners for CEFR checkboxes and word type checkboxes
const cefrCheckboxes = document.querySelectorAll('input[name="cefr-level"]');
cefrCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", applyChangeSettings);
});

const wordsTypesCheckboxes = document.querySelectorAll('input[name="words-types"]');
wordsTypesCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", applyChangeSettings);
});


// Function to start the quiz
function startQuiz() {

  // set quiz settings
  applyChangeSettings();

  // start quiz flag to true
  is_quiz_start = true;

  // Hidden rules and settings links, and start quiz button
  let rulesStartSettingsElement = document.getElementsByClassName('rules-start-settings')[0];
  rulesStartSettingsElement.style.display = 'none';
  // Start the timer when the user proceeds to the next question
  startTimer();

  // Increment attempts when starting a new quiz
  attempt++;

  // Hide the start page "statistic-window"
  statisticWindow.style.display = "none";
  rulesSection.style.display = "none";
  settingsSection.style.display = "none";

  // Show quiz area
  let quizField = document.getElementById("quiz-field");
  quizField.style.display = "flex";

  // Add an event listener to the "Next" button
  var nextQuizButton = document.getElementById("next-button");
  nextQuizButton.addEventListener("click", takeAturn);
  // Add an event listener for the "Stop" quiz button
  const stopQuizButton = document.getElementById("stop-button");
  stopQuizButton.addEventListener("click", stopQuiz);

  // Display new question
  const randomQuestion = getRandomQuestion(englishWords);
  currentQuiz = displayQuestion(randomQuestion);
  currentQuiz.attempt = attempt;
  quizData.push(currentQuiz);

  // Set right and wrong counts to 0
  const rightCountElement = document.getElementById("right-count");
  const wrongCountElement = document.getElementById("wrong-count");

  rightCountElement.textContent = "0";
  wrongCountElement.textContent = "0";
}

// Function to finish the quiz
function stopQuiz() {
  // stop quiz flag to false
  is_quiz_start = false;

  // Show rules and settings links, and start quiz button
  let rulesStartSettingsElement = document.getElementsByClassName('rules-start-settings')[0];
  rulesStartSettingsElement.style.display = 'flex';

  // reset rules-lin background to default
  rulesLink.style.backgroundColor = '';
  settingsLink.style.backgroundColor = '';

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
  statisticWindow.style.display = "block";

  // Hide quiz area
  quizField.style.display = "none";

  // Access the winners' table element's tbody
  const winnersTable = document.querySelector("#winners-table tbody");

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

    // add audio url for the current word
    let currentWord = englishWords[option.answer];
    audioSourceElement.src = currentWord.sound_url;
    audioButtonPlayElement.id = option.answer;
    audioButtonPlayElement.className = 'play-sound-button';
    audioButtonPlayElement.onclick = function() { // add button play for pronunciation of the word 
      document.getElementById(option.answer).play();
    };
    audioElement.id = option.answer;
    audioElement.classList.add("audio-container");

    input.type = "radio";
    input.className = "answer-option";
    input.name = "answer-option";
    input.value = option.answer;

    label.textContent = option.answer;

    audioElement.className = "audio-container";
    audioElement.controls = false;
    
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
          audioButtonPlayElement.onclick = function() { // add button play for pronunciation of the word 
            document.getElementById(option.answer).play();
          };
          audioElement.load(); // Load the audio
          audioElement.play(); // Play the audio
        }
    });

    const imgWordeElement = document.querySelector(".img-word-image");
    imgWordeElement.src = question.imageUrl;
    // divImageElement.style.background = `yellow url(${question.imageUrl}) no-repeat center center/cover`;

    // Add an event listener to track user's choice
    input.addEventListener("change", () => {
      option.isUserChoice = input.checked;
    });

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

// Function to shuffle a copy of an array randomly
function shuffleArray(array) {
    const shuffledArray = [...array]; // Создаем копию исходного массива
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

// work with settings

// parese settings from html
function parseSettingsFromTable() {
  const settings = {
    cefrLevels: [],
    wordTypes: [],
    wordCount: 3, // Default value for word count
  };

  const table = document.getElementById("settings-table");
  const checkboxes = table.querySelectorAll('input[name="cefr-level"]:checked, input[name="words-types"]:checked');
  const wordCountSlider = document.getElementById("word-count-slider");

  checkboxes.forEach((checkbox) => {
    if (checkbox.getAttribute("name") === "cefr-level") {
      settings.cefrLevels.push(checkbox.value);
    } else if (checkbox.getAttribute("name") === "words-types") {
      settings.wordTypes.push(checkbox.value);
    }
  });

  settings.wordCount = parseInt(wordCountSlider.value);

  return settings;
}

// Function to apply settings, including the default word count
function applyChangeSettings() {
  // Parse the selected settings
  const selectedSettings = parseSettingsFromTable();

  // Filter words based on selected settings
  const filteredWords = filterWordsBySettings(englishWords, selectedSettings);
  englishWords = filteredWords;
  
  // Update the word display or perform any other actions as needed
  updateWordDisplay(filteredWords);
}

function filterWordsBySettings(englishWords, settings) {

  // Копируем исходные слова в новый объект, чтобы не модифицировать исходные данные
  const filteredWords = { ...englishWords };

  // Удаляем определения и слова без определений в соответствии с настройками word-types
  for (const wordKey in filteredWords) {
    if (filteredWords.hasOwnProperty(wordKey)) {
      const word = filteredWords[wordKey];

      word["word-types"] = word["word-types"].filter((type) => {
        const shouldIncludeType = settings.wordTypes.includes(type["word-type"]);
        if (!shouldIncludeType) {
          // Убираем определение, если оно не соответствует настройкам
          return false;
        }
        return true;
      });

      if (word["word-types"].length === 0) {
        // Если у слова больше нет определений, убираем его из filteredWords
        delete filteredWords[wordKey];
      }
    }
  }

    englishWords = Object.keys(filteredWords).reduce((result, wordKey) => {
      const word = filteredWords[wordKey];
      const cefrMatch = settings.cefrLevels.includes(word.cefr.level);
      
      // Фильтрация по типам слов
    //   const filteredWordTypes = word["word-types"].filter((type) =>
    //     settings.wordTypes.includes(type["word-type"])
    //   );
  
      // Если Word Types настроен так, чтобы удалять слова без определений,
      // то удаляем слова без определений
    //   if (settings.wordTypes.includes("DeleteWordsWithoutDefinitions")) {
    //     word.definitions = word.definitions.filter((definition) =>
    //       filteredWordTypes.some((type) => type["word-type"] === definition["word-type"])
    //     );
    //   }
  
      // Если найдено совпадение по CEFR и по типам слов, добавляем слово в результат
    //   if (cefrMatch && filteredWordTypes.length > 0) {
      if (cefrMatch > 0) {
        result[wordKey] = word;
      }
      
      return result;
    }, {});
  
    return englishWords;
  }
  

// init settings
function initSettings() {
  // Iterate through all CEFR levels and words
  const cefrCheckboxes = document.querySelectorAll('input[name="cefr-level"]');
  cefrCheckboxes.forEach((checkbox) => {
    const cefrLevel = checkbox.value;
    const cefrCountSpan = document.getElementById(`cefr-level-count-${cefrLevel}`);
    englishWords = JSON.parse(JSON.stringify(englishWordsInit));
    const words = Object.values(englishWords);

    // Filter words by CEFR level
    const filteredWords = words.filter((word) => word.cefr.level === cefrLevel);

    // Update the count based on the filtered words
    cefrCountSpan.textContent = filteredWords.length;

    // Check if the CEFR level exists in the englishWordsInit object
    if (filteredWords.length === 0) {
      checkbox.checked = false;
      checkbox.disabled = true;
    } else {
      checkbox.disabled = false;
      checkbox.checked = true;
    }
  });

  // Iterate through all word types and variations
  const wordTypeCheckboxes = document.querySelectorAll('input[name="words-types"]');
  wordTypeCheckboxes.forEach((checkbox) => {
    const wordType = checkbox.value;
    const wordTypeCountSpan = document.getElementById(`words-types-count-${wordType}`);
    
    const words = Object.values(englishWords);

    // Filter words by word type and variations
    const filteredWords = words.filter((word) =>
      word["word-types"].some((type) => type["word-type"] === wordType)
    );

    // Update the count based on the filtered words
    wordTypeCountSpan.textContent = filteredWords.length;

    // Check if the word type exists in the englishWordsInit object
    if (filteredWords.length === 0) {
      checkbox.checked = false;
      checkbox.disabled = true;
    } else {
      checkbox.disabled = false;
      checkbox.checked = true;
    }
  });

  // Update the "Total Words" value to the total number of words
  const totalWordsCount = Object.values(englishWords).length;
  document.getElementById('word-count-label').textContent = totalWordsCount;
  document.getElementById('word-count-slider').value = totalWordsCount;
  document.getElementById('word-count-slider').min = 3;
  document.getElementById('word-count-slider').max = totalWordsCount;
}

// Function to update the HTML settings table
function updateWordDisplay(filteredWords) {
  // Update CEFR levels in the settings table
  const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  cefrLevels.forEach((cefrLevel) => {
    // Find the span element that displays the count for this CEFR level
    const cefrCountSpan = document.getElementById(`cefr-level-count-${cefrLevel}`);
    
    // Filter the words that match the current CEFR level
    let wordsMatchingCEFR = 0;
    for (const wordKey in filteredWords) {
      if (filteredWords.hasOwnProperty(wordKey)) {
        const word = filteredWords[wordKey];
        if (word.cefr.level === cefrLevel) {
            wordsMatchingCEFR++;
        }
      }
    }
    
    // Update the count displayed in the span element
    cefrCountSpan.textContent = wordsMatchingCEFR;
  });

  // Update "Total Words" in the settings table
  const totalWordsCount = getObjectLength(filteredWords);

    const wordTypes = ['noun', 'adjective', 'verb', 'adverb', 'preposition', 'pronoun', 'interjection'];
    const wordTypeCounts = {};

  // Initialise counters for each word type
  wordTypes.forEach((wordType) => {
    wordTypeCounts[wordType] = 0;
  });

  // Go through the words and increase the counters for the corresponding word types
  for (const wordKey in filteredWords) {
    if (filteredWords.hasOwnProperty(wordKey)) {
      const word = filteredWords[wordKey];
      word["word-types"].forEach((type) => {
        if (wordTypes.includes(type["word-type"])) {
          wordTypeCounts[type["word-type"]] += 1;
        }
      });
    }
  }

  wordTypes.forEach((wordType) => {
      // Find the span element that displays the count for this word type
      const wordTypeCountSpan = document.getElementById(`words-types-count-${wordType}`);
      wordTypeCountSpan.textContent = wordTypeCounts[wordType];
  });



  document.getElementById('word-count-label').textContent = totalWordsCount;
  document.getElementById('word-count-slider').value = totalWordsCount;
  const startButton = document.getElementById('start-quiz-button');
  if (totalWordsCount < 3){   
    startButton.style.backgroundColor = "grey";
    startButton.disabled = true;
  } else {
    startButton.style.backgroundColor = 'rgba(76, 175, 80, 0.9)';
    startButton.disabled = false;
  }
}

// Function to check the total count of selected words
function checkWordCount() {
  const selectedWordCount = 3;
  if (selectedWordCount < 3) {
    // Call the function to reset settings
    initSettings();
  }
}

// get lenght of object
function getObjectLength(obj) {
  return Object.keys(obj).length;
}