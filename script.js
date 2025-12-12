// your JS code here.

// Questions (do not modify)
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// ------------ SESSION STORAGE LOGIC ------------

// Load saved progress OR create empty object
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Save a selected answer
function saveProgress(questionIndex, selectedOption) {
  userAnswers[questionIndex] = selectedOption;
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// ------------ RENDER QUESTIONS ------------

const questionsElement = document.getElementById("questions");

function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear before rendering

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const wrapper = document.createElement("div");

    const title = document.createElement("p");
    title.textContent = q.question;
    wrapper.appendChild(title);

    q.choices.forEach((choice) => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;

      // Restore previous selection
      if (userAnswers[i] === choice) {
        radio.checked = true;
      }

      // Save selection to sessionStorage
      radio.addEventListener("change", () => saveProgress(i, choice));

      const label = document.createElement("label");
      label.textContent = choice;

      wrapper.appendChild(radio);
      wrapper.appendChild(label);
      wrapper.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(wrapper);
  }
}

renderQuestions();

// ------------ SUBMIT QUIZ ------------

const submitButton = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

submitButton.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Save score in localStorage
  localStorage.setItem("score", score);

  // Display score
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
});

// ------------ SHOW SCORE IF ALREADY SUBMITTED ------------

const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}
