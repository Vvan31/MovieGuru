// Images-------------------------
gsap.to('.img_nega1', {
  rotation: '-360',
  repeat: -1,
  duration: 6,
  ease: 'linear',
})
gsap.to('.img_nega2', {
  rotation: '360',
  repeat: -1,
  duration: 7,
  ease: 'linear',
})

// const form = document.querySelector('#myForm')
//   form.addEventListener('submit', (e) => {
//     e.PreventDefault();
//     const selectedOption1 = option1.value;
//     const selectedOption2 = option2.value;
//     localStorage.setItem('selectedOption1', selectedOption1)
//     localStorage.setItem('selectedOption2',selectedOption2)

//     window.location.href = 'index.html';
//   })

const startEl = document.querySelector('.btn_17')
startEl.addEventListener('click', function () {
  const genreEl = document.getElementById('genre-select')
  const amountEl = document.getElementById('question-select')

  if (genreEl.value == 0 || amountEl.value == 0) {
    const modalView = document.getElementById('modalView')
    modalView.style.display = 'flex'
    const closeBtn = document.getElementById('modalView__closeBtn')

    closeBtn.addEventListener('click', () => {
      modalView.style.display = 'none'
    })
  } else {
    localStorage.setItem('genre', genreEl.value)
    localStorage.setItem('amount', amountEl.value)
    window.location.href = 'index.html'
  }
})

// curtain
function removeElement(element) {
  document.getElementById(element).remove()
}
document.getElementById('curtain').addEventListener('click', function () {
  tl = new TimelineMax()

  tl.fromTo('#left-curtain', { x: 0 }, { x: -800, duration: 2 }, 0)
    .fromTo('#right-curtain', { x: 0 }, { x: 800, duration: 2 }, 0)
    .fromTo('#curtain', { x: 0 }, { x: 8000, duration: 0.1 }, '<2')
})
