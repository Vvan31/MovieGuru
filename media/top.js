// Images-------------------------
gsap.to(".img_nega1",{
  rotation:"-360",
  repeat:-1,
  duration:6,
  ease:"linear"
});
gsap.to(".img_nega2",{
  rotation:"360",
  repeat:-1,
  duration:7,
  ease:"linear"
});

// const form = document.querySelector('#myForm')
// const option1 = form.elements['genre-select'];
// const option2 = form.elements['question-select'];

// // -------------------------
// async function fetchQuizData (id){
//   const options = {
//     method: 'GET',
//     url: `https://opentdb.com/api.php?amount=50&category=${id}&type=multiple`
//   }
//   return await axios
//     .request(options)
//     .then(async function (response) {
//       const { results } = await response.data
//       /* console.log(results); */
//       return results;
  
//     }).catch(function (error) {
//       console.error(error);
//     });
//   }

//   async function showData(category, amount) {
//     if(category = "Books"){
//       id = 10;
//     }if(category ){

//     }

//     let trivia = await fetchQuizData(id);
//     let [questions, answers] = getQuestions(trivia);
  
//     showQuestions(questions, answers, id);
//   }

  form.addEventListener('submit', (e) => {
    e.PreventDefault();
    const selectedOption1 = option1.value;
    const selectedOption2 = option2.value;

    localStorage.setItem('selectedOption1', selectedOption1)
    localStorage.setItem('selectedOption2',selectedOption2)

    window.location.href = 'index.html';
  })

  const startEl = document.querySelector('.btn_17')
  startEl.addEventListener('click', function() {
    const genreEl = document.getElementById('genre-select')
    const amountEl = document.getElementById('question-select')
    localStorage.setItem('genre',genreEl.value)
    localStorage.setItem('amount',amountEl.value)
    window.location.href = "index.html"
  })