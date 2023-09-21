// Define quiz data structure
var englishWords = {
    // Your quiz questions and answers here
};

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
var randomQuestion = getRandomQuestion();
var questionText = randomQuestion.question;
var correctAnswer = randomQuestion.answer;

