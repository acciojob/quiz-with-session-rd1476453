// your JS code here.

// Questions given
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

// ---------------- SESSION STORAGE ----------------

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

function saveProgress(qIndex, choiceValue) {
  userAnswers[qIndex] = choiceValue;
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// ---------------- RENDER QUESTIONS ----------------

const questionsElement = document.getElementById("questions");

function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const wrapper = document.createElement("div");

    const p = document.createElement("p");
    p.textContent = q.question;
    wrapper.appendChild(p);

    q.choices.forEach((choice) => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;

      // Restore selection + force attribute (Cypress requirement)
      if (userAnswers[i] === choice) {
        radio.checked = true;
        radio.setAttribute("checked", "true");
      }

      // When user selects something
      radio.addEventListener("change", () => {
        saveProgress(i, choice);

        // Remove checked attribute from all siblings
        const group = document.getElementsByName(`question-${i}`);
        group.forEach((btn) => btn.removeAttribute("checked"));

        // Add checked="true" for Cypress
        radio.setAttribute("checked", "true");
      });

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

// ---------------- SUBMIT BUTTON ----------------

const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

submitBtn.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) score++;
  }

  localStorage.setItem("score", score);
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
});

// ---------------- RESTORE SCORE ----------------

const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}
