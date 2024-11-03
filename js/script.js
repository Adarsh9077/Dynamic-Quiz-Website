// Fetching quizQuestion.js content
fetch("js/quizQuestion.js")
  .then((response) => response.text())
  .then((data) => {
    // Execute the script to have access to `quizQuestion`
    eval(data); // Be cautious when using eval, make sure it's trusted content
    const answerElement = document.querySelectorAll(".answer");
    const quiz = document.querySelector(".quiz");
    const [questionElement, option_1, option_2, option_3, option_4] =
      document.querySelectorAll(
        "#question,#option1,#option2,#option3,#option4"
      );

    const submitBtn = document.querySelector("#submit");
    const nextBtn = document.querySelector("#next-btn");
    const exitBtn = document.querySelector("#exit-btn");
    let attemptedQuestionCounter = 0;
    let lenghtofArrOfObject = quizQuestion.length;
    let arr = [];
    let score = 0;
    const scoreElm = document.querySelector(".score-li");
    const attempedQuestionsElm = document.querySelector(
      ".attempt-questions-li"
    );
    const veiwQuestions = document.querySelector(".view-questions-li");
    let currentQuiz = Math.floor(Math.random() * lenghtofArrOfObject) + 1;
    arr.push(currentQuiz);

    const searchNumberUsingBinarySearch = (number) => {
      let left = 0;
      let right = arr.length - 1;
      let found = false;

      // Perform binary search
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === number) {
          found = true;
          break;
        } else if (arr[mid] < number) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }

      if (found) {
        // Number already exists in arr, so generate a new question
        randomQuestions();
      } else {
        // Insert number in sorted order
        arr.splice(left, 0, number);
        currentQuiz = number;
        loadQuiz();
      }
    };

    const randomNumberGenrator = () => {
      let number = Math.floor(Math.random() * lenghtofArrOfObject) + 1;
      if (number === currentQuiz) {
        randomNumberGenrator();
      }
      return number;
    };
    function randomQuestions() {
      let randomNo = randomNumberGenrator();
      if (arr.length == 1) {
        if (randomNo > arr[0]) {
          arr.push(randomNo);
          currentQuiz = randomNo;
          loadQuiz();
        } else {
          arr.unshift(randomNo);
          currentQuiz = randomNo;
          loadQuiz();
        }
      } else {
        searchNumberUsingBinarySearch(randomNo);
      }
    }
    const loadQuiz = () => {
      scoreElm.innerText = score;
      veiwQuestions.innerText = arr.length;
      console.log(quizQuestion[currentQuiz].correct+1);
      const { question, options } = quizQuestion[currentQuiz];
      questionElement.innerHTML = question;

      options.forEach((curOption, index) => {
        window[`option-${index + 1}`].innerText = curOption;
      });
    };
    loadQuiz();

    const getSelectedOption = () => {
      const answerArr = Array.from(answerElement);
      return answerArr.findIndex((curElm) => curElm.checked);
    };
    const deselectedAnswer = () => {
      return answerElement.forEach((curElm) => (curElm.checked = false));
    };
    submitBtn.addEventListener("click", () => {
      attemptedQuestionCounter++;
      attempedQuestionsElm.innerHTML = attemptedQuestionCounter;
      const selectedOptionIndex = getSelectedOption();

      if (selectedOptionIndex === quizQuestion[currentQuiz].correct) {
        score++;
      }
      if (currentQuiz < quizQuestion.length) {
        // currentQuiz++;
        deselectedAnswer();
        randomQuestions();
        // loadQuiz();
      }
    });
    nextBtn.addEventListener("click", () => {
      // veiwQuestions
      randomQuestions();
    });
    exitBtn.addEventListener("click", () => {
      quiz.innerHTML = `<div class= "result"> 
      <h2> Your Score : ${score}/${arr.length} Correct Answer </h2>
      <p>Congratulations on completing the quiz! 🎉🎊</p> 
      <button class="reload-btn" onclick="location.reload()">Play Again ➿</button>
      </div>`;
    });
  })
  .catch((error) => {
    console.error("Error reading quizQuestion.js:", error);
  });
