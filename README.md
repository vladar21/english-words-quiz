# English Words Quiz

## Description

The English Words Quiz is an interactive online quiz designed to test your knowledge of English words and their definitions, or vice versa. This project is built using HTML5, CSS3, and native JavaScript. Whether you're looking to improve your English vocabulary or simply enjoy a challenging quiz, this application is for you.

The brief description of the quize:
The user must find right definitions for English's word or right word by his definition. 

The idea of the quiz it is chosen right answer among three, that randomly chosen from another. The words and its definitions are stored in key-value array - englishWords. Structure of word sentence is:

```json
var englishWords = {
    [word]: value,
    features: {
        'definition': value,
        'image_url': value,
        'sound_url': value
        'translate': {
             'ua': {
                  'lang': 'ukrainian
                   'translation': value,
                   'sound_url': value
              }
        }
    }
}
```

Each answer has a time limit, its 30s, if answer time is got out or user has to click "skip" button - it is wrong answer and go to next answer. Answer by clicking on one of the three answers in the current answers list, or focus + enter for accessibility users.
When the quiz is finished, there must be detailed information (total time, wrong/right scores, how many was questions, the winners table and the current players place in it).

## User Goals

- Improve English vocabulary.
- Test knowledge of English words and their definitions.
- Enjoy an engaging and educational quiz experience.
- Choose between two play modes: finding word definitions or matching definitions to words.
- View detailed statistics upon completing the quiz.

## Features

1. **Black Mode Background**: Enjoy a sleek and immersive quiz experience with a black mode background.

2. **Quiz Field**: The main quiz area where questions and answers are displayed.

3. **Question Area**: Displays the current question or definition.

4. **Answer List Area**: Presents three answer options, one of which is correct. Users must select the correct answer.

5. **Skip Button**: Users can click the "Skip" button to move to the next question if they are unsure of the answer.

6. **Correct and Incorrect Score Area**: Keeps track of the user's score, showing the number of correct and incorrect answers.

7. **Control Area**: Provides options to start and stop the quiz.

8. **Winner's Congratulations Modal Window**: Displays a congratulatory message to the user upon successfully completing the quiz.

9. **Fail Window for Lost Cases**: Shows a message to the user in case they fail to answer a question correctly.

10. **Countdown Spinner for Answer Time**: There is a countdown timer for each question, set at 30 seconds. If time runs out, or the user clicks "Skip," it's considered a wrong answer.

11. **Total Time and Statistic Window**: After completing the quiz, users receive detailed information, including total time, scores, the number of questions attempted, and their place on the leaderboard.

12. **Play Mode Switch**: Allows users to choose between two play modes: looking for a word by its definition or finding a definition by a word.

Items 2,3,4,5,6 - must have background images from the EnglishWords array, which must be from the current word imageUrl field.

## Technologies Used

- HTML5
- CSS3
- Native JavaScript

## Installation and Usage

To use the English Words Quiz, follow these steps:

1. Clone this repository to your local machine.

2. Open the `index.html` file in your web browser.

3. Start the quiz by clicking the "Start Quiz" button in the control area.

4. Answer the questions by selecting the correct answer or clicking "Skip" when needed.

5. After completing the quiz, view your detailed statistics.

## Future Enhancements

- Adding more words and definitions to expand the quiz content.
- Adding sound per word, and mode three for this case (looking for word by its sound).
- Implementing user accounts and leaderboards for competition.
- Enhancing accessibility features for a wider audience.
- Integrating social sharing options for users to challenge friends.

## Testing

[under construction]

## Bugs

[under construction]

## Deployment

The English Words Quiz can be deployed to any web hosting platform or server by simply uploading the project files.

## Credits

This project was created with contributions from:

- [contributor 1 Name]
- [Contributor 2 Name]
- [Contributor 3 Name]

Special thanks to [Any Additional Credits or Acknowledgments].

## License

This project is licensed under the MIT License.

