// global variable with data of all quiz events
var quizData = [];

// Add an event listener to the "Start" and "Skip" button
var startQuizButton = document.getElementById('start-quiz-button');
startQuizButton.addEventListener('click', startQuiz);
var nextQuizButton = document.getElementById('next-button');
nextQuizButton.addEventListener('click', takeAturn);

// Function to start the quiz
function startQuiz() {
    // Display the first question and answer options
    // displayNewQuestion();

    // Hide the "Start Quiz" button
    let startQuizButton = document.getElementById('start-quiz-button');
    startQuizButton.style.display = 'none';
    // Hide the start page "statistic-window"
    let statisticWindow = document.getElementById("statistic-window");
    statisticWindow.style.display = "none";
    
    // Show quiz area
    let quizField = document.getElementById("quiz-field");
    quizField.style.display = "flex";

    // Display new question
    const randomQuestion = getRandomQuestion(englishWords); 
    let currentQuiz = displayQuestion(randomQuestion);
    quizData.push(currentQuiz);
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
    let currentQuiz = {
        "question": question,
        "answers": answerOptions
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