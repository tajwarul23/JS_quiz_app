document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid", "Rome"],
      id: 1,
      ans: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      id: 2,
      ans: "Mars",
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: [
        "Harper Lee",
        "Mark Twain",
        "Ernest Hemingway",
        "F. Scott Fitzgerald",
      ],
      id: 3,
      ans: "Harper Lee",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      id: 4,
      ans: "Pacific",
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      id: 5,
      ans: "JavaScript",
    },
  ];

  let arr = JSON.parse(localStorage.getItem("ans")) || [];

  //grabbing element
  let startBtn = document.querySelector("#start-btn");
  let nextBtn = document.querySelector("#next-btn");
  let restartBtn = document.querySelector("#restart-btn");

  let questionContainer = document.querySelector("#question-container");
  let options = document.querySelector("#options");
  let questionText = document.querySelector("#question-text");
  let resultContainer = document.querySelector("#result-container");
  let scoreDisplay = document.querySelector("#score");

  let currentQuestionIndex = 0;
  let score = 0;

  //implementing starbutton functionality
  startBtn.addEventListener("click", startQuiz);

  //implementing startQuiz method
  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");

    //now show questions
    showQuestion();
  }

  // showing the questions from here
  function showQuestion() {
    nextBtn.classList.add("hidden");

    questionText.textContent = questions[currentQuestionIndex].question;

    options.innerHTML = ""; //clear previous options

    //looping through every options of the question to show on UI
    questions[currentQuestionIndex].options.forEach((op) => {
      let li = document.createElement("li");
      li.textContent = op;
      li.classList.add(
        "bg-blue-950",
        "mt-4",
        "p-2",
        "rounded-md",
        "cursor-pointer",
        "hover:bg-blue-800"
      );
      let count = 0;
      li.addEventListener("click", () => {
        console.log(questions[currentQuestionIndex].id);

        count++;
        if (count > 1) {
          alert("You have selected the option again !");
          return;
        }
        // Remove selection from all options first
        options.querySelectorAll("li").forEach((item) => {
          item.classList.remove("bg-blue-600");
          item.classList.add("bg-blue-950"); // restore original background
        });

        selectAnswer(op);

        // Remove original background and add selected background
        li.classList.remove("bg-blue-950");
        li.classList.add("bg-blue-600");
      });
      options.appendChild(li);
    });
  }

  //implemneting option selecting method
  function selectAnswer(option) {
    let correctAns = questions[currentQuestionIndex].ans;
    // option.classList.add("bg-blue");

    if (correctAns === option) {
      score++;
    }
    nextBtn.classList.remove("hidden");
  }

  //implementing nextbutton
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  //implementing showResult
  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });
});
