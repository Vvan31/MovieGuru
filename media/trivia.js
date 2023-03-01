

async function fetchQuizData (id){
const options = {
  method: 'GET',
  url: `https://opentdb.com/api.php?amount=50&category=${id}&type=multiple`
}
await axios
  .request(options)
  .then(async function (response) {
    const { results } = await response.data
    console.log(results);
    
// console.log(results[0].incorrect_answers);



  }).catch(function (error) {
    console.error(error);
  });
}

const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(function(){
  // console.log(item)
  addEventListener(`click`, showData)
}) 

function showData(e) {
  let id = e.target.getAttribute("id")
  console.log(id);
  fetchQuizData(id)
}

//