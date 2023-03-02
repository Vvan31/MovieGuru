// Individual event listeners for categories. 
const books = document.getElementById("10").addEventListener('click' , showData);
const film = document.getElementById("11").addEventListener('click' , showData);
const music = document.getElementById("12").addEventListener('click' , showData);
const tv = document.getElementById("14").addEventListener('click' , showData);
const videoGames = document.getElementById("15").addEventListener('click' , showData);

/* Fetch trivia questions from an API. 
   returns - Data Object.*/
async function fetchQuizData (id){
const options = {
  method: 'GET',
  url: `https://opentdb.com/api.php?amount=50&category=${id}&type=multiple`
}
return await axios
  .request(options)
  .then(async function (response) {
    const { results } = await response.data
    /* console.log(results); */
    return results;

  }).catch(function (error) {
    console.error(error);
  });
}
/*  Called from eventListener on Category options 
    Calls API and gets individual questions and answers arrays.*/
async function showData(e) {
  let id = e.target.getAttribute("id")
  let trivia = await fetchQuizData(id);
  let [questions, answers] = getQuestions(trivia);

  showQuestions(questions, answers, id);
}
/*  return - questions array and answers array 
    answers array = [correct_answer , [all_answers], correct_answer [all_answers] ] */
function getQuestions(trivia){
  let questions = [];
  let answers = [];
  /* console.log(trivia); */
  for (const key in trivia) {
    if (Object.hasOwnProperty.call(trivia, key)) {
      const element = trivia[key];
      questions.push(element.question)
      answers.push(element.correct_answer);
      let all_answers = element.incorrect_answers; 
      all_answers.push(element.correct_answer);
      answers.push(all_answers);
    }
  }

 /* console.log(answers); */
  return [questions, answers];
}
/* creates button functionality for displaying questions dynamically */
function showQuestions(questions,answers, id){
  let actual_question = 0;
  let category = document.getElementById(id).innerHTML;
  // First question setup.  
  document.getElementById("category-title").innerHTML = category + " Trivia!"; 
  updateData(questions,answers, actual_question);

  // Button event listeners for prev and next functionality. 
  next_btn = document.getElementById("next-btn");
  prev_btn = document.getElementById("previous-btn");
  next_btn.addEventListener("click", function() {
    (actual_question < questions.length-1)? actual_question += 1:actual_question = questions.length-1;
    updateData(questions,answers, actual_question);
  });
  prev_btn.addEventListener("click", function() {
    (actual_question > 0)?actual_question -= 1:actual_question = 0;
    updateData(questions,answers, actual_question);
  });
}
/* Updates question and answers html elements text */
function updateData(questions,answers, actual_question){
  document.getElementById("remaining-question").innerHTML = `(${actual_question+1} of ${questions.length})`;
  document.getElementById("question").innerHTML = questions[actual_question];
  const correct_answer = answers[2*actual_question];
  let all_answers = answers[2*actual_question + 1];
  all_answers = randomShuffle(all_answers);
  document.getElementById("answer1").innerHTML = all_answers[0];
  document.getElementById("answer2").innerHTML = all_answers[1];
  document.getElementById("answer3").innerHTML = all_answers[2];
  document.getElementById("answer4").innerHTML = all_answers[3];
}

function randomShuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
