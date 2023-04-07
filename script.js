let start = document.querySelector('#start');
let startContainer = document.querySelector('.startContainer');
let quizContainer = document.querySelector('#quizContainer');
let timer = document.querySelector('#timer');
var timerInterval;
let countdown = 60;
let question = document.querySelector('#question');
let answer = document.querySelector('#answer');
let opt1 = document.querySelector('#opt1');
let opt2 = document.querySelector('#opt2');
let opt3 = document.querySelector('#opt3');
let opt4 = document.querySelector('#opt4');
let qIndex = 0;
let score = document.querySelector('#score');
let highscoreContainer = document.querySelector('#highscoreContainer');
let viewHighscore = document.querySelector('#viewHighscore');
let returnButton = document.querySelector('#returnButton');
let highscoreGraveyard = document.querySelector('#scoreGraveyard');
let highscore = document.querySelector('#highscore');

start.addEventListener('click', startQuiz);

function startQuiz() {
    //adding a class of hidden to the start container and removing it from the quiz container
    startContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');

    function startTimer() {
        timerInterval = setInterval(function () {
            countdown--;
            timer.textContent = "Time Remaining: " + countdown;
            if (countdown === 0) {
                clearInterval(timerInterval);
                //stops the timer if the time is equal to zero
                timer.textContent = "Time's Up!";
            }
        }, 1000);  
    }
    startTimer();
    newQuestion();
}              

function newQuestion() {
    // youre doing an object with a bunch of arrys on the inside
    question.textContent = allQuestions[qIndex].q;
    opt1.textContent = allQuestions[qIndex].a.a;
    opt2.textContent = allQuestions[qIndex].a.b;
    opt3.textContent = allQuestions[qIndex].a.c;
    opt4.textContent = allQuestions[qIndex].a.d;
}
var allQuestions = [
    {
        q: 'What does the class element do?',
        a:{
            a: 'i honestly dont know what this is',
            b: 'https://www.w3schools.com',
            c: 'Specifies one or more class names for an element',
            d: 'DOM....?'
        },
        correct: 'Specifies one or more class names for an element'
    },
    {
        q: 'How do you add a comment in JavaScript?',
        a:{
            a: '/*',
            b: 'by declaring it',
            c: 'you whisper to the computer',
            d: '//'
        },
        correct: '//'

    },
    {
        q: 'What is an argument in a function?',
        a:{
            a: 'yelling at your math homework',
            b: 'an array-like object inside a function that contains value to execute the function',
            c: 'yelling at your math TEACHER',
            d: 'DOM....TRAVERSAL?'
        },
        correct: 'an array-like object inside a function that contains value to execute the function'
    },
    {
        q: 'What is a boolean statement in JavaScript?',
        a:{
            a: 'booooo tomato tomato',
            b: 'that word is so unserious',
            c: 'a true or false statement',
            d: 'TRAVERSING........... THE DOM....?'
        },
        correct: 'a true or false statement'
    }

];

answer.addEventListener('click', function (event) {
    if (event.target.nodeName !== 'BUTTON') {
        return;}
        //return means nothing is going to happen, still listening for the click event
        // listing the things it needs to listen for. grouping it all in one function 
    var userAnswer = event.target.textContent;
    var correctAnswer = allQuestions[qIndex].correct;
    // declaring to check if the user choice is equal to the correct answer. pulling all questionsin the order of queue index and attaching that to the correctAnswer variable in the array
    // correct of #1, #2, etc 
    if (userAnswer !== correctAnswer) {
        countdown -= 10;
        timer.textContent = "Time Remaining: " + countdown;
        if(countdown === 0) {
            clearInterval(timerInterval);
            timer.textContent = "Time's Up!";
            score = 0;
        }
        qIndex++
        if (qIndex >= allQuestions.length) { //checks how many questions there are. if the question index is great than or equal to the length of the questions array, then the game is over.
            quizContainer.classList.add('hidden');
            highscoreContainer.classList.remove('hidden');
            //this removes the hidden class from the start container and adds it back to the quiz container
            timer.textContent = "Game Over!";
            clearInterval(timerInterval);
            document.querySelector('#score').textContent = "Your score is " + score;
            if (countdown === 0) {
                clearInterval(timerInterval);
                timer.textContent = "Time's Up!";
                score = 0;
            }
            return;
        }
        newQuestion();
    }
});

viewHighscore.addEventListener('click', function () {
    var highscores = JSON.parse(localStorage.getItem('highscores')) ||[];
    highscores.push({
        name: document.querySelector('#nameInput').value,
        score: countdown
    }); //pushes the score onto the highscores array
    // declaring to check if there are any highscores in the local storage
    localStorage.setItem('highscores', JSON.stringify(highscores));
});

viewHighscore.addEventListener('click', function () {
    highscoreContainer.classList.add('hidden');
    // removes the highscore container containing your current score, and then makes the graveyard visible
    highscoreGraveyard.classList.remove('hidden');
    const string = JSON.localStorage.getItem('highscores');
    const array = JSON.parse(string);
    // parses it for the local storage and returns it as an array
    const ul = document.createElement('ul');
    // displays all the highscores and continually adds them to the ul
    for (let i=0; i < array.length; i++) {
        const li = document.createElement('li');
        const text = document.createTextNode(`${array[i].name}: ${array[i].score}`);
        // creating and replacing what is on the LI with text from the array in local storage 
        // when you append children, you linkt them together
        li.appendChild(text);
        ul.appendChild(li);
        // linked the list items to the ul 
    }
    document.querySelector('#scoreDisplay').appendChild(ul);
});

// we still want the view high score inthe top left corner to do what happpens at the end of the quiz

highscore.addEventListener('click', function () {
startContainer.classList.add('hidden');
    highscoreGraveyard.classList.remove('hidden');
    const string = JSON.localStorage.getItem('highscores');
    const array = JSON.parse(string);
    const ul = document.createElement('ul');
    for (let i=0; i < array.length; i++) {
        const li = document.createElement('li');
        const text = document.createTextNode(`${array[i].name}: ${array[i].score}`);
        li.appendChild(text);
        ul.appendChild(li);
    }
    document.querySelector('#scoreDisplay').appendChild(ul);
});

returnButton.addEventListener('click', function (event) {
    event.preventDefault();
    // default for the site refreshes the page, so when we click it we want to prevent the refresh
    // we want to hide the high score container at the end of the quiz
    startContainer.classList.remove('hidden');
    highscoreContainer.classList.add('hidden');
    clearInterval(timerInterval);
    countdown = 60;
    timer.textContent = "Time: " + 0;
});