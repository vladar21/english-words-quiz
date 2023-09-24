// Get a reference to the "Start Quiz" button
var startQuizButton = document.getElementById("start-quiz-button");

// Add a click event listener to the button
startQuizButton.addEventListener("click", function () {
   
});

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
}

// Add an event listener to the "Start Quiz" button
var startQuizButton = document.getElementById('start-quiz-button');
startQuizButton.addEventListener('click', startQuiz);

// Function to get a random question
function getRandomQuestion() {
    // Get all the question keys from your englishWords object
    var questionKeys = Object.keys(englishWords);

    // Randomly select a question key
    var randomKey = questionKeys[Math.floor(Math.random() * questionKeys.length)];

    // Get the question and answer
    var question = randomKey;
    var answer = englishWords[randomKey].definition;

    return { question, answer };
}

// Example usage:
// var randomQuestion = getRandomQuestion();
// var questionText = randomQuestion.question;
// var correctAnswer = randomQuestion.answer;

// Function to display the question
function displayQuestion() {
    var questionElement = document.getElementById('question-area');
    questionElement.textContent = questionText; // Use the question text obtained earlier
}

// Example usage:
// displayQuestion();