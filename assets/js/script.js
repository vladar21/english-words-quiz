let quizData = []; // Array to store quiz data
// Define the winnersArray variable
let winnersArray = [];
// Array of words to use for attempts (e.g., "first," "second," "third," etc.)
let attempts = -1;

// Add an event listener to the "Start" and "Skip" button
var startQuizButton = document.getElementById('start-quiz-button');
startQuizButton.addEventListener('click', startQuiz);
var nextQuizButton = document.getElementById('next-button');
nextQuizButton.addEventListener('click', takeAturn);
// Add an event listener for the "Stop Quiz" button
const stopQuizButton = document.getElementById('stop-button');
stopQuizButton.addEventListener('click', stopQuiz);

// Function to start the quiz
function startQuiz() {
    // Display the first question and answer options
    // displayNewQuestion();

    // Increment attempts when starting a new quiz
    attempts++;

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
    let currentQuiz = displayQuestion(randomQuestion);
    quizData.attempt = attempts;
    quizData.push(currentQuiz);
}

// Function to finish the quiz
function stopQuiz() {
    // Show the page "statistic-window"
    let statisticWindow = document.getElementById("statistic-window");
    statisticWindow.style.display = "block";

    // Hide quiz area
    let quizField = document.getElementById("quiz-field");
    quizField.style.display = "none";

    // Access the winners' table element's tbody
    const winnersTable = document.querySelector('.winners-table tbody');

    // Calculate attempts as the maximum value in the "Attempts" column of the winners' table
    // const attempts = calculateMaxAttempts(winnersTable);

    // If there are no rows in the table, add the initial "first" attempt
    // if (winnersTable.rows.length === 0) {
    //     const row = document.createElement('tr');
    //     row.innerHTML = `
    //         <td>1</td>
    //         <td>first</td>
    //         <td>0</td>
    //     `;
    //     winnersTable.appendChild(row);
    // }

    // Calculate the total number of correct answers for the current attempt
    const totalCorrectAnswers = quizData.reduce((total, quiz) => {
        const correctAnswers = quiz.answers.filter(answer => answer.isCorrect && answer.isUserChoice && quizData.attempt === attempts).length;
        return total + correctAnswers;
    }, 0);

    // Add the total data to the array
    winnersArray.push({
        place: 0, // Initialize with 0, will be updated later
        attempts: attempts, // Calculate attempts value
        scores: totalCorrectAnswers
    });

    // Get the data from the winners table (excluding the first row)
    const winnersTableData = Array.from(winnersTable.rows).slice(1).map(row => {
        const [place, attempts, scores] = row.cells;
        return {
            place: Number(place.textContent),
            attempts: attempts.textContent.trim(), // Use trim to remove leading/trailing whitespace
            scores: Number(scores.textContent)
        };
    });

    // Merge the data from the winners table into the winnersArray
    winnersTableData.forEach(data => {
        const existingWinner = winnersArray.find(winner => winner.attempts === data.attempts && winner.scores === data.scores);
        if (existingWinner) {
            // Update the place if a matching entry exists
            existingWinner.place = data.place;
        } else {
            // Add the data if it doesn't exist in winnersArray
            winnersArray.push(data);
        }
    });

    // Sort the array by scores in descending order
    winnersArray.sort((a, b) => b.scores - a.scores);

    // Update the 'place' values based on the sorted order
    winnersArray.forEach((winner, index) => {
        winner.place = index + 1;
    });

    // Populate the winners table HTML based on the sorted array
    winnersTable.innerHTML = '';
    winnersArray.forEach((winner, index) => {
      
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${winner.place}</td>
            <td>${getAttemptString(winner.attempts)}</td>
            <td>${winner.scores}</td>
        `;
        winnersTable.appendChild(row);
       
    });

    // Call updateAttemptsInTable to update the attempt values in the table
    // updateAttemptsInTable(winnersTable, attempts);
}

// function calculateMaxAttempts(winnersTable) {
//     let maxAttempts = 0;

//     // Iterate through rows of the table to find the maximum attempts
//     winnersTable.querySelectorAll('tr').forEach((row) => {
//         const attemptsCell = row.querySelector('td:nth-child(2)');
//         if (attemptsCell) {
//             const attempts = parseInt(attemptsCell.textContent, 10);
//             if (!isNaN(attempts) && attempts > maxAttempts) {
//                 maxAttempts = attempts;
//             }
//         }
//     });

//     return maxAttempts + 1; // Increment the maxAttempts by 1 for the new quiz
// }

// Return the next attempt string
// function calculateNextAttemptString(winnersTable) {
//     const attemptStrings = Array.from(winnersTable.rows).map(row => {
//         const [place, attempts, scores] = row.cells;
//         return attempts.textContent.trim();
//     });

//     // Convert attempt strings to numeric values
//     const attemptNumbers = attemptStrings.map(attemptString => {
//         const numberMap = {
//             "first": 1,
//             "second": 2,
//             "third": 3,
//             // Add more mappings as needed
//         };
        
//         return numberMap[attemptString.toLowerCase()] || 0; // Default to 0 if not found
//     });

//     // Calculate the next attempt
//     const maxAttempt = Math.max(...attemptNumbers);
//     const nextAttemptIndex = attemptNumbers.indexOf(maxAttempt) + 1;
//     const nextAttempt = attemptNumbers.length > 0 ? getAttemptString(nextAttemptIndex) : "first";

//     return nextAttempt;
// }

function getAttemptString(index) {
    const attemptStrings = ["first", "second", "third", "fourth", "fifth"]; // Add more as needed
    return attemptStrings[index] || "first";
}

// function updateAttemptsInTable(winnersTable, attempts) {
//     winnersTable.querySelectorAll('tr').forEach((row, index) => {
//         const attemptsCell = row.querySelector('td:nth-child(2)');
//         if (attemptsCell) {
//             attemptsCell.textContent = getAttemptString(index + 1);
//         }
//     });
// }

// Return the next attempt string
function calculateNextAttemptString(winnersTable) {
    const attemptStrings = Array.from(winnersTable.rows).map(row => {
        const [place, attempts, scores] = row.cells;
        return attempts.textContent.trim();
    });

    // Convert attempt strings to numeric values
    const attemptNumbers = attemptStrings.map(attemptString => {
        const numberMap = {
            "first": 1,
            "second": 2,
            "third": 3,
            // Add more mappings as needed
        };
        
        return numberMap[attemptString.toLowerCase()] || 0; // Default to 0 if not found
    });

    // Calculate the next attempt
    const maxAttempt = Math.max(...attemptNumbers);
    const nextAttemptIndex = attemptNumbers.indexOf(maxAttempt) + 1;
    const nextAttempt = attemptNumbers.length > 0 ? getAttemptString(nextAttemptIndex) : "first";

    return nextAttempt;
}

function getAttemptString(index) {
    const attemptStrings = ["first", "second", "third", "fourth", "fifth"]; // Add more as needed
    return attemptStrings[index] || "first";
}

function updateAttemptsInTable(winnersTable, attempts) {
    winnersTable.querySelectorAll('tr').forEach((row, index) => {
        const attemptsCell = row.querySelector('td:nth-child(2)');
        if (attemptsCell) {
            attemptsCell.textContent = getAttemptString(index + 1);
        }
    });
}

// Function to next turn in the quiz
function takeAturn() {
    // check last answer
    checkLastAnswer();
    // Display new question
    const randomQuestion = getRandomQuestion(englishWords); 
    let currentQuiz = displayQuestion(randomQuestion);
    quizData.push(currentQuiz);
}

// check last answer
function checkLastAnswer() {
    const lastQuiz = quizData[quizData.length - 1]; // Get the last quiz data

    if (lastQuiz) {
        const answers = lastQuiz.answers;
        const lastUserAnswer = answers.find(answer => answer.isUserChoice);

        if (lastUserAnswer) {
            if (lastUserAnswer.isCorrect) {
                // User's answer is correct
                const rightCountElement = document.getElementById('right-count');
                const rightCount = parseInt(rightCountElement.textContent) + 1;
                rightCountElement.textContent = rightCount;
            } else {
                // User's answer is incorrect
                const wrongCountElement = document.getElementById('wrong-count');
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
    const quizTaskElement = document.querySelector('.quiz-task');
    const wordTypeElement = document.querySelector('.word-type');
    const wordDefinitionElement = document.querySelector('.word-definition');

    // Update question elements
    quizTaskElement.textContent = 'Guess the word by definition:';
    wordTypeElement.textContent = question.wordType;
    wordDefinitionElement.textContent = question.definition;

    // Clear any previous answer options
    const answersListElement = document.querySelector('.answers-list');
    answersListElement.innerHTML = '';

    // Create an array to hold answer options (translations)
    const answerOptions = [];

    // Add the correct answer to the array
    answerOptions.push({ answer: question.word, isCorrect: true, isUserChoice: false });

    // Add two incorrect answers to the array
    while (answerOptions.length < 3) {
        // Get an array of keys (words) from englishWords
        const wordKeys = Object.keys(englishWords);

        // Select a random key from the array
        const randomKey = wordKeys[Math.floor(Math.random() * wordKeys.length)];

        // Make sure it's not the same as the correct answer
        if (randomKey !== question.word) {
            answerOptions.push({ answer: randomKey, isCorrect: false, isUserChoice: false });
        }
    }

    // Randomly shuffle the answer options
    const shuffledOptions = shuffleArray(answerOptions);

    // Add answer options to the DOM
    shuffledOptions.forEach((option) => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        const label = document.createElement('label');

        input.type = 'radio';
        input.className = 'answer-option';
        input.name = 'answer-option';

        label.textContent = option.answer;

        li.appendChild(input);
        li.appendChild(label);

        answersListElement.appendChild(li);

        // Add an event listener to track user's choice
        input.addEventListener('change', () => {
            option.isUserChoice = input.checked;
        });
    });

    // Add the currentQuiz object to the quizData array
    const currentQuiz = {
        question: question.definition,
        answers: answerOptions,
        scores: 0, // Initialize scores for this quiz
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

// Example usage:
// displayQuestion();