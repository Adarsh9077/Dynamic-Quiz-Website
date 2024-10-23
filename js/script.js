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

    // console.log(submitBtn)
    // submitBtn.addEventListener
    let lenghtofArrOfObject = quizQuestion.length;
    let arr = [];
    // console.log(arr.length === 1);

    let currentQuiz = Math.floor(Math.random() * 547) + 1;
    // if (isArrayE)
    // console.log(currentQuiz)
    let score = 0;

    if (arr.length === 0) {
      arr.push(currentQuiz);
      currentQuiz+2;
      // arr
    }
    else if(arr.length === 1){
      if(arr[0]< currentQuiz)
      // arr[0] 
    arr.push(currentQuiz)
    console.log(arr)
    }
    const loadQuiz = () => {
      const { question, options } = quizQuestion[currentQuiz];
      console.log(options[0]);
      // console.log(question)
      questionElement.innerHTML = question;

      console.log(":)");
      options.forEach((curOption, index) => {
        window[`option-${index + 1}`].innerText = curOption;
      });
    };
    loadQuiz();
    // getSelectedOption
    const getSelectedOption = () => {
      // let ans_index;
      // answerElement.forEach((curOption, index) => {
      //   if (curOption.checked) {
      //     ans_index = index;
      //   }
      // });
      // return ans_index;
      const answerArr = Array.from(answerElement);
      return answerArr.findIndex((curElm) => curElm.checked);
    };
    submitBtn.addEventListener("click", () => {
      console.log("object");
      const selectedOptionIndex = getSelectedOption();
      console.log(selectedOptionIndex);
    });
  })
  .catch((error) => {
    console.error("Error reading quizQuestion.js:", error);
  });
