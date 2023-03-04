// Individual event listeners for categories.
// const books = document.getElementById('10').addEventListener('click', showData)
// const film = document.getElementById('11').addEventListener('click', showData)
// const music = document.getElementById('12').addEventListener('click', showData)
// const tv = document.getElementById('14').addEventListener('click', showData)
// const videoGames = document
//   .getElementById('15')
//   .addEventListener('click', showData)
let score = 0
const answerData = []
/* Fetch trivia questions from an API. 
   returns - Data Object.*/
async function fetchQuizData(id, amount) {
  const options = {
    method: 'GET',
    url: `https://opentdb.com/api.php?amount=${amount}&category=${id}&type=multiple`,
  }
  return await axios
    .request(options)
    .then(async function (response) {
      const { results } = await response.data
      /* console.log(results); */
      return results
    })
    .catch(function (error) {
      console.error(error)
    })
}

/*  Called from eventListener on Category options 
    Calls API and gets individual questions and answers arrays.*/
async function showData(e) {
  localStorage.removeItem('score')
  const id = localStorage.getItem('genre')
  const amountOfQuestions = localStorage.getItem('amount')
  let trivia = await fetchQuizData(id, amountOfQuestions)
  let [questions, answers] = getQuestions(trivia)

  showQuestions(questions, answers, id)
}
/*  return - questions array and answers array 
    answers array = [correct_answer , [all_answers], correct_answer [all_answers] ] */
function getQuestions(trivia) {
  let questions = []
  let answers = []
  /* console.log(trivia); */
  for (const key in trivia) {
    if (Object.hasOwnProperty.call(trivia, key)) {
      const element = trivia[key]
      questions.push(element.question)
      answers.push(element.correct_answer)
      let all_answers = element.incorrect_answers
      all_answers.push(element.correct_answer)
      answers.push(all_answers)
    }
  }

  /* console.log(answers); */
  return [questions, answers]
}
/* creates button functionality for displaying questions dynamically */
function showQuestions(questions, answers, id) {
  let actual_question = 0
  let category = document.getElementById(id).innerHTML
  let isCorrect = false

  // First question setup.
  document.getElementById('category-title').innerHTML = category + ' Trivia!'
  updateData(questions, answers, actual_question)

  // Button event listeners for prev and next functionality.
  next_btn = document.getElementById('next-btn')
  prev_btn = document.getElementById('previous-btn')
  next_btn.addEventListener('click', function () {
    checkAnswer(answers[2 * actual_question], isCorrect)
    actual_question < questions.length - 1
      ? (actual_question += 1)
      : (window.location.href = 'scorePage.html')
    updateData(questions, answers, actual_question)
  })
  prev_btn.addEventListener('click', function () {
    actual_question > 0 ? (actual_question -= 1) : (actual_question = 0)
    updateData(questions, answers, actual_question)
    checkAnswerData(answerData)
  })
}
/* Updates question and answers html elements text */

function updateData(questions, answers, actual_question) {
  // console.log(score)
  document.getElementById('remaining-question').innerHTML = `(${
    actual_question + 1
  } of ${questions.length})`
  document.getElementById('question').innerHTML = questions[actual_question]
  const correct_answer = answers[2 * actual_question]
  let all_answers = answers[2 * actual_question + 1]
  all_answers = randomShuffle(all_answers)
  document.getElementById('answer1').innerHTML = all_answers[0]
  document.getElementById('answer2').innerHTML = all_answers[1]
  document.getElementById('answer3').innerHTML = all_answers[2]
  document.getElementById('answer4').innerHTML = all_answers[3]
  document.getElementById('answer1').previousElementSibling.value =
    all_answers[0]
  document.getElementById('answer2').previousElementSibling.value =
    all_answers[1]
  document.getElementById('answer3').previousElementSibling.value =
    all_answers[2]
  document.getElementById('answer4').previousElementSibling.value =
    all_answers[3]
  console.log({ correct_answer })
}

function checkAnswer(correct_answer, isCorrect) {
  let user_answer
  document.querySelectorAll('.radio input').forEach(function (answer) {
    if (answer.checked) {
      user_answer = htmlDecode(answer.value)
      countUpScore(htmlDecode(correct_answer), user_answer, isCorrect)
      answer.checked = false
    }
  })
}

// count up the score
function countUpScore(correct_answer, user_answer, isCorrect) {
  if (correct_answer === user_answer) {
    score += 1
    isCorrect = true
  }
  answerData.push(isCorrect)
  localStorage.setItem('score', score)
}

function checkAnswerData(answerData) {
  const prevAnswer = answerData.pop()
  if (prevAnswer && score >= 0) {
    score -= 1
    localStorage.setItem('score', score)
  }
  console.log(score)
}

// decode escape sequences
function htmlDecode(input) {
  let doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent
}

function randomShuffle(array) {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
  return array
}

// const radioButtons = document.querySelectorAll('input[type="radio"]')
// radioButtons.forEach((radioButton) => {
//   radioButton.addEventListener('click', () => {
//     if (radioButton.checked) {
//       radioButtons.forEach((rb) => {
//         rb.nextElementSibling.style.backgroundColor = 'white'

//         rb.nextElementSibling.style.color = 'red'
//       })
//       radioButton.nextElementSibling.style.backgroundColor = 'red'
//       radioButton.nextElementSibling.style.color = 'white'
//     }
//   })
// })

// function resetRadioButtonsBackground() {
//   radioButtons.forEach((rb) => {
//     rb.nextElementSibling.style.backgroundColor = 'white';
//     rb.nextElementSibling.style.color = 'red';
//   });
// }
