// Fetching quizQuestion.js content
fetch("js/quizQuestion.js")
  .then((response) => response.text())
  .then((data) => {
    // Execute the script to have access to `quizQuestion`
    eval(data); // Be cautious when using eval, make sure it's trusted content
    // console.log(quizQuestion.length)
    const answerElement = document.querySelectorAll(".answer");
    const [questionElement, option_1, option_2, option_3, option_4] =
      document.querySelectorAll(
        "#question,#option1,#option2,#option3,#option4"
      );

    const submitBtn = document.querySelector("#submit");

    let lenghtofArrOfObject = quizQuestion.length;
    let arr = [];
    let score = 0;
    const scoreElm = document.querySelector(".score-li");
    const attempedQuestionsElm = document.querySelector(
      ".attempt-questions-li"
    );
    let currentQuiz = Math.floor(Math.random() * lenghtofArrOfObject) + 1;
    arr.push(currentQuiz);
    console.log(arr);

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
        console.log(
          "object ",
          " Number already exists in arr, so generate a new question"
        );
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
        console.log("randomNumberGenrator in if condition");
      }
      console.log("randomNumberGenrator in before return");
      return number;
    };
    function randomQuestions() {
      let randomNo = randomNumberGenrator();
      if (arr.length == 1) {
        console.log(
          "randomQuestions if (arr.length == 1) ",
          randomNo,
          " ",
          arr[0]
        );
        if (randomNo > arr[0]) {
          console.log(
            "randomQuestions if (randomNo > arr[0]) ",
            randomNo,
            " arr -> ",
            arr
          );
          arr.push(randomNo);
          currentQuiz = randomNo;
          loadQuiz();
        } else {
          console.log(
            " randomQuestions else (randomNo < arr[0]) random number --> ",
            randomNo,
            " arr --> ",
            arr
          );
          arr.unshift(randomNo);
          console.log(arr);
          currentQuiz = randomNo;
          loadQuiz();
        }
      } else {
        console.log("randomQuestions else (arr.length != 1)");
        searchNumberUsingBinarySearch(randomNo);
      }
    }
    const loadQuiz = () => {
      scoreElm.innerText = score;
      attempedQuestionsElm.innerText = arr.length
      console.log(quizQuestion[currentQuiz].correct);
      console.log(arr, " in load function");
      const { question, options } = quizQuestion[currentQuiz];
      // console.log(options[0]);
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
      console.log("object");
      const selectedOptionIndex = getSelectedOption();

      if (selectedOptionIndex === quizQuestion[currentQuiz].correct) {
        score++;
        console.log(score, "\n");
      }
      if (currentQuiz < quizQuestion.length) {
        // currentQuiz++;
        deselectedAnswer();
        randomQuestions();
        // loadQuiz();
      }
    });
  })
  .catch((error) => {
    console.error("Error reading quizQuestion.js:", error);
  });
