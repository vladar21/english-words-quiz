# English Words Quiz

A web application for learning English vocabulary by testing your knowledge of words and their definitions - English Vocabulary Quiz App.

[View the live project here.](https://vladar21.github.io/english-words-quiz/)

## Description

The English Words Quiz is an interactive online quiz designed to test knowledge of English words and their definitions. This project is built using HTML5, CSS3, and native JavaScript. Whether you're looking to improve your English vocabulary or simply enjoy a challenging quiz, this application is for you.

![English Words Quiz Responsive](/assets/images/readme/EnglishWordsQuizResponsive.jpg)

### Quiz Overview

The English Words Quiz presents players with a series of questions, where they must choose the right answer from a selection of options. Questions are randomly generated, and players can test their knowledge in follow mode:

**Definition to Word**: The user must find the correct word that matches a given definition.

### Features

- Each question has a 30-second time limit. If the timer runs out or the user chooses to click the "Skip" button, the answer is considered incorrect, and the quiz proceeds to the next question.

- Players can answer questions by clicking on one of the three answer options or by using keyboard shortcuts, such as focusing on an option and pressing "Enter" for accessibility users.

![English Words Quiz Responsive](/assets/images/readme/QuizField.jpg)

- After completing the quiz, players can view detailed statistics, including total time, scores, the number of questions attempted, and their ranking on the leaderboard.

![English Words Quiz Leaderboard](/assets/images/readme/QuizLeaderboard.jpg)

### Settings

Before starting the quiz, users have the option to customize their experience in the **Settings** section:

- **Total Words**: Choose the total number of words in the quiz. Find the right balance between a quick game and an in-depth challenge.

- **CEFR Levels**: Select the difficulty level of quiz words from six CEFR levels:
  - A0/A1 English (Beginner/Elementary)
  - A2 English (Pre Intermediate)
  - B1 English (Intermediate)
  - B2 English (Upper Intermediate)
  - C1 English (Advanced)
  - C2 English (Proficient)

- **Word Types**: Customize the types of words that will appear in the quiz, directly influencing the definitions shown. Available word types include:
  - Noun
  - Adjective
  - Verb
  - Adverb
  - Preposition
  - Pronoun
  - Interjection

  ![English Words Quiz Leaderboard](/assets/images/readme/QuizSettings.jpg)

### Audio and Visual Elements

Each word in the quiz is accompanied by audio pronunciation and an image to enhance the learning experience. Listen to correct pronunciation and visualize words to reinforce your English vocabulary.

## User Goals

- Improve English vocabulary.
- Test knowledge of English words and their definitions.
- Enjoy an engaging and educational quiz experience by finding word definitions.
- Benefit from audio pronunciation and visual images to enhance language learning.
- View detailed statistics upon completing the quiz.

## Features Implemented

The English Words Quiz project includes the following features:

1. **Word Definitions Quiz:** Users can test their knowledge of English vocabulary by finding the right definitions for English words.

2. **Word-Definition Matching Quiz:** Users can match English word definitions to the correct words.

3. **Difficulty Levels:** Users can choose from six different CEFR difficulty levels to customize their quiz experience.

4. **Audio Pronunciation:** Users can play audio pronunciation of words to improve their listening skills.

5. **Multiple-Choice Questions:** Questions are presented as multiple-choice, making it easy for users to select the correct answer.

6. **Timer:** Each question has a time limit of 30 seconds, adding an element of challenge to the quiz.

7. **Skip Questions:** Users can skip questions when they are unsure or running out of time.

8. **Detailed Statistics:** After completing the quiz, users can view detailed statistics, including total time, right and wrong scores, the number of questions attempted, and their place in the winners' table.

9. **Responsive Design:** The project is responsive and works well on various screen sizes.

## Special Object: `englishWordsInit`

The core of the project is the `englishWordsInit` object. This object contains a comprehensive set of English words, their definitions, audio pronunciations and tips images, difficulty levels, translations and word types. It serves as the foundation for the quiz questions and answers. The structure of this object allows for dynamic quiz generation based on user-selected difficulty levels.

```json
const englishWordsInit = {    
    ...,
    "embrace": {
        "image_url": "assets/images/quiz_images/embrace.webp",
        "sound_url": "assets/sound/embrace.mp3",
        "cefr": {
            "level": "C1",
            "title": "Advanced"
        },
        "word-types": [
            {
                "word-type": "noun",
                "definitions": [
                    {
                        "definition": "the action of putting your arms around someone.",
                        "translate": {
                            "ru": [
                                {
                                    "translation": 'объятие',
                                    "definition": null,
                                    "sound_url": null,
                                },
                            ],
                        }
                    },
                    {
                        "definition": "a clasping in the arms; a hug.",
                        "translate": {
                            "ua": [
                                {
                                    "translation": 'обійми',
                                    "definition": null,
                                    "sound_url": null,
                                }, 
                            ],
                        }
                    },
                ],
            },
            {
                "word-type": "verb",
                "definitions": [
                    {
                        "definition": "If you embrace someone, you put your arms around them, and if two people embrace, they put their arms around each other.",                        
                        "translate": {
                            "ru": [
                                {
                                    "translation": 'обнимать',
                                    "definition": null,
                                    "sound_url": null,
                                },
                                {
                                    "translation": 'обниматься',
                                    "definition": null,
                                    "sound_url": null,
                                },  
                            ],
                        }
                    },
                    {
                        "definition": "to accept new ideas, beliefs, methods, etc in an enthusiastic way.",
                        "translate": {
                            "ru": [
                                {
                                    "translation": 'воспринимать',
                                    "definition": null,
                                    "sound_url": null,
                                }, 
                                {
                                    "translation": 'принимать',
                                    "definition": null,
                                    "sound_url": null,
                                }, 
                            ],
                        }
                    },
                    {
                        "definition": "to include a number of things.",
                        "translate": {
                            "ru": [
                                {
                                    "translation": 'включать в себя',
                                    "definition": null,
                                    "sound_url": null,
                                },
                            ],
                        }
                    },
                    {
                        "definition": "to take (a person etc) in the arms; to hug.",
                        "translate": {
                            "ua": [
                                {
                                    "translation": 'обнімати',
                                    "definition": null,
                                    "sound_url": null,
                                },
                            ],
                        }
                    },   
                    {
                        "definition": "to accept something enthusiastically.",
                        "translate": null
                    },
                    {
                        "definition": "to hold someone tightly with both arms to express love, liking, or sympathy, or when greeting or leaving someone.",
                        "translate": null
                    },
                    {
                        "definition": "to include something, often as one of a number of things.",
                        "translate": null
                    },
                ],
            },
        ],       
    },
    ...

};
```


## Technologies Used

- HTML5
- CSS3
- Native JavaScript

## Installation and Usage

To use the English Words Quiz, follow these steps:

1. Clone this repository to your local machine.

2. Open the `index.html` file in your web browser.

3. Explore the "Rules" section to understand how the quiz works and what to expect.

4. For more control over your quiz experience, use the "Settings" button to customize options like difficulty level, types of words and the number of words in the quiz.

5. Start the quiz by clicking the "Start Quiz" button in the control area.

6. Answer the questions by selecting the correct answer or clicking "Skip" when needed.

7. After completing the quiz, view your detailed statistics.

## Future Enhancements

The English Words Quiz project has great potential for expansion and improvement. Here are some exciting future enhancements to consider:

1. **Images and Sound Options:** Allow users to customize their quiz experience by toggling image and sound options on or off. This would cater to users who prefer quizzes without images or audio.

2. **Expanded Word Database:** Continuously update and expand the `englishWordsInit` object with more words, definitions, and media files to provide users with a broader vocabulary challenge.

3. **User Profiles and Leaderboards:** Implement user accounts and leaderboards to enable users to compete with others and track their progress over time.

4. **Enhanced Accessibility:** Further enhance accessibility features to make the quiz accessible to an even wider audience, including users with disabilities.

5. **Social Sharing:** Integrate social sharing options, allowing users to share their quiz results and challenge friends, creating a sense of competition and engagement.

6. **Translation Quizzes:** Introduce translation quizzes, allowing users to practice translating words or phrases between different languages. Initially, support four translation directions: English to Ukrainian, Ukrainian to English, English to Russian, and Russian to English. Expand this feature to include more languages in the future.

These enhancements will make the English Words Quiz project even more versatile and appealing to a broader user base, allowing users to improve their language skills in multiple ways.


## Testing

1. The W3C Markup Validator, and W3C CSS Validator, and JSHint Javascript Validator Services were used to validate every page of the project to ensure there were no syntax errors in the project.

-   [W3C Markup Validator](https://validator.w3.org/nu/) - [Results](https://validator.w3.org/nu/?doc=https%3A%2F%2Fvladar21.github.io%2Fenglish-words-quiz%2F)
-   [W3C CSS Validator](https://jigsaw.w3.org/css-validator/#validate_by_input) - [Results](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fvladar21.github.io%2Fenglish-words-quiz%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)
-   [JSHint JavaScript Validator](https://jshint.com/)

See the JSHint validation **Results** in the image below:

![JSHint validation results:](/assets/images/readme/JsHintValidationResult.jpg)

Thats:

```
One undefined variable
807	englishWordsInit
```

because the englishWordsInit is placed in a separate file, english-words-data.js.

2. Accessibility: I confirmed that the colors and fonts chosen are easy to read and accessible by running it through lighthouse in devtools.

![Lighthouse Chrome devtool test results](/assets/images/readme/LighthouseEstemation.jpg)

3. I tested that this page works in different browsers: Chrome, Firefox, Mircrosoft Edge.

4. I confirmed that this project is responsive, looks good and functions on all standard screen sizes using the devtools device toolbar.

5. I have confirmed that the form works: requires entries in every field, will only accept an email in the email field, and the submit button works.

## Bugs

### 1. Timer Background Color Bug

- **Description:** In some cases, the timer background color displayed incorrectly when the user had a 10-second countdown on the previous attempt.

  ![Timer Background Color Bug](/assets/images/readme/timer_background_color_bug.jpg)

- **Solution:** The issue was resolved by adding two lines of code to the "displayQuestion" function, setting the default timer background color and text color.

  ![Fix the Timer Background Color Bug](/assets/images/readme/timer_background_color_bug_fix.jpg)

### 2. Rules Background Color Bug

- **Description:** There was an issue with the background color toggle for the "Rules" link. When the user visited the "Rules" section and then navigated to another section, the "Rules" background color did not change by default.

  ![Rules Background Color Bug](/assets/images/readme/Bacground_Rules_bug.png)

- **Solution:** The problem was fixed by removing the assignment of the highlight background color in the click handler.

  ![Fix the Rules Background Color Bug](/assets/images/readme/Bacground_Rules_bug_fix.png)

### 3. Missing Variants of Words

- **Description:** Instead of displaying variants of words, numbers were shown for some questions.

  ![Variants of Words Missing Bug](/assets/images/readme/variants_words_missing_bug.jpg)

- **Solution:** The issue was resolved by updating the main data object, "englishWords."

  ![Fix the Variants of Words Missing Bug](/assets/images/readme/variants_words_missing_bug_fix.jpg)

### 4. Reference Issue with "englishWordsInit"

- **Description:** Modifying "englishWords" after assigning it from "englishWordsInit" affected "englishWordsInit" because they shared references to the same nested objects and arrays.

- **Solution:** To prevent this issue, a deep copy of "englishWordsInit" was created using the `JSON.parse()` and `JSON.stringify()` methods:

  ```javascript
  let englishWords = JSON.parse(JSON.stringify(englishWordsInit));

### 5. Slider Issue in Settings Page

- **Description:** There was a problem with the slider in the settings page, where its max value didn't dynamically adjust for different settings, causing confusion for users.

  ![Slider Bug](/assets/images/readme/slider_bug.jpg)

- **Solution:** The issue was resolved by adding a listener to the settings slider, ensuring that its max value adapts to different settings, providing a more user-friendly experience.

  ![Fix the Slider Bug](/assets/images/readme/slider_bug_fix.jpg)


## Deployment

The site was deployed to GitHub pages. The steps to deploy are as follows:
- In the GitHub repository, navigate to the Settings tab.
- From the source section drop-down menu, select the Main Branch.
- Once the main branch has been selected, the page provided the link to the completed website.

The live link can be found here - [English Words Quiz](https://vladar21.github.io/english-words-quiz/)

## Credits

### Code

-   Idea of site layout and a lot of styles featers by Code Institute education project from this [Love Maths](https://github.com/Code-Institute-Solutions/love-maths-2.0-sourcecode)

-   Idea of quiz and words set from this [Cambridge Dictionary +Plus](https://dictionary.cambridge.org/plus/)

### Content

-   All content was written by the developer.

### Media

-   Favicon generator from this [Converter](https://favicon.io/favicon-converter/)

-   All of my quiz images were created by [Image Creator, powered by DALL-E](https://www.bing.com/images/create)

-   Image converter for the images of this site [Image converter](https://www.freeconvert.com/)

-   Image to Readme file from this [Am I Responsive?](https://ui.dev/amiresponsive)


### Acknowledgements

-   Special acknowledgments to my sister Eleonora Bikulova for her invaluable input.

-   My Mentor - Oluwafemi Medale - for continuous helpful feedback.

-   Tutor support at Code Institute for their support.

## License

This project is licensed under the MIT License.

