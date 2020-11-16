var questions = [
    {
        question: 'Which city is the capital of Japan',
        choices: ['Tokyo', 'Nagasaki', 'Hiroshima', 'Kanagawa'],
        correctAnswer: 0
    },
    {
        question: 'Which city is the capital of Germany',
        choices: ['Dresden', 'Munich', 'Berlin', 'Hamburg'],
        correctAnswer: 2
    },
    {
        question: 'Which is the capital city of France',
        choices: ['Lyon', 'Nice', 'Strasbourg', 'Paris'],
        correctAnswer: 3
    },
    {
        question: 'Which is the capital city of Switzerland',
        choices: ['Zurich', 'Geneva', 'Basel', 'Bern'],
        correctAnswer: 1
    },
    {
        question: 'Which is the capital city of Austria',
        choices: ['Innsbruck', 'Vienna', 'Linz', 'Salzburg'],
        correctAnswer: 1
    }
];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

window.addEventListener('DOMContentLoaded', function(e){
    displayCurrentQuestion();

    var quizMessage = document.querySelector('.quizMessage');

        quizMessage.style.display = 'none';

    document.querySelector('.nextButton').addEventListener('click', function(){
        
        if(!quizOver){
            var radioBtnsChecked = document.querySelector('input[type=radio]:checked');

            if (radioBtnsChecked === null){
                quizMessage.innerText = 'Please select an answer';
                quizMessage.style.display = 'block';
            } else {
                console.log(radioBtnsChecked.value);
                quizMessage.style.display = 'none';
                if (parseInt(radioBtnsChecked.value) === questions[currentQuestion].correctAnswer){
                    correctAnswers++;
                }

                currentQuestion++;

                if (currentQuestion < questions.length){
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    document.querySelector('.nextButton').innerText = 'Play Again?';
                    quizOver = true;
                 }
                }   
        } else {
            quizOver = false;
            document.querySelector('.nextButton').innerText = 'Next Question';
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });
});

function displayCurrentQuestion(){
    console.log('In display current Questions');

    var question = questions[currentQuestion].question;
    var questionClass = document.querySelector('#container > .question');
    var choiceList = document.querySelector('#container  > .choiceList');
    var numChoices = questions[currentQuestion].choices.length;


    questionClass.innerText = question;


    choiceList.innerHTML = '';

    var choice;
    for (i = 0; i < numChoices; i++){
        choice = questions[currentQuestion].choices[i];
        var li = document.createElement('li');
            li.innerHTML = '<li><input type="radio" value="' + i + '" name="dynradio" />' + choice + '</li>'
        choiceList.appendChild(li);

    }
}

function resetQuiz(){
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore(){
    document.querySelector('#container > .result').innerText = 'You scored: ' + correctAnswers + ' out of ' + questions.length;
    document.querySelector('#container  > .result').style.display = 'block';
}

function hideScore(){
    document.querySelector('.result').style.display = 'none';
}